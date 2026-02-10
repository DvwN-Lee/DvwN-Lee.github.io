// ========================================
// Theme Module (Dark/Light Mode)
// ========================================

import { debugLog } from './utils.js';

/**
 * 테마를 전환하고 localStorage에 저장
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // HTML에 data-theme 속성 설정
    document.documentElement.setAttribute('data-theme', newTheme);

    // localStorage에 저장
    localStorage.setItem('theme', newTheme);
}

/**
 * 저장된 테마 또는 시스템 선호도를 불러와 적용
 */
function loadTheme() {
    // localStorage에서 저장된 테마 확인
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        // 저장된 테마가 있으면 적용
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // 저장된 테마가 없으면 시스템 선호도 확인
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultTheme = prefersDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', defaultTheme);
        localStorage.setItem('theme', defaultTheme);
    }
}

/**
 * 테마 모듈 초기화
 */
export function initTheme() {
    // 테마 토글 버튼 이벤트 리스너 설정
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    debugLog('Theme module initialized');
}

// 페이지 로드 전에 테마 적용 (깜빡임 방지) - 모듈 로드 시 즉시 실행
loadTheme();
