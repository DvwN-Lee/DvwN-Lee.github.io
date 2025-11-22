// ========================================
// Projects UI Module
// ========================================

import { projectsData } from '../data/projects.js';
import { getRequiredElement } from './utils.js';
import { AnimationQueue } from './animation-utils.js';

// 필터 애니메이션 상태 관리
const filterAnimationQueue = new AnimationQueue();
const modalAnimationQueue = new AnimationQueue();

/**
 * 프로젝트 카드 애니메이션 적용
 * @param {string} filterValue - 필터 값 ('all', 'cloud', 'backend', 'fullstack')
 */
function animateProjectCards(filterValue = 'all') {
    filterAnimationQueue.start((queue) => {
        const projectCards = document.querySelectorAll('.project-card');

        // 1단계: 모든 카드 fade-out
        projectCards.forEach(card => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
        });

        // 2단계: fade-out 애니메이션 완료 후 레이아웃 변경 및 fade-in
        queue.addTimeout(() => {
            const cardsToShow = [];
            const cardsToHide = [];

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    cardsToShow.push(card);
                } else {
                    cardsToHide.push(card);
                }
            });

            // 레이아웃 변경 전에 숨길 카드들을 먼저 처리
            cardsToHide.forEach(card => {
                card.style.display = 'none';
            });

            // 표시할 카드들 스타일 설정 및 fade-in 준비
            cardsToShow.forEach(card => {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
            });

            // 3단계: 레이아웃 변경 후 fade-in 애니메이션 시작
            requestAnimationFrame(() => {
                cardsToShow.forEach((card, index) => {
                    card.style.transitionDelay = `${index * 50}ms`;
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                });
            });

            // 애니메이션이 끝난 후 스타일 초기화 및 AOS 새로고침
            queue.addTimeout(() => {
                cardsToShow.forEach(card => {
                    card.style.transitionDelay = '';
                    card.style.transform = '';
                    card.style.opacity = '';
                });
                // AOS 라이브러리가 있으면 새로고침하여 스크롤 애니메이션 위치 재계산
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            }, 400 + cardsToShow.length * 50);
        }, 300);
    });
}

/**
 * 프로젝트 카드를 동적으로 렌더링하는 함수
 */
function renderProjects() {
    const projectsGrid = getRequiredElement('.projects-grid', 'Projects UI');
    if (!projectsGrid) return;

    const projectCardsHTML = projectsData.map(project => {
        // Featured 클래스 처리
        const featuredClass = project.featured ? 'featured' : '';

        // 배지 HTML 처리 (배지가 있을 때만 표시)
        const badgeHTML = project.badge ? `<span class="project-badge ${project.badge.includes('경소톤') || project.badge.includes('동상') ? 'award' : ''}">${project.badge}</span>` : '';

        // 기술 스택 HTML 생성
        const techStackHTML = project.tech.map(tech => `<span>${tech}</span>`).join('');

        // 하이라이트 HTML 생성
        const highlightsHTML = project.highlights.map(highlight => `<li>${highlight}</li>`).join('');

        return `
            <div class="project-card ${featuredClass}" data-category="${project.category}">
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

    projectsGrid.innerHTML = projectCardsHTML;

    // 초기 로드 애니메이션
    animateProjectCards('all');

    // 프로젝트 카드 클릭 이벤트 리스너만 추가 (모달 이벤트는 initProjectsUI에서 한 번만 등록)
    setupProjectCardListeners();
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
 * @param {HTMLElement} clickedCard - The clicked project card element.
 */
function openProjectModal(projectId, clickedCard) {
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

        // 스크롤을 항상 맨 위로 설정 (display 설정 후 DOM이 레이아웃된 다음에 실행)
        requestAnimationFrame(() => {
            modalContentInner.scrollTop = 0;
            requestAnimationFrame(() => {
                modalContentInner.scrollTop = 0;
                modal.classList.add('is-opening');
                // 애니메이션 시작 후에도 한번 더 스크롤 위치 강제
                requestAnimationFrame(() => {
                    modalContentInner.scrollTop = 0;
                });
            });
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
    const modal = getRequiredElement('#projectModal', 'Projects UI');
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
        const modal = getRequiredElement('#projectModal', 'Projects UI');
        if (!modal) return;

        const modalContent = modal.querySelector('.modal-content');

        modal.classList.remove('is-opening');

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

        // Fallback: transitionend가 발생하지 않을 경우를 대비한 타이머 (400ms)
        // CSS transition은 300ms이므로 여유있게 400ms 후 강제 정리
        const fallbackTimeout = setTimeout(() => {
            modalContent.removeEventListener('transitionend', handleTransitionEnd);
            cleanupModal();
        }, 400);
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
            const clickedCard = e.currentTarget.closest('.project-card');
            openProjectModal(projectId, clickedCard);
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
        const modal = getRequiredElement('#projectModal', 'Projects UI');
        if (!modal) return;

        const isModalOpen = modal.classList.contains('is-opening');

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

    console.log(' Projects UI module initialized');
}
