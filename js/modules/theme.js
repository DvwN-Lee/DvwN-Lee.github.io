// ========================================
// Theme Module (Dark/Light Mode)
// ========================================

import { debugLog, prefersReducedMotion } from './utils.js';
import { config } from '../data/config.js';

const { particles: particlesConfig } = config.constants;

/**
 * Particles.js 설정을 반환하는 함수
 * @param {string} particleColor 파티클 색상
 * @param {string} lineColor 라인 색상
 * @returns {object} Particles.js 설정 객체
 */
function getParticlesSettings(particleColor, lineColor) {
    return {
        particles: {
            number: {
                value: particlesConfig.count,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: particleColor
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false
                }
            },
            line_linked: {
                enable: true,
                distance: particlesConfig.lineDistance,
                color: lineColor,
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: particlesConfig.speed,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    };
}

/**
 * 현재 테마에 맞춰 Particles.js를 로드하거나 업데이트합니다.
 */
function loadParticlesTheme() {
    // reduced motion, 모바일, particles-js 요소 없음 시 실행하지 않음
    if (prefersReducedMotion() || window.innerWidth <= particlesConfig.mobileBreakpoint || !document.getElementById('particles-js')) {
        // 기존 인스턴스가 있다면 제거
        if (window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
            window.pJSDom = [];
        }
        return;
    }

    // CSS 변수에서 primary color 읽어오기 (테마 자동 반영)
    const computedStyle = getComputedStyle(document.documentElement);
    const particleColor = computedStyle.getPropertyValue('--primary-color').trim();
    const lineColor = particleColor;

    // 기존 particlesJS 인스턴스가 있다면 제거
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }

    // 새로운 설정으로 particlesJS 초기화
    particlesJS('particles-js', getParticlesSettings(particleColor, lineColor));
}

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

    // Particles.js 테마 업데이트
    loadParticlesTheme();
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
    // 페이지 로드 시 현재 테마에 맞는 파티클 로드
    loadParticlesTheme();

    // 테마 토글 버튼 이벤트 리스너 설정
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    debugLog('Theme module initialized');
}

// 페이지 로드 전에 테마 적용 (깜빡임 방지) - 모듈 로드 시 즉시 실행
loadTheme();
