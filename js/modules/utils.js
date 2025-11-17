// ========================================
// Utility Functions Module
// ========================================

/**
 * 이메일 주소를 클립보드에 복사
 * @param {string} email - 복사할 이메일 주소
 * @param {Event} event - 클릭 이벤트 객체
 */
function copyEmail(email, event) {
    const emailLink = event.target.closest('.email-copy');
    if (emailLink) {
        emailLink.classList.add('copying');
        setTimeout(() => {
            emailLink.classList.remove('copying');
        }, 300);
    }

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

    emailLink.classList.add('copied');

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

    setTimeout(() => {
        emailLink.classList.remove('copied');
    }, 2500);
}

/**
 * 스크롤 투 탑 버튼 이벤트 리스너 설정
 */
function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * 유틸리티 모듈 초기화
 */
export function initUtils() {
    setupScrollToTop();

    // copyEmail 함수를 전역으로 노출 (HTML onclick에서 사용)
    window.copyEmail = copyEmail;

    console.log('✅ Utils module initialized');
}
