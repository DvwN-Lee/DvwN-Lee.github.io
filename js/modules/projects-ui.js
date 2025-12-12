// ========================================
// Projects UI Module
// ========================================

import { projectsData } from '../data/projects.js';
import { getRequiredElement } from './utils.js';
import { AnimationQueue } from './animation-utils.js';

// ========================================
// Constants
// ========================================

// Animation timing (ms)
const ANIMATION = {
    FADE_DURATION: 300,           // CSS transition 시간과 일치 (0.3s)
    LAYOUT_SETTLE_DELAY: 100,     // Masonry layout 안정화 대기 (증가)
    MODAL_FALLBACK_TIMEOUT: 400
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
let masonryInstance = null;

/**
 * Masonry 레이아웃 초기화
 * @param {Function} callback - 초기화 완료 후 실행할 콜백
 */
function initMasonry(callback) {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return null;

    // 기존 Masonry 인스턴스가 있으면 제거
    if (masonryInstance) {
        masonryInstance.destroy();
        masonryInstance = null;
    }

    cachedProjectsGrid = grid;

    // Masonry 초기화 및 클래스 추가를 수행하는 내부 함수
    const setupMasonry = () => {
        // 이미 초기화 완료된 경우 중복 실행 방지
        if (grid.classList.contains('masonry-ready')) return;

        masonryInstance = new Masonry(grid, {
            itemSelector: '.project-card:not(.is-fading-out)',
            columnWidth: '.projects-grid-sizer',
            gutter: '.projects-gutter-sizer',
            percentPosition: true,
            transitionDuration: 0  // 초기 layout 시 애니메이션 제거
        });

        // Masonry 초기화 완료 표시 (테스트에서 감지하는 핵심 클래스)
        grid.classList.add('masonry-ready');

        // AOS 위치 재계산은 하지 않음 (레이아웃 변화 방지)
        // Masonry 초기화 시점에 이미 올바른 위치에 있으므로 AOS.refresh() 불필요

        // 초기화 완료 후 콜백 실행
        if (callback) callback();
    };

    // 즉시 Masonry 초기화 (이미지 로딩 전에도 aspect-ratio로 공간 확보되어 있음)
    setupMasonry();

    // 이미지 로딩 완료 후 레이아웃 미세 조정 (transition 없이)
    if (typeof imagesLoaded !== 'undefined') {
        const imgLoad = imagesLoaded(grid, { background: true });
        imgLoad.on('done', () => {
            if (masonryInstance) {
                // transition 일시 중지
                grid.style.transition = 'none';
                const cards = grid.querySelectorAll('.project-card');
                cards.forEach(card => {
                    card.style.transition = 'none';
                });

                // 레이아웃 재계산
                masonryInstance.layout();

                // 다음 프레임에서 transition 복원
                requestAnimationFrame(() => {
                    grid.style.transition = '';
                    cards.forEach(card => {
                        card.style.transition = '';
                    });
                });
            }
        });
    }

    return masonryInstance;
}

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
                card.removeAttribute('data-aos');
                card.removeAttribute('data-aos-delay');
                card.classList.remove('aos-init');
                card.classList.remove('aos-animate');
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

            // 강제 리플로우로 트랜지션 준비
            void inner.offsetHeight;

            card.classList.add('is-fading-out');

            // 인라인 스타일로 목표값 명시적 설정 (Masonry transform과 분리)
            inner.style.opacity = '0';
            inner.style.transform = 'translateY(20px)';
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
                    inner.style.opacity = '';
                    inner.style.transform = '';
                }
            });

            cardsToShow.forEach(card => {
                card.classList.remove(STATE_CLASS.HIDDEN);
                card.classList.remove('is-fading-out');

                // 이미 위에서 제거했지만, 숨겨져 있던 카드들도 확실하게 처리
                card.classList.remove('aos-init', 'aos-animate');
                card.removeAttribute('data-aos');
                card.removeAttribute('data-aos-delay');

                // Fade In을 위한 초기 상태 설정 (inner 요소에 투명, 아래로 이동)
                const inner = card.querySelector('.project-card-inner');
                if (inner) {
                    inner.classList.add('no-transition');
                    inner.style.opacity = '0';
                    inner.style.transform = 'translateY(20px)';
                }
            });

            // Masonry 레이아웃 재계산
            if (masonryInstance) {
                masonryInstance.reloadItems();
                masonryInstance.layout();
            }

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

                // 애니메이션 실행 (inner 요소: 투명도 복구, 위치 원복)
                requestAnimationFrame(() => {
                    cardsToShow.forEach(card => {
                        const inner = card.querySelector('.project-card-inner');
                        if (inner) {
                            inner.style.opacity = '1';
                            inner.style.transform = 'translateY(0)';
                        }
                    });
                });

                // 6. 애니메이션 종료 후 스타일 정리 (inner 요소)
                queue.addTimeout(() => {
                    cardsToShow.forEach(card => {
                        const inner = card.querySelector('.project-card-inner');
                        if (inner) {
                            inner.style.opacity = '';
                            inner.style.transform = '';
                        }
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
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
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

                // 프로젝트 카드: 800ms 후 시작, 각 카드는 120ms 간격 (현대적인 순차 효과)
                projectCards.forEach((card, index) => {
                    // 최대 6개까지만 순차 애니메이션, 나머지는 동시에
                    const staggerDelay = index < 6 ? index * 120 : 6 * 120;
                    setTimeout(() => {
                        card.classList.add('visible-animate');
                        card.classList.remove('invisible-init');
                    }, 800 + staggerDelay);
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
        const badgeHTML = project.badge ? `<span class="project-badge ${project.badge.includes('경소톤') || project.badge.includes('동상') ? 'award' : ''}">${project.badge}</span>` : '';

        // 기술 스택 HTML 생성
        const techStackHTML = project.tech.map(tech => `<span>${tech}</span>`).join('');

        // 하이라이트 HTML 생성
        const highlightsHTML = project.highlights.map(highlight => `<li>${highlight}</li>`).join('');

        // 첫 6개 이미지는 eager 로딩 (초기 화면), 나머지는 lazy 로딩
        const loadingAttr = index < 6 ? 'eager' : 'lazy';

        // AOS 순차 애니메이션: 제목(0ms) → 필터(100ms) → 카드(200ms+)
        const aosDelay = (index + 2) * 100;

        return `
            <div class="project-card" data-category="${project.category}" data-project-id="${project.id}" data-aos="fade-up" data-aos-delay="${aosDelay}">
                <div class="project-card-inner">
                    <div class="project-image">
                        <img src="${project.imageUrl}" alt="${project.imageAlt}" loading="${loadingAttr}" decoding="async">
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

    // Masonry용 sizer 요소 추가
    const sizerHTML = `
        <div class="projects-grid-sizer"></div>
        <div class="projects-gutter-sizer"></div>
    `;

    // Sizer를 먼저 추가 (Masonry가 column width 계산에 사용)
    projectsGrid.innerHTML = sizerHTML + projectCardsHTML;

    // 프로젝트 카드 추가 직후 AOS 새로고침 (초기 애니메이션 적용)
    // /#projects 직접 접근 시에는 animations.js에서 수동으로 처리
    if (typeof AOS !== 'undefined' && !document.body.classList.contains('direct-projects-access')) {
        AOS.refresh();
    }

    // 프로젝트 카드 클릭 이벤트 리스너만 추가 (모달 이벤트는 initProjectsUI에서 한 번만 등록)
    setupProjectCardListeners();

    // Masonry 초기화 (CSS에서 초기 로딩 처리)
    initMasonry();

    // AOS 기반 순차 애니메이션 사용 (data-aos-delay로 제어)
    // applyInitialLoadAnimation() 함수는 더 이상 호출하지 않음
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

        // 헤더 생성 (제목 + GitHub 버튼)
        const headerHTML = `
            <div class="modal-header">
                <h2 id="modalTitle">${project.title}</h2>
                <div class="modal-links">
                    <a href="${project.githubUrl}" target="_blank" class="btn btn-primary">
                        <i class="fab fa-github"></i> GitHub Repository
                    </a>
                </div>
            </div>`;

        // 콘텐츠 생성
        let contentHTML = '';
        if (project.modalDetails) {
            const sectionsHTML = project.modalDetails.map(section => {
                let sectionContent = '';
                if (section.content) {
                    sectionContent = `<p>${section.content}</p>`;
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



    console.log('✅ Projects UI module initialized');
}
