// ========================================
// Main Entry Point
// ========================================

// Import all modules
import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initUtils } from './modules/utils.js';
import { initProjectsUI } from './modules/projects-ui.js';
import { initSkillsUI } from './modules/skills-ui.js';
import { initTimelineUI } from './modules/timeline-ui.js';
import { initAnimations } from './modules/animations.js';
import { initProblemSolvingUI } from './modules/problem-solving-ui.js';
import { initSiteInfoUI } from './modules/site-info-ui.js';
import { initIntroUI } from './modules/intro-ui.js';

console.log('ES6 Module System Loaded!');

// DOM이 완전히 로드된 후 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded!');
    console.log('Portfolio initialization started...');

    // Initialize all modules in order
    initTheme();         // 테마 시스템 (가장 먼저 초기화)
    initAnimations();    // 애니메이션 효과 (AOS 먼저 초기화)
    initNavigation();    // 네비게이션
    initUtils();         // 유틸리티 함수
    initIntroUI();       // Hero & About UI 렌더링
    initSkillsUI();      // 스킬 UI 렌더링
    initTimelineUI();    // 타임라인 UI 렌더링
    initProjectsUI();    // 프로젝트 UI 렌더링
    initProblemSolvingUI(); // Problem Solving UI 렌더링
    initSiteInfoUI();    // Contact & Footer UI 렌더링

    // 모든 UI 렌더링 후 AOS refresh
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }

    console.log('All modules initialized successfully!');
});
