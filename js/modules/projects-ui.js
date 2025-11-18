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

        // 중앙 정렬 클래스 초기화
        cardsToShow.forEach(card => card.classList.remove('last-row-single', 'last-row-pair-1', 'last-row-pair-2'));

        // Grid 레이아웃 및 중앙 정렬 로직
        projectsGrid.classList.remove('single-item');
        if (cardsToShow.length === 1) {
            projectsGrid.classList.add('single-item');
        } else if (cardsToShow.length > 1) {
            const featuredCount = cardsToShow.filter(card => card.classList.contains('featured')).length;
            const totalSlots = cardsToShow.length + featuredCount;
            const lastRowSlots = totalSlots % 3;

            if (lastRowSlots === 1) {
                cardsToShow[cardsToShow.length - 1].classList.add('last-row-single');
            } else if (lastRowSlots === 2) {
                const lastTwoCards = cardsToShow.slice(-2);
                if (lastTwoCards.length === 2) {
                    lastTwoCards[0].classList.add('last-row-pair-1');
                    lastTwoCards[1].classList.add('last-row-pair-2');
                }
            }
        }

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

        // 애니메이션이 끝난 후 transition-delay 초기화 및 AOS 새로고침
        setTimeout(() => {
            cardsToShow.forEach(card => {
                card.style.transitionDelay = '0ms';
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

    // 모달 열기 이벤트 리스너 추가
    setupModalListeners();
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

/**
 * 프로젝트 모달 열기
 * @param {string} projectId - 프로젝트 ID
 */
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const project = projectsData.find(p => p.id === projectId);

    if (project && modal && modalContent) {
        modalContent.innerHTML = `
            <h2>${project.title}</h2>
            ${project.modalContent}
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

/**
 * 모달 닫기
 */
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/**
 * 모달 이벤트 리스너 설정
 */
function setupModalListeners() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');

    // 프로젝트 카드의 확장 버튼 이벤트 리스너
    document.querySelectorAll('[data-project-id]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = e.currentTarget.getAttribute('data-project-id');
            openProjectModal(projectId);
        });
    });

    // 모달 닫기 버튼
    if (closeBtn) {
        closeBtn.onclick = closeProjectModal;
    }

    // 모달 외부 클릭 시 닫기
    if (modal) {
        window.onclick = function(event) {
            if (event.target === modal) {
                closeProjectModal();
            }
        };
    }
}

/**
 * 프로젝트 UI 모듈 초기화
 */
export function initProjectsUI() {
    renderProjects();
    initializeProjectFilter();

    console.log('✅ Projects UI module initialized');
}
