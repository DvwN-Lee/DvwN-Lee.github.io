// ========================================
// Animations Module
// ========================================

/**
 * AOS (Animate On Scroll) 초기화
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        // /#projects 직접 접근 또는 페이지 reload 시: 이미 viewport에 있는 카드의 AOS 애니메이션 비활성화
        // Scroll restoration으로 카드가 이미 보이는 상태에서 fade-up 애니메이션이 발생하면
        // 카드가 30px 아래에서 시작하여 위로 올라오는 시각적 "벌어짐" 현상 발생
        if (document.body.classList.contains('direct-projects-access')) {
            const projectCards = document.querySelectorAll('.project-card[data-aos]');
            projectCards.forEach(card => {
                // aos-init, aos-animate 클래스를 사전에 추가하여
                // AOS가 이 카드들을 이미 애니메이션된 것으로 간주하도록 함
                card.classList.add('aos-init', 'aos-animate');

                // data-aos 속성 제거로 AOS가 이 요소를 추적하지 않도록 함
                card.removeAttribute('data-aos');
            });
        }

        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 200
        });
    }
}

/**
 * Counter 애니메이션 설정
 * requestAnimationFrame을 사용하여 부드러운 카운팅 효과 구현
 */
function setupCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const ANIMATION_DURATION = 2000; // 2초 동안 애니메이션

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');

                if (target) {
                    const startTime = performance.now();

                    const updateCount = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

                        // easeOutQuad 이징 함수 적용 (가속도가 점점 줄어드는 효과)
                        const easedProgress = 1 - (1 - progress) * (1 - progress);
                        const currentValue = Math.floor(target * easedProgress);

                        counter.innerText = currentValue;

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = target;
                        }
                    };

                    requestAnimationFrame(updateCount);
                    observer.unobserve(counter);
                }
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        if (counter.getAttribute('data-target')) {
            counterObserver.observe(counter);
        }
    });
}

/**
 * TypeWriter 효과 클래스
 */
class TypeWriter {
    constructor(textElement, words, wait = 3000) {
        this.textElement = textElement;
        this.words = words;
        this.text = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.isDeleting = false;
        this.timeoutId = null; // setTimeout ID 저장 (메모리 누수 방지)
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullText = this.words[current];

        if (this.isDeleting) {
            this.text = fullText.substring(0, this.text.length - 1);
        } else {
            this.text = fullText.substring(0, this.text.length + 1);
        }

        this.textElement.innerHTML = `<span class="txt">${this.text}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.text === fullText) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        // setTimeout ID를 저장하여 나중에 정리 가능하도록 함
        this.timeoutId = setTimeout(() => this.type(), typeSpeed);
    }

    /**
     * TypeWriter 애니메이션을 정리하는 메서드 (메모리 누수 방지)
     */
    cleanup() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
}

// TypeWriter 인스턴스를 전역적으로 관리 (메모리 누수 방지)
let typeWriterInstance = null;

/**
 * TypeWriter 초기화
 */
function initTypeWriter() {
    const typeElement = document.querySelector('.type-writer');
    if (typeElement) {
        // 기존 인스턴스가 있다면 정리
        if (typeWriterInstance) {
            typeWriterInstance.cleanup();
        }

        const words = ['Cloud Engineer', 'DevOps Engineer', 'Backend Developer'];
        typeWriterInstance = new TypeWriter(typeElement, words);
    }
}

/**
 * TypeWriter 정리 (페이지 언로드 시 호출)
 */
function cleanupTypeWriter() {
    if (typeWriterInstance) {
        typeWriterInstance.cleanup();
        typeWriterInstance = null;
    }
}

/**
 * Hero 섹션 애니메이션
 */
function animateHero() {
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';

        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

/**
 * Lazy loading 이미지 설정
 */
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');

                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

/**
 * AOS 새로고침 (동적으로 추가된 요소들을 위해)
 */
function refreshAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}


/**
 * 애니메이션 모듈 초기화
 */
export function initAnimations() {
    initAOS();
    setupCounterAnimation();
    initTypeWriter();
    setupLazyLoading();
    animateHero();

    // 페이지 언로드 시 TypeWriter 정리
    window.addEventListener('beforeunload', cleanupTypeWriter);

    console.log(' Animations module initialized');
}
