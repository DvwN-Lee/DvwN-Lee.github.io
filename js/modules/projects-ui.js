// ========================================
// Projects UI Module
// ========================================

import { projectsData } from '../data/projects.js';
import { config } from '../data/config.js';
import { getRequiredElement, debugLog, prefersReducedMotion, resetInlineStyles } from './utils.js';
import { AnimationQueue, removeAOSAttributes } from './animation-utils.js';

// ========================================
// Constants
// ========================================

// Animation timing (ms) - config에서 가져옴
const { animations, projects: projectsConfig } = config.constants;
const ANIMATION = {
    FADE_DURATION: animations.fadeIn,
    LAYOUT_SETTLE_DELAY: animations.layoutSettle,
    MODAL_FALLBACK_TIMEOUT: animations.modalFallback,
    IMAGES_LOADED_TIMEOUT: animations.imagesLoadedTimeout
};

// Filter values
const FILTER = {
    ALL: 'all'
};

// State classes
const STATE_CLASS = {
    MODAL_OPENING: 'is-opening',
    HIGHLIGHTED: 'highlighted',
    HIDDEN: 'is-hidden'
};

// 애니메이션 상태 관리
const filterAnimationQueue = new AnimationQueue();
const modalAnimationQueue = new AnimationQueue();

// DOM 캐싱
let cachedProjectsGrid = null;
let cachedModal = null;
// Masonry 제거됨 - CSS Grid 레이아웃으로 대체

/**
 * 프로젝트 카드 필터링 애니메이션 (전체 Fade Out -> Layout -> Fade In 방식)
 * @param {string} filterValue - 필터 값 ('all', 'cloud', 'backend', 'fullstack')
 */
function animateProjectCards(filterValue = FILTER.ALL) {
    filterAnimationQueue.start((queue) => {
        const projectCards = document.querySelectorAll('.project-card');

        // 0. AOS 간섭 제거 및 현재 상태 프리징 (끊김 방지 핵심)
        projectCards.forEach(card => {
            // AOS 속성이 남아있다면 제거 절차 수행
            if (card.hasAttribute('data-aos') || card.classList.contains('aos-init')) {
                // 1. 현재 시각적 상태(투명도, 위치)를 계산하여 가져옴
                const computed = window.getComputedStyle(card);
                const currentOpacity = computed.opacity;
                const currentTransform = computed.transform;

                // 2. 인라인 스타일로 현재 상태 고정 (AOS 클래스 제거 시 '깜빡임' 방지)
                card.style.transition = 'none'; // 트랜지션 없이 즉시 적용
                card.style.opacity = currentOpacity;
                // transform이 'none'일 경우 빈 문자열 처리
                card.style.transform = currentTransform === 'none' ? '' : currentTransform;

                // 3. AOS 속성 및 클래스 완전 제거 (간섭 원천 차단)
                removeAOSAttributes(card);
            }
        });

        // 강제 리플로우: 브라우저가 AOS 제거와 스타일 변경을 인지하도록 함
        if (projectCards.length > 0) void projectCards[0].offsetHeight;

        // 1. 이전 애니메이션 상태 클래스 초기화
        projectCards.forEach(card => {
            card.classList.remove('is-fading-out', 'is-fading-in', 'no-transition');
            card.style.transition = ''; // 'none'으로 설정했던 트랜지션 복구
        });

        if (!cachedProjectsGrid) {
            cachedProjectsGrid = document.querySelector('.projects-grid');
        }

        // 2. 대상 카드 분류
        const cardsToShow = [];
        const cardsToHide = [];
        const currentlyVisible = [];

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const shouldShow = filterValue === FILTER.ALL || category === filterValue;
            const isVisible = !card.classList.contains(STATE_CLASS.HIDDEN);

            if (shouldShow) {
                cardsToShow.push(card);
            } else {
                cardsToHide.push(card);
            }

            if (isVisible) {
                currentlyVisible.push(card);
            }
        });

        // 3. 현재 보이는 모든 카드를 Fade Out (inner 요소 애니메이션)
        currentlyVisible.forEach(card => {
            const inner = card.querySelector('.project-card-inner');
            if (!inner) return;

            // 인라인 스타일 정리 (CSS Cascade 우선순위 확보)
            resetInlineStyles(inner);

            // 강제 리플로우로 트랜지션 준비
            void inner.offsetHeight;

            // 상태 클래스 추가 (CSS 규칙이 적용되어 fade-out 애니메이션 실행)
            card.classList.add('is-fading-out');
        });

        // 4. Fade Out 완료 후 레이아웃 변경 및 새 카드 준비
        queue.addTimeout(() => {
            // DOM 상태 업데이트 (표시/숨김 처리)
            cardsToHide.forEach(card => {
                card.classList.add(STATE_CLASS.HIDDEN);
                card.classList.remove('is-fading-out');

                // 숨겨지는 카드의 inner 요소 inline 스타일 정리
                const inner = card.querySelector('.project-card-inner');
                if (inner) {
                    resetInlineStyles(inner);
                }
            });

            cardsToShow.forEach(card => {
                card.classList.remove(STATE_CLASS.HIDDEN);
                card.classList.remove('is-fading-out');

                // 이미 위에서 제거했지만, 숨겨져 있던 카드들도 확실하게 처리
                removeAOSAttributes(card);

                // Fade In을 위한 초기 상태 설정 (inner 요소에 투명, 아래로 이동)
                const inner = card.querySelector('.project-card-inner');
                if (inner) {
                    inner.classList.add('no-transition');
                    inner.style.opacity = '0';
                    inner.style.transform = 'translateY(20px)';
                }
            });

            // CSS Grid는 자동으로 레이아웃 재계산 (Masonry 제거됨)

            // 강제 리플로우 - inner 요소에 적용하여 transform 애니메이션 보장
            cardsToShow.forEach(card => {
                const inner = card.querySelector('.project-card-inner');
                if (inner) {
                    void inner.offsetHeight;
                }
            });

            // 5. 레이아웃 안정화 후 Fade In 시작
            queue.addTimeout(() => {
                // 트랜지션 다시 활성화 (inner 요소)
                cardsToShow.forEach(card => {
                    const inner = card.querySelector('.project-card-inner');
                    if (inner) {
                        inner.classList.remove('no-transition');
                    }
                });

                // 애니메이션 실행: 인라인 스타일 정리 후 is-fading-in 클래스 추가
                requestAnimationFrame(() => {
                    cardsToShow.forEach(card => {
                        const inner = card.querySelector('.project-card-inner');
                        if (inner) {
                            // 인라인 스타일 정리 (CSS Cascade 우선순위 확보)
                            resetInlineStyles(inner);
                        }
                        // 상태 클래스 추가 (CSS 규칙이 적용되어 fade-in 애니메이션 실행)
                        card.classList.add('is-fading-in');
                    });
                });

                // 6. 애니메이션 종료 후 상태 클래스 정리
                queue.addTimeout(() => {
                    cardsToShow.forEach(card => {
                        card.classList.remove('is-fading-in');
                    });
                }, ANIMATION.FADE_DURATION);

            }, ANIMATION.LAYOUT_SETTLE_DELAY);

        }, ANIMATION.FADE_DURATION);
    });
}

/**
 * 초기 페이지 로드 시 순차 애니메이션 적용
 * 제목 → 필터 버튼 → 프로젝트 카드 순서로 fade-up
 * IntersectionObserver로 viewport 진입 시에만 실행
 */
function applyInitialLoadAnimation() {
    // direct-projects-access가 있으면 애니메이션 건너뛰기 (reload 시)
    if (document.body.classList.contains('direct-projects-access')) {
        return;
    }

    // prefers-reduced-motion 체크
    if (prefersReducedMotion()) {
        return;
    }

    const projectsSection = document.querySelector('#projects');
    if (!projectsSection) return;

    const projectsTitle = document.querySelector('#projects h2');
    const filterButtons = document.querySelector('.filter-buttons');
    const projectCards = document.querySelectorAll('.project-card');

    // 1. 초기 상태: 모든 요소에 invisible-init 클래스 추가
    if (projectsTitle) projectsTitle.classList.add('invisible-init');
    if (filterButtons) filterButtons.classList.add('invisible-init');
    projectCards.forEach(card => card.classList.add('invisible-init'));

    // 2. IntersectionObserver로 viewport 진입 감지
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 순차적으로 visible-animate 클래스 추가
                // 제목: 150ms 후
                setTimeout(() => {
                    if (projectsTitle) {
                        projectsTitle.classList.add('visible-animate');
                        projectsTitle.classList.remove('invisible-init');
                    }
                }, 150);

                // 필터 버튼: 450ms 후 (제목 애니메이션 절반 진행 후)
                setTimeout(() => {
                    if (filterButtons) {
                        filterButtons.classList.add('visible-animate');
                        filterButtons.classList.remove('invisible-init');
                    }
                }, 450);

                // 프로젝트 카드: initialLoadDelay 후 시작, 각 카드는 sequentialInterval 간격
                const { maxSequentialAnimation } = projectsConfig;
                const { sequentialInterval, initialLoadDelay } = animations;
                projectCards.forEach((card, index) => {
                    // 최대 maxSequentialAnimation개까지만 순차 애니메이션, 나머지는 동시에
                    const staggerDelay = index < maxSequentialAnimation
                        ? index * sequentialInterval
                        : maxSequentialAnimation * sequentialInterval;
                    setTimeout(() => {
                        card.classList.add('visible-animate');
                        card.classList.remove('invisible-init');
                    }, initialLoadDelay + staggerDelay);
                });

                // 애니메이션 실행 후 observer 해제 (메모리 누수 방지)
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.1,  // 섹션이 10% 보이면 트리거
        rootMargin: '0px'
    });

    observer.observe(projectsSection);
}

/**
 * 프로젝트 카드를 동적으로 렌더링하는 함수
 */
function renderProjects() {
    const projectsGrid = getRequiredElement('.projects-grid', 'Projects UI');
    if (!projectsGrid) return;

    const projectCardsHTML = projectsData.map((project, index) => {
        // 배지 HTML 처리 (배지가 있을 때만 표시)
        const isAward = project.badge && (project.badge.includes('경소톤') || project.badge.includes('동상'));
        const badgeHTML = project.badge ? `<span class="tag ${isAward ? 'tag--award' : 'tag--accent'} project-badge ${isAward ? 'award' : ''}">${project.badge}</span>` : '';

        // Full-width 카드 판별 (CSS :first-child/:last-child:nth-child(even)와 동기화)
        const totalCards = projectsData.length;
        const isLastEven = index === totalCards - 1 && totalCards % 2 === 0;
        const isFullWidth = index === 0 || isLastEven;

        // 기술 스택 HTML 생성 (첫 primaryTechCount개는 핵심 기술로 강조)
        const primaryCount = project.primaryTechCount || 3;
        const maxVisible = isFullWidth ? project.tech.length : 6;
        const visibleTech = project.tech.slice(0, maxVisible);
        const hiddenCount = project.tech.length - maxVisible;
        const techStackHTML = visibleTech.map((tech, i) =>
            i < primaryCount
                ? `<span class="tag tag--primary">${tech}</span>`
                : `<span class="tag tag--subtle">${tech}</span>`
        ).join('') + (hiddenCount > 0 ? `<span class="tag tag--more">+${hiddenCount}</span>` : '');

        // 하이라이트 HTML 생성
        const highlightsHTML = project.highlights.map(highlight => `<li>${highlight}</li>`).join('');

        // 첫 eagerLoadCount개 이미지는 eager 로딩 (초기 화면), 나머지는 lazy 로딩
        const loadingAttr = index < projectsConfig.eagerLoadCount ? 'eager' : 'lazy';

        // AOS 순차 애니메이션: 제목(0ms) → 필터(100ms) → 카드(200ms+)
        const aosDelay = (index + 2) * 100;

        return `
            <div class="project-card" data-category="${project.category}" data-project-id="${project.id}" data-aos="fade-up" data-aos-delay="${aosDelay}">
                <div class="project-card-inner">
                    <div class="project-image">
                        <div class="project-image-clip">
                            <img src="${project.imageUrl}" alt="${project.imageAlt}" loading="${loadingAttr}" decoding="async"${project.imagePosition ? ` style="object-position: ${project.imagePosition}"` : ''}>
                            <div class="skeleton"></div>
                        </div>
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="${project.githubUrl}" target="_blank" class="project-link">
                                    <i class="fab fa-github"></i>
                                </a>
                                <a href="#" class="project-link" data-project-id="${project.id}">
                                    <i class="fas fa-expand"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        ${badgeHTML}
                        <h3>${project.title}</h3>
                        <p>${project.summary}</p>
                        <div class="project-tech">
                            ${techStackHTML}
                        </div>
                        <ul class="project-highlights">
                            ${highlightsHTML}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // CSS Grid 레이아웃 사용 (Masonry sizer 제거됨)
    projectsGrid.innerHTML = projectCardsHTML;

    // 프로젝트 카드 추가 직후 AOS 새로고침 (초기 애니메이션 적용)
    // /#projects 직접 접근 시에는 animations.js에서 수동으로 처리
    if (typeof AOS !== 'undefined' && !document.body.classList.contains('direct-projects-access')) {
        AOS.refresh();
    }

    // 프로젝트 카드 클릭 이벤트 리스너만 추가 (모달 이벤트는 initProjectsUI에서 한 번만 등록)
    setupProjectCardListeners();

    // Skeleton Loading: 이미지 로드 완료 시 skeleton 제거
    projectsGrid.querySelectorAll('.project-image-clip img').forEach(img => {
        const markLoaded = () => img.classList.add('loaded');
        img.addEventListener('load', markLoaded, { once: true });
        img.addEventListener('error', markLoaded, { once: true });
        if (img.complete && img.naturalHeight !== 0) {
            markLoaded();
        }
    });

    // CSS Grid 레이아웃은 자동 처리됨 (Masonry 제거됨)
}

// 필터 버튼 DOM 캐싱 (성능 최적화 - 정적 요소이므로 한 번만 쿼리)
let cachedFilterButtons = null;

/**
 * 프로젝트 필터링 이벤트 리스너 초기화
 */
function initializeProjectFilter() {
    // 캐시된 버튼이 없으면 쿼리하여 캐싱
    if (!cachedFilterButtons) {
        cachedFilterButtons = document.querySelectorAll('.filter-btn');
    }

    cachedFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            cachedFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // 공통 애니메이션 함수 사용
            animateProjectCards(filterValue);
        });
    });
}

let focusedElementBeforeModal = null;
let focusableElements = [];
let firstFocusableElement = null;
let lastFocusableElement = null;

/**
 * Opens a project modal with a center fade-in/scale animation.
 * @param {string} projectId - The ID of the project to display.
 */
function openProjectModal(projectId) {
    if (modalAnimationQueue.inProgress) return;

    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    modalAnimationQueue.start(() => {
        const modal = getRequiredElement('#projectModal', 'Projects UI');
        if (!modal) return;

        const modalContent = modal.querySelector('.modal-content');
        const modalContentInner = modal.querySelector('.modal-content-inner');

        // 기존 헤더 제거 (있다면)
        const existingHeader = modalContent.querySelector('.modal-header');
        if (existingHeader) {
            existingHeader.remove();
        }

        // Architecture 버튼 생성 (architectureUrl이 있는 경우만)
        let architectureHTML = '';
        if (project.architectureUrl) {
            const altText = project.architectureAlt || `${project.title} Architecture Diagram`;
            architectureHTML = `
                <div class="modal-architecture">
                    <button class="architecture-view-btn"
                            type="button"
                            data-arch-url="${project.architectureUrl}"
                            data-arch-alt="${altText}">
                        <i class="fas fa-project-diagram"></i>
                        <span>View Architecture</span>
                    </button>
                </div>`;
        }

        // Tech Stack 생성
        let techStackHTML = '';
        if (project.tech && project.tech.length > 0) {
            const tagsHTML = project.tech.map(t => `<span>${t}</span>`).join('');
            techStackHTML = `<div class="modal-tech-stack">${tagsHTML}</div>`;
        }

        // 헤더 생성
        const headerHTML = `
            <div class="modal-header">
                <div class="modal-header-top">
                    <h2 id="modalTitle">${project.title}</h2>
                    <button class="modal-close-btn" type="button" aria-label="Close modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-header-actions">
                    <a href="${project.githubUrl}" target="_blank" class="btn btn-primary">
                        <i class="fab fa-github"></i> GitHub Repository
                    </a>
                    ${architectureHTML}
                </div>
                ${techStackHTML}
            </div>`;

        // 콘텐츠 생성
        let contentHTML = '';
        if (project.modalDetails) {
            const sectionsHTML = project.modalDetails.map((section, index) => {
                let sectionContent = '';
                if (section.content) {
                    sectionContent = `<p>${section.content}</p>`;
                    // 첫 번째 content Section(Overview)은 카드 스타일 적용
                    if (index === 0) {
                        return `<div class="modal-section modal-overview"><h4>${section.title}</h4>${sectionContent}</div>`;
                    }
                } else if (section.items) {
                    const listTag = section.listType === 'ol' ? 'ol' : 'ul';
                    const itemsHTML = section.items.map(item => `<li>${item}</li>`).join('');
                    sectionContent = `<${listTag}>${itemsHTML}</${listTag}>`;
                }
                return `<div class="modal-section"><h4>${section.title}</h4>${sectionContent}</div>`;
            }).join('');

            contentHTML = `
                <div class="modal-details-content visible">
                    ${sectionsHTML}
                </div>`;
        }

        // 헤더를 modal-content의 첫 번째 자식으로 추가
        modalContent.insertAdjacentHTML('afterbegin', headerHTML);
        // 콘텐츠를 modal-content-inner에 추가
        modalContentInner.innerHTML = contentHTML;

        focusedElementBeforeModal = document.activeElement;
        modal.setAttribute('aria-hidden', 'false');

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        modal.style.display = 'flex';

        // Close 버튼 이벤트 바인딩
        const closeBtn = modalContent.querySelector('.modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeProjectModal);
        }

        // Architecture 버튼 클릭 이벤트 바인딩
        if (project.architectureUrl) {
            const archBtn = modalContent.querySelector('.architecture-view-btn');
            if (archBtn) {
                archBtn.addEventListener('click', () => {
                    openArchitectureLightbox(
                        archBtn.dataset.archUrl,
                        archBtn.dataset.archAlt
                    );
                });
            }
        }

        // 스크롤을 항상 맨 위로 설정 및 애니메이션 시작
        requestAnimationFrame(() => {
            modalContentInner.scrollTop = 0;
            modal.classList.add(STATE_CLASS.MODAL_OPENING);
        });

        const handleTransitionEnd = (e) => {
            if (e.target === modalContent && e.propertyName === 'transform') {
                setupFocusTrap();
                modalAnimationQueue.complete();
            }
        };

        modalContent.addEventListener('transitionend', handleTransitionEnd, { once: true });
    });
}

/**
 * 모달 내부 포커스 트랩 설정
 */
function setupFocusTrap() {
    if (!cachedModal) {
        cachedModal = getRequiredElement('#projectModal', 'Projects UI');
    }
    const modal = cachedModal;
    if (!modal) return;

    const modalContentInner = modal.querySelector('.modal-content-inner');

    // 포커스 가능한 모든 요소 선택
    focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];

        // 포커스 시 스크롤 방지 옵션 사용
        firstFocusableElement.focus({ preventScroll: true });

        // 포커스 후 스크롤 위치를 맨 위로 강제 설정
        modalContentInner.scrollTop = 0;
    }
}

/**
 * Closes the project modal.
 */
function closeProjectModal() {
    // 진행 중인 애니메이션이 있으면 취소하고 새로 시작
    modalAnimationQueue.start(() => {
        if (!cachedModal) {
            cachedModal = getRequiredElement('#projectModal', 'Projects UI');
        }
        const modal = cachedModal;
        if (!modal) return;

        const modalContent = modal.querySelector('.modal-content');

        modal.classList.remove(STATE_CLASS.MODAL_OPENING);

        // 클린업이 이미 실행되었는지 추적하는 플래그
        let cleanupExecuted = false;

        // 클린업 함수: 모달을 완전히 닫는 공통 로직
        const cleanupModal = () => {
            if (cleanupExecuted) return;
            cleanupExecuted = true;

            clearTimeout(fallbackTimeout);
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '';
            modal.setAttribute('aria-hidden', 'true');

            if (focusedElementBeforeModal) {
                focusedElementBeforeModal.focus();
            }

            modalAnimationQueue.complete();
        };

        const handleTransitionEnd = (e) => {
            if (e.target === modalContent && e.propertyName === 'transform') {
                cleanupModal();
            }
        };

        // transitionend 이벤트 리스너 등록
        modalContent.addEventListener('transitionend', handleTransitionEnd, { once: true });

        // Fallback: transitionend가 발생하지 않을 경우를 대비한 타이머
        // CSS transition은 300ms이므로 여유있게 후 강제 정리
        const fallbackTimeout = setTimeout(() => {
            modalContent.removeEventListener('transitionend', handleTransitionEnd);
            cleanupModal();
        }, ANIMATION.MODAL_FALLBACK_TIMEOUT);
    });
}

// ========================================
// Architecture Lightbox
// ========================================

/**
 * Architecture Lightbox 열기
 * @param {string} imageUrl - 이미지 URL
 * @param {string} altText - 이미지 alt text
 */
function openArchitectureLightbox(imageUrl, altText) {
    const lightbox = document.getElementById('architectureLightbox');
    if (!lightbox) return;

    const img = lightbox.querySelector('.arch-lightbox-img');
    img.alt = altText;

    // 이미지 로드 실패 시 Lightbox 닫기
    img.addEventListener('error', () => {
        closeArchitectureLightbox();
    }, { once: true });

    img.src = imageUrl;

    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.style.display = 'flex';

    requestAnimationFrame(() => {
        lightbox.classList.add('is-opening');
    });

    // ESC key - capture phase로 Modal ESC와 분리
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            e.stopPropagation();
            closeArchitectureLightbox();
            document.removeEventListener('keydown', handleEsc, true);
        }
    };
    document.addEventListener('keydown', handleEsc, true);

    // Close 버튼
    const closeBtn = lightbox.querySelector('.arch-lightbox-close');
    const handleClose = () => {
        closeArchitectureLightbox();
        closeBtn.removeEventListener('click', handleClose);
    };
    closeBtn.addEventListener('click', handleClose);

    // Backdrop 클릭 (이미지 외부)
    const handleBackdrop = (e) => {
        if (e.target === lightbox || e.target.classList.contains('arch-lightbox-content')) {
            closeArchitectureLightbox();
            lightbox.removeEventListener('click', handleBackdrop);
        }
    };
    lightbox.addEventListener('click', handleBackdrop);
}

/**
 * Architecture Lightbox 닫기
 */
function closeArchitectureLightbox() {
    const lightbox = document.getElementById('architectureLightbox');
    if (!lightbox) return;

    lightbox.classList.remove('is-opening');

    const handleTransitionEnd = () => {
        lightbox.style.display = 'none';
        lightbox.setAttribute('aria-hidden', 'true');
        const img = lightbox.querySelector('.arch-lightbox-img');
        img.src = '';
        img.alt = '';
    };

    lightbox.addEventListener('transitionend', handleTransitionEnd, { once: true });

    // Fallback: transition이 발생하지 않을 경우
    setTimeout(() => {
        if (lightbox.style.display !== 'none') {
            handleTransitionEnd();
        }
    }, 400);
}

/**
 * 프로젝트 카드 클릭 이벤트 리스너만 설정 (렌더링마다 재등록)
 */
function setupProjectCardListeners() {
    document.querySelectorAll('.project-link[data-project-id]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = e.currentTarget.getAttribute('data-project-id');
            openProjectModal(projectId);
        });
    });
}

/**
 * 모달 자체의 이벤트 리스너 설정 (초기화 시 한 번만 호출)
 */
function setupModalListeners() {
    const modal = getRequiredElement('#projectModal', 'Projects UI');
    if (!modal) return;

    // Clicking on the modal backdrop - 한 번만 등록
    modal.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeProjectModal();
        }
    });

    // Closing with the Escape key and focus trap management - 한 번만 등록
    document.addEventListener('keydown', (e) => {
        const isModalOpen = modal.classList.contains(STATE_CLASS.MODAL_OPENING);

        if (e.key === 'Escape' && isModalOpen) {
            closeProjectModal();
        }

        // 포커스 트랩: Tab 키로 모달 내부에만 포커스 유지
        if (e.key === 'Tab' && isModalOpen) {
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement.focus();
                }
            } else { // Tab
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }
    });
}



/**
 * 프로젝트 UI 모듈 초기화
 */
export function initProjectsUI() {
    renderProjects();
    initializeProjectFilter();

    // 모달 이벤트 리스너는 초기화 시 한 번만 등록
    setupModalListeners();



    debugLog('Projects UI module initialized');
}
