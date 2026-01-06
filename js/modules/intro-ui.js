// ========================================
// Intro UI Module (Hero & About)
// ========================================

import { config } from '../data/config.js';
import { projectsData } from '../data/projects.js';
import { getRequiredElement, debugLog } from './utils.js';

/**
 * Hero 섹션의 텍스트를 동적으로 렌더링합니다.
 */
function renderHero() {
    const heroTitle = getRequiredElement('.hero-title', 'Intro UI');
    const heroSubtitle = getRequiredElement('.hero-subtitle', 'Intro UI');

    if (heroTitle) {
        heroTitle.innerHTML = config.hero.title;
    }
    if (heroSubtitle) {
        heroSubtitle.innerHTML = config.hero.subtitle;
    }
}

/**
 * About 섹션의 텍스트를 동적으로 렌더링합니다.
 */
function renderAbout() {
    const aboutTextContainer = getRequiredElement('.about-text', 'Intro UI');
    if (!aboutTextContainer) return;

    const titleHTML = `<h3>${config.about.title}</h3>`;
    const paragraphsHTML = config.about.paragraphs.map(p => `<p>${p}</p>`).join('');

    // 기존 highlights는 유지하고 텍스트만 교체
    const highlightsContainer = aboutTextContainer.querySelector('.about-highlights');

    aboutTextContainer.innerHTML = titleHTML + paragraphsHTML;
    if (highlightsContainer) {
        aboutTextContainer.appendChild(highlightsContainer);
    }
}

/**
 * 프로젝트 통계를 동적으로 업데이트합니다.
 */
function updateProjectStats() {
    const projectCountElement = document.querySelector('.stat-number[data-target]');
    if (!projectCountElement) return;

    // 전체 프로젝트 개수를 계산
    const projectCount = projectsData.length;

    // data-target 속성을 동적으로 업데이트
    projectCountElement.setAttribute('data-target', projectCount);
}

/**
 * Intro UI 모듈 초기화
 */
export function initIntroUI() {
    renderHero();
    renderAbout();
    updateProjectStats();
    debugLog('Intro UI module initialized');
}
