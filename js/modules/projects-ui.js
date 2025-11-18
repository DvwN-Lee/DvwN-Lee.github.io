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

    projectCards.forEach(card => {
        const shouldShow = filterValue === 'all' || card.getAttribute('data-category') === filterValue;

        if (shouldShow) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 400);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 400);
        }
    });
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
