// ========================================
// Navigation Module
// ========================================

import { scrollToTop } from './utils.js';

// DOM 요소 캐싱 (모듈 스코프 - 한 번만 조회)
const navbar = document.querySelector('.navbar');
const scrollProgress = document.querySelector('.scroll-progress');
const scrollToTopBtn = document.getElementById('scrollToTop');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

// 현재 활성화된 링크 추적
let currentActiveLink = null;

/**
 * 스크롤 이벤트 핸들러 (최적화)
 */
function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Navbar scroll effect
    if (navbar) {
        navbar.classList.toggle('scrolled', scrollY > 50);
    }

    // Scroll progress bar
    if (scrollProgress) {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }

    // Scroll to top button
    if (scrollToTopBtn) {
        scrollToTopBtn.classList.toggle('visible', scrollY > 300);
    }

    // Active navigation link (최적화 - 변경된 경우에만 DOM 조작)
    let currentSectionId = '';

    // 페이지 맨 하단에 도달했는지 확인
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const isAtBottom = scrollY + windowHeight >= documentHeight - 10; // 10px 여유

    if (isAtBottom && sections.length > 0) {
        // 맨 하단에 도달했으면 마지막 섹션(Contact) 활성화
        currentSectionId = sections[sections.length - 1].getAttribute('id');
    } else {
        // 일반적인 스크롤 위치에서는 기존 로직 사용
        for (const section of sections) {
            if (scrollY >= section.offsetTop - 100) {
                currentSectionId = section.getAttribute('id');
            }
        }
    }

    const newActiveLink = document.querySelector(`.nav-link[href="#${currentSectionId}"]`);

    if (newActiveLink !== currentActiveLink) {
        // 모든 링크에서 active 클래스 제거 (HTML 초기 설정 포함)
        navLinks.forEach(link => link.classList.remove('active'));

        if (newActiveLink) {
            newActiveLink.classList.add('active');
        }
        currentActiveLink = newActiveLink;
    }
}

/**
 * 모바일 메뉴 토글 설정
 */
function setupMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isActive = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');

            // 접근성: aria-expanded 업데이트
            navToggle.setAttribute('aria-expanded', isActive);
        });
    }
}

/**
 * 네비게이션 링크 부드러운 스크롤 설정 (이벤트 위임 적용)
 */
function setupSmoothScroll() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    if (navMenu) {
        // 이벤트 위임: navMenu에 하나의 리스너만 등록
        navMenu.addEventListener('click', (e) => {
            const link = e.target.closest('.nav-link');
            if (!link) return;

            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // 클릭한 링크를 즉시 활성화 (특히 마지막 섹션의 경우)
                const allLinks = document.querySelectorAll('.nav-link');
                allLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                currentActiveLink = link;

                // Close mobile menu if open
                if (navMenu.classList.contains('active') && navToggle) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }
}

/**
 * 스크롤 이벤트 리스너 설정 (성능 최적화를 위한 throttle 적용)
 */
function setupScrollListener() {
    let isScrolling = false;

    // 스크롤 이벤트
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                handleScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // 페이지 로드 완료 후 스크롤 상태 재확인
    window.addEventListener('load', function() {
        handleScroll();
    });

    // 리사이즈 시에도 스크롤 상태 확인
    window.addEventListener('resize', function() {
        handleScroll();
    });
}

/**
 * 로고 클릭 시 최상단 스크롤 설정
 */
function setupLogoScrollToTop() {
    const navLogo = document.querySelector('.nav-logo');

    if (navLogo) {
        navLogo.style.cursor = 'pointer';
        navLogo.addEventListener('click', scrollToTop);
    }
}

/**
 * 네비게이션 모듈 초기화
 */
export function initNavigation() {
    setupMobileMenu();
    setupSmoothScroll();
    setupScrollListener();
    setupLogoScrollToTop();

    // 페이지 로드 시 초기 스크롤 상태 확인
    handleScroll();

    // DOM 렌더링이 완전히 완료된 후 재확인 (레이아웃 안정화 후)
    setTimeout(() => {
        handleScroll();
    }, 100);

    console.log(' Navigation module initialized');
}
