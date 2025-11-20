// ========================================
// Skills UI Module
// ========================================

import { skillsData } from '../data/skills.js';
import { getRequiredElement } from './utils.js';

/**
 * 스킬 섹션을 동적으로 렌더링하는 함수
 */
function renderSkills() {
    const skillsGrid = getRequiredElement('.skills-grid', 'Skills UI');
    if (!skillsGrid) return;

    const skillCategoriesHTML = skillsData.map((category, index) => {
        // AOS delay 계산 (100ms 간격)
        const aosDelay = index * 100;

        // 스킬 아이템 HTML 생성
        const skillItemsHTML = category.skills.map(skill => {
            const styleAttr = skill.iconStyle ? `style="${skill.iconStyle}"` : '';
            return `
                <div class="skill-item" data-level="${skill.level}">
                    <img src="${skill.iconUrl}" alt="${skill.name}" loading="lazy" decoding="async" ${styleAttr}>
                    <span>${skill.name}</span>
                    <div class="skill-level"></div>
                </div>
            `;
        }).join('');

        return `
            <div class="skill-category" data-aos="fade-up" data-aos-delay="${aosDelay}">
                <h3><i class="${category.icon}"></i> ${category.title}</h3>
                <div class="skill-items">
                    ${skillItemsHTML}
                </div>
            </div>
        `;
    }).join('');

    skillsGrid.innerHTML = skillCategoriesHTML;

    // 스킬 레벨 CSS 변수 설정 (최적화된 방식)
    initSkillsAnimation();
}

/**
 * 스킬 레벨 애니메이션 초기화
 * IntersectionObserver를 사용하여 뷰포트 진입 시에만 애니메이션 실행
 */
function initSkillsAnimation() {
    const skillsSection = getRequiredElement('.skills', 'Skills UI');
    const skillItems = document.querySelectorAll('.skill-item[data-level]');

    if (!skillsSection || skillItems.length === 0) return;

    // 각 스킬 아이템의 data-level을 CSS 변수로 설정
    skillItems.forEach(item => {
        const level = item.getAttribute('data-level');
        if (level) {
            const levelDecimal = parseInt(level, 10) / 100; // 90 -> 0.9
            item.style.setProperty('--skill-level-decimal', levelDecimal);
        }
    });

    // IntersectionObserver 설정
    const observerOptions = {
        root: null, // viewport 기준
        rootMargin: '0px',
        threshold: 0.2 // 섹션의 20%가 보이면 트리거
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 뷰포트에 들어왔을 때 is-visible 클래스 추가
                entry.target.classList.add('is-visible');

                // 한 번만 실행하고 관찰 중단 (메모리 최적화)
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(skillsSection);
}

/**
 * 스킬 UI 모듈 초기화
 */
export function initSkillsUI() {
    renderSkills();

    console.log('✅ Skills UI module initialized');
}
