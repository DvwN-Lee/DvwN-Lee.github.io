// ========================================
// Site Info UI Module (Contact & Footer)
// ========================================

import { config } from '../data/config.js';
import { getRequiredElement, setupEmailCopy, debugLog } from './utils.js';

// 클릭 애니메이션 타이밍 상수 (config에서 가져옴)
const CLICK_ANIMATION_DURATION = config.constants.animations.clickAnimation;

// 소셜 링크별 타이머를 저장하는 WeakMap (메모리 누수 방지)
const socialLinkTimers = new WeakMap();

/**
 * Contact 섹션의 정보를 동적으로 렌더링합니다.
 */
function renderContactInfo() {
    const contactContainer = getRequiredElement('#contact .contact-info', 'Site Info UI');
    if (!contactContainer) return;

    const emailHTML = `
        <div class="contact-item" data-aos="fade-up" data-aos-delay="200">
            <i class="fas fa-envelope"></i>
            <h4>Email</h4>
            <p>
                <a href="mailto:${config.email}"
                class="email-copy"
                data-email="${config.email}">
                    ${config.email}
                </a>
            </p>
        </div>
    `;

    const socialsHTML = config.socials.map((social, index) => `
        <div class="contact-item" data-aos="fade-up" data-aos-delay="${(index + 3) * 100}">
            <i class="${social.iconClass}"></i>
            <h4>${social.name}</h4>
            <p>
                <a href="${social.url}"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link">
                    ${social.handle}
                </a>
            </p>
        </div>
    `).join('');

    contactContainer.innerHTML = emailHTML + socialsHTML;
}

/**
 * 소셜 링크 클릭 애니메이션을 설정합니다.
 * 인라인 onclick 핸들러를 대체하여 CSP 호환성 및 타이머 정리를 개선합니다.
 */
function setupSocialLinkClickAnimation() {
    const socialLinks = document.querySelectorAll('.contact-item a.social-link');

    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            // 기존 타이머가 있으면 정리 (다중 클릭 시 중첩 방지)
            const existingTimer = socialLinkTimers.get(link);
            if (existingTimer) {
                clearTimeout(existingTimer);
            }

            // 클릭 애니메이션 클래스 추가
            link.classList.add('clicking');

            // 타이머 설정 및 ID 저장
            const timerId = setTimeout(() => {
                link.classList.remove('clicking');
                socialLinkTimers.delete(link);
            }, CLICK_ANIMATION_DURATION);

            socialLinkTimers.set(link, timerId);
        });
    });
}

/**
 * 소셜 링크 타이머 정리 (페이지 언로드 시 호출)
 */
function cleanupSocialLinkTimers() {
    const socialLinks = document.querySelectorAll('.contact-item a.social-link');
    socialLinks.forEach(link => {
        const timerId = socialLinkTimers.get(link);
        if (timerId) {
            clearTimeout(timerId);
            socialLinkTimers.delete(link);
        }
    });
}

/**
 * Footer 정보를 동적으로 렌더링합니다. (저작권 연도 및 소셜 링크)
 */
function renderFooter() {
    const footerContainer = getRequiredElement('footer .container', 'Site Info UI');
    if (!footerContainer) return;

    const currentYear = new Date().getFullYear();

    // GitHub만 필터링하여 표시
    const footerLinksHTML = config.socials
        .filter(social => social.name === 'GitHub')
        .map(social => `
            <a href="${social.url}" target="_blank" aria-label="${social.name}"><i class="${social.iconClass}"></i></a>
        `).join('');

    footerContainer.innerHTML = `
        <p>© ${currentYear} 이동주. All rights reserved.</p>
        <div class="footer-links">
            ${footerLinksHTML}
        </div>
    `;
}

/**
 * Site Info UI 모듈 초기화
 */
export function initSiteInfoUI() {
    renderContactInfo();
    renderFooter();

    // Contact 정보 렌더링 후 이벤트 리스너 설정
    setupEmailCopy();
    setupSocialLinkClickAnimation();

    // 페이지 언로드 시 타이머 정리
    window.addEventListener('beforeunload', cleanupSocialLinkTimers);

    debugLog('Site Info UI module initialized');
}
