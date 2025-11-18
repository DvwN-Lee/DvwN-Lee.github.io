// ========================================
// Site Info UI Module (Contact & Footer)
// ========================================

import { config } from '../data/config.js';

/**
 * Contact 섹션의 정보를 동적으로 렌더링합니다.
 */
function renderContactInfo() {
    const contactContainer = document.querySelector('#contact .contact-info');
    if (!contactContainer) {
        console.error('Contact container not found');
        return;
    }

    const emailHTML = `
        <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <h4>Email</h4>
            <p>
                <a href="mailto:${config.email}"
                class="email-copy"
                data-email="${config.email}"
                title="클릭하여 복사">
                    ${config.email}
                </a>
            </p>
        </div>
    `;

    const socialsHTML = config.socials.map(social => `
        <div class="contact-item">
            <i class="${social.iconClass}"></i>
            <h4>${social.name}</h4>
            <p>
                <a href="${social.url}" 
                target="_blank" 
                rel="noopener noreferrer"
                onclick="this.classList.add('clicking'); setTimeout(() => this.classList.remove('clicking'), 300);">
                    ${social.handle}
                </a>
            </p>
        </div>
    `).join('');

    contactContainer.innerHTML = emailHTML + socialsHTML;
}

/**
 * Footer 정보를 동적으로 렌더링합니다. (저작권 연도 및 소셜 링크)
 */
function renderFooter() {
    const footerContainer = document.querySelector('footer .container');
    if (!footerContainer) {
        console.error('Footer container not found');
        return;
    }

    const currentYear = new Date().getFullYear();

    const footerLinksHTML = config.socials.map(social => `
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
    console.log('✅ Site Info UI module initialized');
}
