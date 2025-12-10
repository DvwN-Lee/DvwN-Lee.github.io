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
    FADE_DURATION: 200,           // fade-out/in 시간 단축
    LAYOUT_SETTLE_DELAY: 50,      // Masonry layout 안정화 대기
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

    cachedProjectsGrid = grid;

    // imagesLoaded와 함께 초기화
    if (typeof imagesLoaded !== 'undefined') {
        imagesLoaded(grid, function () {
            masonryInstance = new Masonry(grid, {
                itemSelector: '.project-card',
                columnWidth: '.projects-grid-sizer',
                gutter: '.projects-gutter-sizer',
                percentPosition: true,
                transitionDuration: 0  // 초기 layout 시 애니메이션 제거
            });

            // Masonry 초기화 완료 표시
            grid.classList.add('masonry-ready');

            // 이후 layout에는 transition 활성화
            requestAnimationFrame(() => {
                masonryInstance.options.transitionDuration = '0.3s';
            });

            // 초기화 완료 후 콜백 실행
            if (callback) callback();
        });
    } else {
        // Fallback if imagesLoaded is missing
        masonryInstance = new Masonry(grid, {
            itemSelector: '.project-card',
            columnWidth: '.projects-grid-sizer',
            gutter: '.projects-gutter-sizer',
            percentPosition: true,
            transitionDuration: 0
        });

        grid.classList.add('masonry-ready');
        requestAnimationFrame(() => {
            masonryInstance.options.transitionDuration = '0.3s';
        });

        if (callback) callback();
    }

    return masonryInstance;
}

/**
 * 프로젝트 카드 필터링 애니메이션
 * @param {string} filterValue - 필터 값 ('all', 'cloud', 'backend', 'fullstack')
 */
function animateProjectCards(filterValue = FILTER.ALL) {
    filterAnimationQueue.start((queue) => {
        const projectCards = document.querySelectorAll('.project-card');

        if (!cachedProjectsGrid) {
            cachedProjectsGrid = document.querySelector('.projects-grid');
        }

        // 현재 보여질 카드와 숨겨질 카드 분류
        const cardsToShow = [];
        const cardsToHide = [];

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const shouldShow = filterValue === FILTER.ALL || category === filterValue;

            if (shouldShow) {
                cardsToShow.push(card);
            } else {
                cardsToHide.push(card);
            }
        });

        // 1단계: 숨겨질 카드만 fade-out
        cardsToHide.forEach(card => {
            card.classList.add('is-fading-out');
        });

        // 2단계: fade-out 완료 후 visibility 변경 및 layout
        queue.addTimeout(() => {
            // 숨김 처리
            cardsToHide.forEach(card => {
                card.classList.add(STATE_CLASS.HIDDEN);
                card.classList.remove('is-fading-out');
            });

            // 보여질 카드 준비 (hidden 해제, fading-out 상태로 시작)
            cardsToShow.forEach((card, index) => {
                card.classList.remove(STATE_CLASS.HIDDEN);
                card.classList.add('is-fading-out');

                // 첫 번째 카드 하이라이트
                if (index === 0) {
                    card.classList.add(STATE_CLASS.HIGHLIGHTED);
                } else {
                    card.classList.remove(STATE_CLASS.HIGHLIGHTED);
                }
            });

            // Masonry 레이아웃 재계산
            if (masonryInstance) {
                masonryInstance.reloadItems();
                masonryInstance.layout();
            }

            // 3단계: layout 완료 후 fade-in
            queue.addTimeout(() => {
                cardsToShow.forEach(card => {
                    card.classList.remove('is-fading-out');
                    card.classList.add('is-fading-in');
                });

                // 4단계: class 정리
                queue.addTimeout(() => {
                    cardsToShow.forEach(card => {
                        card.classList.remove('is-fading-in');
                    });

                    if (typeof AOS !== 'undefined') {
                        AOS.refresh();
                    }
                }, ANIMATION.FADE_DURATION);
            }, ANIMATION.LAYOUT_SETTLE_DELAY);
        }, ANIMATION.FADE_DURATION);
    });
}

/**
 * 프로젝트 카드를 동적으로 렌더링하는 함수
 */
function renderProjects() {
    const projectsGrid = getRequiredElement('.projects-grid', 'Projects UI');
    if (!projectsGrid) return;

    const projectCardsHTML = projectsData.map(project => {
        // 배지 HTML 처리 (배지가 있을 때만 표시)
        const badgeHTML = project.badge ? `<span class="project-badge ${project.badge.includes('경소톤') || project.badge.includes('동상') ? 'award' : ''}">${project.badge}</span>` : '';

        // 기술 스택 HTML 생성
        const techStackHTML = project.tech.map(tech => `<span>${tech}</span>`).join('');

        // 하이라이트 HTML 생성
        const highlightsHTML = project.highlights.map(highlight => `<li>${highlight}</li>`).join('');

        return `
            <div class="project-card" data-category="${project.category}">
                <div class="project-image">
                    <img src="${project.imageUrl}" alt="${project.imageAlt}" loading="lazy" decoding="async">
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
        `;
    }).join('');

    // Masonry용 sizer 요소 추가
    const sizerHTML = `
        <div class="projects-grid-sizer"></div>
        <div class="projects-gutter-sizer"></div>
    `;

    projectsGrid.innerHTML = sizerHTML + projectCardsHTML;

    // 프로젝트 카드 클릭 이벤트 리스너만 추가 (모달 이벤트는 initProjectsUI에서 한 번만 등록)
    setupProjectCardListeners();

    // Masonry 초기화 (CSS에서 초기 로딩 처리)
    initMasonry();
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
