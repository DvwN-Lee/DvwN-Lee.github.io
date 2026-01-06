// ========================================
// Main Entry Point
// ========================================

// Import all modules
import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initUtils, debugLog } from './modules/utils.js';
import { initProjectsUI } from './modules/projects-ui.js';
import { initSkillsUI } from './modules/skills-ui.js';
import { initTimelineUI } from './modules/timeline-ui.js';
import { initAnimations } from './modules/animations.js';
import { initProblemSolvingUI } from './modules/problem-solving-ui.js';
import { initSiteInfoUI } from './modules/site-info-ui.js';
import { initIntroUI } from './modules/intro-ui.js';

debugLog('ES6 Module System Loaded!');

// DOM이 완전히 로드된 후 초기화
document.addEventListener('DOMContentLoaded', () => {
    debugLog('DOM Content Loaded!');
    debugLog('Portfolio initialization started...');

    // /#projects 직접 접근 시 body에 클래스 추가 (프로젝트 카드 렌더링 전에 CSS 적용)
    debugLog('Hash check:', window.location.hash, window.location.hash === '#projects');
    if (window.location.hash === '#projects') {
        document.body.classList.add('direct-projects-access');
        debugLog('direct-projects-access 클래스 추가됨');
    }

    // Initialize all modules in order
    initTheme();         // 테마 시스템 (가장 먼저 초기화)
    initNavigation();    // 네비게이션
    initUtils();         // 유틸리티 함수
    initIntroUI();       // Hero & About UI 렌더링
    initSkillsUI();      // 스킬 UI 렌더링
    initTimelineUI();    // 타임라인 UI 렌더링
    initProjectsUI();    // 프로젝트 UI 렌더링
    initProblemSolvingUI(); // Problem Solving UI 렌더링
    initSiteInfoUI();    // Contact & Footer UI 렌더링

    initAnimations();    // 애니메이션 효과 (모든 UI 렌더링 후 초기화)

    // 모든 UI 렌더링 후 AOS refresh
    // /#projects 직접 접근 시에는 animations.js에서 수동으로 처리
    if (typeof AOS !== 'undefined' && !document.body.classList.contains('direct-projects-access')) {
        AOS.refresh();
    }

    debugLog('All modules initialized successfully!');
});
