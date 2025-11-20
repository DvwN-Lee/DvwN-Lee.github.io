// ========================================
// Utility Functions Module
// ========================================

/**
 * DOM 요소를 안전하게 선택하고 null 체크를 수행하는 유틸리티 함수
 * @param {string} selector - CSS 선택자
 * @param {string} moduleName - 모듈 이름 (에러 메시지용)
 * @returns {Element|null} - 선택된 요소 또는 null
 */
export function getRequiredElement(selector, moduleName = '') {
    const element = document.querySelector(selector);
    if (!element) {
        const prefix = moduleName ? `[${moduleName}]` : '';
        console.error(`${prefix} Required element not found: ${selector}`);
    }
    return element;
}

/**
 * 이메일 주소를 클립보드에 복사
 * @param {string} email - 복사할 이메일 주소
 * @param {Event} event - 클릭 이벤트 객체
 */
function copyEmail(email, event) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
            showCopyFeedback(event);
        }).catch(err => {
            console.error('클립보드 API 복사 실패:', err);
            fallbackCopyEmail(email, event);
        });
    } else {
        fallbackCopyEmail(email, event);
    }
}

/**
 * 클립보드 API를 지원하지 않는 브라우저를 위한 폴백 복사 함수
 * @param {string} email - 복사할 이메일 주소
 * @param {Event} evt - 클릭 이벤트 객체
 */
function fallbackCopyEmail(email, evt) {
    const tempInput = document.createElement('textarea');
    tempInput.value = email;
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999);

    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(() => {
                showCopyFeedback(evt);
            });
        } else {
            alert('이메일 주소를 복사하려면 Ctrl+C (또는 Cmd+C)를 눌러주세요.');
        }
    } catch (err) {
        console.error('복사 실패:', err);
        alert('복사에 실패했습니다. 이메일 주소를 수동으로 복사해주세요: ' + email);
    }

    document.body.removeChild(tempInput);
}

/**
 * 이메일 복사 완료 피드백 표시
 * @param {Event} evt - 클릭 이벤트 객체
 */
function showCopyFeedback(evt) {
    if (!evt) return;

    const emailLink = evt.target.closest('.email-copy');
    if (!emailLink) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = '이메일 주소가 클립보드에 복사되었습니다!';
    document.body.appendChild(tooltip);

    setTimeout(() => {
        tooltip.classList.add('fade-out');
        setTimeout(() => {
            if (tooltip.parentNode) {
                document.body.removeChild(tooltip);
            }
        }, 300);
    }, 2000);
}

/**
 * 페이지 최상단으로 부드럽게 스크롤
 */
export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * 스크롤 투 탑 버튼 이벤트 리스너 설정
 */
function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }
}

/**
 * Details/Summary 아코디언 애니메이션 설정
 * padding 애니메이션을 포함하여 더 부드러운 전환 효과 제공
 */
export function setupDetailsAccordion() {
    // DOM 쿼리를 한 번만 수행하여 캐싱 (성능 최적화)
    const allDetails = document.querySelectorAll('.problem-item details');

    allDetails.forEach(detail => {
        const summary = detail.querySelector('summary');
        const content = detail.querySelector('.problem-details');

        summary.addEventListener('click', (event) => {
            event.preventDefault();

            // 캐싱된 배열을 사용하여 다른 열린 details 닫기 (아코디언 효과)
            allDetails.forEach(openDetail => {
                if (openDetail !== detail && openDetail.open) {
                    const openContent = openDetail.querySelector('.problem-details');
                    openContent.style.height = `${openContent.scrollHeight}px`;
                    requestAnimationFrame(() => {
                        openContent.style.height = '0px';
                        openContent.style.paddingTop = '0';
                        openContent.style.paddingBottom = '0';
                    });
                    openContent.addEventListener('transitionend', () => {
                        openDetail.removeAttribute('open');
                    }, { once: true });
                }
            });

            // 현재 details 토글
            if (detail.open) {
                // 닫기 애니메이션
                content.style.height = `${content.scrollHeight}px`;
                requestAnimationFrame(() => {
                    content.style.height = '0px';
                    content.style.paddingTop = '0';
                    content.style.paddingBottom = '0';
                });
                content.addEventListener('transitionend', () => {
                    detail.removeAttribute('open');
                }, { once: true });

            } else {
                // 열기 애니메이션
                detail.setAttribute('open', '');
                content.style.height = '0px';
                content.style.paddingTop = '0';
                content.style.paddingBottom = '0';

                requestAnimationFrame(() => {
                    content.style.height = `${content.scrollHeight}px`;
                    content.style.paddingTop = '25px';
                    content.style.paddingBottom = '25px';
                });

                // 애니메이션 완료 후 height를 auto로 설정 (반응형 대응)
                content.addEventListener('transitionend', () => {
                    content.style.height = 'auto';
                }, { once: true });
            }
        });
    });
}

/**
 * 이메일 복사 이벤트 리스너 설정
 */
function setupEmailCopy() {
    const emailLink = document.querySelector('.email-copy');

    if (emailLink) {
        emailLink.addEventListener('click', (event) => {
            event.preventDefault();
            const email = emailLink.getAttribute('data-email');
            if (email) {
                copyEmail(email, event);
            }
        });
    }
}

/**
 * 유틸리티 모듈 초기화
 */
export function initUtils() {
    setupScrollToTop();
    setupEmailCopy();
    // setupDetailsAccordion은 각 모듈에서 동적 콘텐츠 렌더링 후 호출됨

    console.log('✅ Utils module initialized');
}
