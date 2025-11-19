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
 * @param {HTMLElement} clickedElement - 클릭된 요소
 */
function openProjectModal(projectId, clickedElement = null) {
    const modal = document.getElementById('projectModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    const modalContentInner = document.getElementById('modalContent');
    const project = projectsData.find(p => p.id === projectId);

    if (!project || !modal || !modalContent || !modalContentInner) return;

    let contentHTML = '';

    if (project.modalDetails) {
        const sectionsHTML = project.modalDetails.map(section => {
            let sectionContent = '';
            if (section.content) {
                sectionContent = `<p>${section.content}</p>`;
            } else if (section.items) {
                if (section.type === 'techStack') {
                    const techItems = section.items.map(item => `<span>${item}</span>`).join('');
                    sectionContent = `<div class="modal-tech-stack">${techItems}</div>`;
                } else {
                    const listTag = section.listType === 'ol' ? 'ol' : 'ul';
                    const itemsHTML = section.items.map(item => `<li>${item}</li>`).join('');
                    sectionContent = `<${listTag}>${itemsHTML}</${listTag}>`;
                }
            }

            return `
                <div class="modal-section">
                    <h4>${section.title}</h4>
                    ${sectionContent}
                </div>
            `;
        }).join('');

        contentHTML = `
            <div class="modal-details-content visible">
                ${sectionsHTML}
                <div class="modal-links">
                    <a href="${project.githubUrl}" target="_blank" class="btn btn-primary">
                        <i class="fab fa-github"></i> GitHub Repository
                    </a>
                </div>
            </div>
        `;
    }

    modalContentInner.innerHTML = `
        <h2>${project.title}</h2>
        ${contentHTML}
    `;

    // 모달 표시 애니메이션 (카드 위치에서 시작)
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    if (clickedElement) {
        // 클릭된 요소의 위치 가져오기
        const rect = clickedElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 뷰포트 중앙 계산
        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;

        // 초기 위치 설정 (카드 위치)
        const translateX = centerX - viewportCenterX;
        const translateY = centerY - viewportCenterY;

        // 첫 번째 프레임: 초기 위치 설정
        requestAnimationFrame(() => {
            // position: fixed; top: 50%; left: 50%이므로
            // translate(-50%, -50%)를 기본으로 요소 중심을 제어
            modalContent.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(0.1)`;
            modalContent.style.opacity = '0';

            // 두 번째 프레임: 애니메이션 시작 (최종 상태로 transition)
            requestAnimationFrame(() => {
                modal.classList.add('show');
                // 최종 상태: 요소 중심을 viewport 중앙에 배치
                modalContent.style.transform = 'translate(-50%, -50%) scale(1)';
                modalContent.style.opacity = '1';
            });
        });
    } else {
        // 클릭 요소 없으면 기본 애니메이션 (중앙에서 fade in)
        requestAnimationFrame(() => {
            modalContent.style.transform = 'translate(-50%, -50%) scale(0.8)';
            modalContent.style.opacity = '0';

            requestAnimationFrame(() => {
                modal.classList.add('show');
                modalContent.style.transform = 'translate(-50%, -50%) scale(1)';
                modalContent.style.opacity = '1';
            });
        });
    }
}

/**
 * 모달 닫기
 */
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    if (modal) {
        // 애니메이션 클래스 제거
        modal.classList.remove('show');
        // 애니메이션이 끝난 후 display none 및 transform 초기화
        setTimeout(() => {
            modal.style.display = 'none';
            if (modalContent) {
                modalContent.style.transform = '';
                modalContent.style.opacity = '';
            }
        }, 500); // transition 시간과 동일 (0.5s)
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
            // 클릭된 카드 요소 찾기
            const projectCard = e.currentTarget.closest('.project-card');
            openProjectModal(projectId, projectCard || e.currentTarget);
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
