// ========================================
// Projects UI Module
// ========================================

import { projectsData } from '../data/projects.js';



/**
 * 프로젝트 카드 애니메이션 적용
 * @param {string} filterValue - 필터 값 ('all', 'cloud', 'backend', 'fullstack')
 */
function animateProjectCards(filterValue = 'all') {
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.querySelector('.projects-grid');

    // 1단계: 모든 카드 fade-out
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
    });

    // 2단계: fade-out 애니메이션 완료 후 레이아웃 변경 및 fade-in
    setTimeout(() => {
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
        setTimeout(() => {
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
    }, 400);
}

/**
 * 프로젝트 카드를 동적으로 렌더링하는 함수
 */
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) {
        console.error('projects-grid container not found');
        return;
    }

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
let isModalAnimating = false;

/**
 * Opens a project modal with a center fade-in/scale animation.
 * @param {string} projectId - The ID of the project to display.
 * @param {HTMLElement} clickedCard - The clicked project card element.
 */
function openProjectModal(projectId, clickedCard) {
    if (isModalAnimating) return;

    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    isModalAnimating = true;

    const modal = document.getElementById('projectModal');
    const modalContent = modal.querySelector('.modal-content');
    const modalContentInner = modal.querySelector('.modal-content-inner');

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
            <h2 id="modalTitle">${project.title}</h2>
            <div class="modal-details-content visible">
                ${sectionsHTML}
                <div class="modal-links">
                    <a href="${project.githubUrl}" target="_blank" class="btn btn-primary">
                        <i class="fab fa-github"></i> GitHub Repository
                    </a>
                </div>
            </div>`;
    }
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
            isModalAnimating = false;
            setupFocusTrap();
        }
    };

    modalContent.addEventListener('transitionend', handleTransitionEnd, { once: true });

    setTimeout(() => {
        if (isModalAnimating) {
            isModalAnimating = false;
            setupFocusTrap();
        }
    }, 500)
}

/**
 * 모달 내부 포커스 트랩 설정
 */
function setupFocusTrap() {
    const modal = document.getElementById('projectModal');
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
    if (isModalAnimating) return;
    isModalAnimating = true;

    const modal = document.getElementById('projectModal');
    const modalContent = modal.querySelector('.modal-content');

    modal.classList.remove('is-opening');

    const handleTransitionEnd = (e) => {
        if (e.target === modalContent && e.propertyName === 'transform') {
            modal.style.display = 'none';
            isModalAnimating = false;
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '';
            modal.setAttribute('aria-hidden', 'true');

            if (focusedElementBeforeModal) {
                focusedElementBeforeModal.focus();
            }
        }
    };

    modalContent.addEventListener('transitionend', handleTransitionEnd, { once: true });

    setTimeout(() => {
        if (isModalAnimating) {
            modal.style.display = 'none';
            isModalAnimating = false;
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '';
            modal.setAttribute('aria-hidden', 'true');
        }
    }, 500);
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
    const modal = document.getElementById('projectModal');

    // Clicking on the modal backdrop - 한 번만 등록
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Closing with the Escape key and focus trap management - 한 번만 등록
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('projectModal');
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

    console.log('✅ Projects UI module initialized');
}
