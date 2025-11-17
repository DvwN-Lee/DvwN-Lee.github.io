// ========================================
// Animations Module
// ========================================

/**
 * AOS (Animate On Scroll) 초기화
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
}

/**
 * Counter 애니메이션 설정
 */
function setupCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');

                if (target) {
                    const updateCount = () => {
                        const count = +counter.innerText;
                        const increment = target / speed;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + increment);
                            setTimeout(updateCount, 10);
                        } else {
                            counter.innerText = target;
                        }
                    };

                    updateCount();
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
        this.type();
        this.isDeleting = false;
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

        setTimeout(() => this.type(), typeSpeed);
    }
}

/**
 * TypeWriter 초기화
 */
function initTypeWriter() {
    const typeElement = document.querySelector('.type-writer');
    if (typeElement) {
        const words = ['Cloud Engineer', 'DevOps Engineer', 'Backend Developer'];
        new TypeWriter(typeElement, words);
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

    console.log('✅ Animations module initialized');
}
