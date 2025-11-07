// ===== Initialize AOS (Animate On Scroll) =====
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translateY(8px)' : '';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translateY(-8px)' : '';
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Smooth Scroll for Navigation Links =====
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// ===== Particles.js Configuration =====
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#4A90E2'
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
                distance: 150,
                color: '#4A90E2',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
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
    });
}

// ===== Counter Animation =====
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

// ===== Skill Level Animation =====
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    const level = item.getAttribute('data-level');
    if (level) {
        item.style.setProperty('--skill-level', level + '%');
    }
});

// ===== Project Filter =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== Project Modal =====
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close');

const projectData = {
    cloudnative: {
        title: 'Cloud-Native 마이크로서비스 플랫폼 v2.0',
        description: `
            <h2>프로젝트 개요</h2>
            <p>로컬 환경에서 운영되던 마이크로서비스를 클라우드 네이티브 아키텍처로 완전히 재구축한 프로젝트입니다. 
            5주간의 개발 기간 동안 Must-Have 100%, Should-Have 100%를 달성했습니다.</p>
            
            <h3>핵심 성과</h3>
            <ul>
                <li><strong>완전 자동화된 CI/CD</strong>: Git Push부터 프로덕션 배포까지 5분 이내 완료</li>
                <li><strong>실시간 모니터링</strong>: Prometheus + Grafana로 Golden Signals 대시보드 구축</li>
                <li><strong>보안 강화</strong>: Istio mTLS STRICT 모드로 서비스 간 암호화 통신</li>
                <li><strong>성능 최적화</strong>: k6 부하 테스트 기반 HPA 튜닝으로 11.6% 성능 개선</li>
            </ul>
            
            <h3>기술 스택</h3>
            <div class="modal-tech-stack">
                <span>Kubernetes</span>
                <span>Terraform</span>
                <span>Istio</span>
                <span>Prometheus</span>
                <span>Grafana</span>
                <span>ArgoCD</span>
                <span>GitHub Actions</span>
                <span>PostgreSQL</span>
            </div>
            
            <h3>아키텍처</h3>
            <ul>
                <li>4개의 마이크로서비스 (API Gateway, Auth, User, Blog)</li>
                <li>Terraform IaC로 인프라 자동 프로비저닝</li>
                <li>GitOps 방식의 배포 (ArgoCD)</li>
                <li>Istio 서비스 메시로 트래픽 관리</li>
                <li>중앙 집중식 로깅 (Loki + Promtail)</li>
            </ul>
            
            <div class="modal-links">
                <a href="https://github.com/DvwN-Lee/Monitoring-v2" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> GitHub Repository
                </a>
            </div>
        `
    },
    dorazy: {
        title: 'Dorazy - 도서관 예약 시스템',
        description: `
            <h2>프로젝트 개요</h2>
            <p>단국대학교 도산라운지 활성화를 위한 좌석 예약 및 관리 안드로이드 애플리케이션입니다.
            경소톤(SW융합대학 X 경영경제대학 연합 해커톤)에서 <strong>동상을 수상</strong>했습니다.</p>
            
            <h3>주요 기능</h3>
            <ul>
                <li>도산라운지 위치 및 이용 안내</li>
                <li>실시간 좌석 현황 확인 및 회의실 예약</li>
                <li>공부 시간 측정 타이머 기능</li>
                <li>공부 시간 기반 랭킹 시스템</li>
            </ul>
            
            <h3>기술적 구현</h3>
            <ul>
                <li>Firebase Realtime Database로 실시간 좌석 정보 동기화</li>
                <li>Firebase Authentication으로 사용자 인증</li>
                <li>Material Design 가이드라인 적용</li>
                <li>Figma를 활용한 UI/UX 디자인</li>
            </ul>
            
            <h3>팀 구성 및 역할</h3>
            <ul>
                <li><strong>팀 리더</strong>로서 프로젝트 총괄</li>
                <li>Android 앱 개발 담당</li>
                <li>Firebase 백엔드 구축</li>
                <li>4명의 팀원과 협업</li>
            </ul>
            
            <div class="modal-links">
                <a href="https://github.com/kimyeonhong00/dorazy.git" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> GitHub Repository
                </a>
            </div>
        `
    },
    forum: {
        title: 'Spring Boot 게시판 시스템',
        description: `
            <h2>프로젝트 개요</h2>
            <p>Spring Boot를 활용한 RESTful API 기반의 CRUD 게시판 웹 애플리케이션입니다.</p>
            
            <h3>주요 기능</h3>
            <ul>
                <li>게시글 CRUD (생성, 읽기, 수정, 삭제)</li>
                <li>댓글 시스템</li>
                <li>페이징 및 검색 기능</li>
                <li>사용자 인증 및 권한 관리</li>
            </ul>
            
            <h3>기술적 특징</h3>
            <ul>
                <li>RESTful API 설계 원칙 준수</li>
                <li>JPA/Hibernate를 활용한 ORM</li>
                <li>Spring Security를 통한 보안 구현</li>
                <li>Docker 컨테이너화로 배포 환경 통일</li>
                <li>JUnit을 활용한 단위 테스트</li>
            </ul>
            
            <h3>학습 포인트</h3>
            <ul>
                <li>Spring Boot 프레임워크의 핵심 개념</li>
                <li>RESTful API 설계 및 구현</li>
                <li>데이터베이스 연동 및 트랜잭션 관리</li>
                <li>컨테이너 기반 배포 프로세스</li>
            </ul>
            
            <div class="modal-links">
                <a href="https://github.com/Lee-Coderrr/forum.git" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> GitHub Repository
                </a>
            </div>
        `
    },
    exam: {
        title: '온라인 시험 관리 시스템',
        description: `
            <h2>프로젝트 개요</h2>
            <p>Django 프레임워크를 기반으로 구축한 온라인 시험 출제 및 채점 시스템입니다.</p>
            
            <h3>주요 기능</h3>
            <ul>
                <li>시험 문제 출제 및 관리</li>
                <li>실시간 시험 진행 및 시간 제한</li>
                <li>자동 채점 시스템</li>
                <li>성적 통계 및 분석</li>
                <li>문제 은행 관리</li>
            </ul>
            
            <h3>기술적 구현</h3>
            <ul>
                <li>Django ORM을 활용한 데이터베이스 설계</li>
                <li>Redis를 활용한 세션 관리 및 캐싱</li>
                <li>Celery를 통한 비동기 작업 처리 (채점, 이메일 발송)</li>
                <li>WebSocket을 활용한 실시간 시험 상태 업데이트</li>
                <li>PostgreSQL 데이터베이스 활용</li>
            </ul>
            
            <h3>성능 최적화</h3>
            <ul>
                <li>Redis 캐싱으로 조회 성능 개선</li>
                <li>Celery Worker로 무거운 작업 분산 처리</li>
                <li>데이터베이스 인덱싱 최적화</li>
            </ul>
            
            <div class="modal-links">
                <a href="https://github.com/Lee-Coderrr/OnlineExam.git" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> GitHub Repository
                </a>
            </div>
        `
    }
};

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (project) {
        modalContent.innerHTML = `
            <h2>${project.title}</h2>
            ${project.description}
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // 실제로는 여기서 이메일 전송 API 호출
    // 현재는 mailto 링크로 대체
    const mailtoLink = `mailto:dongju101@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.location.href = mailtoLink;
    
    // 폼 리셋
    contactForm.reset();
});

// ===== Type Writer Effect (Optional) =====
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

// Initialize TypeWriter if element exists
const typeElement = document.querySelector('.type-writer');
if (typeElement) {
    const words = ['Cloud Engineer', 'DevOps Engineer', 'Backend Developer'];
    new TypeWriter(typeElement, words);
}

// ===== Page Load Animations =====
window.addEventListener('load', () => {
    // Remove loader if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Animate hero content
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
});

// ===== Lazy Loading Images =====
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

// Observe all images with data-src attribute
const lazyImages = document.querySelectorAll('img[data-src]');
lazyImages.forEach(img => imageObserver.observe(img));

// ===== Console Message =====
console.log('%c👋 안녕하세요! ', 'font-size: 24px; font-weight: bold; color: #4A90E2;');
console.log('%c포트폴리오를 방문해주셔서 감사합니다.', 'font-size: 16px; color: #7B68EE;');
console.log('%c궁금한 점이 있으시면 언제든 연락주세요!', 'font-size: 14px; color: #50E3C2;');
console.log('%cGitHub: https://github.com/Lee-Coderrr', 'font-size: 12px; color: #a0a9c9;');