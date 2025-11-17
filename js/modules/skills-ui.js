// ========================================
// Skills UI Module
// ========================================

import { skillsData } from '../data/skills.js';

/**
 * 스킬 섹션을 동적으로 렌더링하는 함수
 */
function renderSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) {
        console.error('skills-grid container not found');
        return;
    }

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

    // 스킬 레벨 애니메이션 재적용
    const skillItems = document.querySelectorAll('.skill-item[data-level]');
    skillItems.forEach(item => {
        const level = item.getAttribute('data-level');
        if (level) {
            item.style.setProperty('--skill-level', level + '%');
        }
    });
}

/**
 * 스킬 UI 모듈 초기화
 */
export function initSkillsUI() {
    renderSkills();

    console.log('✅ Skills UI module initialized');
}
