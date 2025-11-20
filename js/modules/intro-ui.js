// ========================================
// Intro UI Module (Hero & About)
// ========================================

import { config } from '../data/config.js';
import { getRequiredElement } from './utils.js';

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
 * Intro UI 모듈 초기화
 */
export function initIntroUI() {
    renderHero();
    renderAbout();
    console.log('✅ Intro UI module initialized');
}
