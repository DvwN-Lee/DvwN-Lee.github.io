// ========================================
// 테마 전환 (다크/라이트 모드)
// ========================================

/**
 * Particles.js 설정을 반환하는 함수
 * @param {string} particleColor 파티클 색상
 * @param {string} lineColor 라인 색상
 * @returns {object} Particles.js 설정 객체
 */
function particlesConfig(particleColor, lineColor) {
    return {
        particles: {
            number: {
                value: 80,
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
                distance: 150,
                color: lineColor,
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
    };
}

/**
 * 현재 테마에 맞춰 Particles.js를 로드하거나 업데이트합니다.
 */
function loadParticlesTheme() {
    // 모바일이거나 particles-js 요소가 없으면 실행하지 않음
    if (window.innerWidth <= 768 || !document.getElementById('particles-js')) {
        return;
    }

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const isLightTheme = currentTheme === 'light';

    // 테마별 색상 정의
    const particleColor = isLightTheme ? '#2563eb' : '#4A90E2';
    const lineColor = isLightTheme ? '#2563eb' : '#4A90E2';

    // 기존 particlesJS 인스턴스가 있다면 제거
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }

    // 새로운 설정으로 particlesJS 초기화
    particlesJS('particles-js', particlesConfig(particleColor, lineColor));
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

// 페이지 로드 전에 테마 적용 (깜빡임 방지)
loadTheme();

// 테마 토글 버튼 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // 페이지 로드 시 현재 테마에 맞는 파티클 로드
    loadParticlesTheme();
});

// ===== Initialize AOS (Animate On Scroll) =====
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ===== DOM Elements =====
const navbar = document.querySelector('.navbar');
const scrollProgress = document.querySelector('.scroll-progress');
const scrollToTopBtn = document.getElementById('scrollToTop');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Navbar scroll effect
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
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
        if (scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }

    // Active navigation link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Throttle function for better performance
let isScrolling = false;
window.addEventListener('scroll', function() {
    if (!isScrolling) {
        window.requestAnimationFrame(function() {
            handleScroll();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// ===== Mobile Menu Toggle =====
navToggle.addEventListener('click', function() {
    const isActive = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');

    // 접근성: aria-expanded 업데이트
    navToggle.setAttribute('aria-expanded', isActive);
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
            navToggle.classList.remove('active');
        }
    });
});

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
/**
 * 프로젝트 필터링 이벤트 리스너 초기화
 * renderProjects() 호출 후에 실행되어야 함
 */
function initializeProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // 동적으로 생성된 카드들을 필터링
            const projectCards = document.querySelectorAll('.project-card');
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
}

// ===== Project Modal =====
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close');

/**
 * 프로젝트 데이터 스키마
 * @typedef {Object} Project
 * @property {string} id - 프로젝트 고유 ID (모달 연결용)
 * @property {string} category - 카테고리 ('cloud', 'backend', 'fullstack')
 * @property {boolean} featured - Featured 프로젝트 여부
 * @property {string} badge - 배지 텍스트 ('Featured', '🥉 경소톤 동상' 등)
 * @property {string} title - 프로젝트 제목
 * @property {string} summary - 짧은 설명 (카드용)
 * @property {string} imageUrl - 대표 이미지 URL
 * @property {string} imageAlt - 이미지 대체 텍스트
 * @property {string[]} tech - 기술 스택 배열
 * @property {string[]} highlights - 주요 성과 배열
 * @property {string} githubUrl - GitHub 저장소 URL
 * @property {string} modalContent - 모달 상세 내용 (HTML)
 * @property {number} [aosDelay] - AOS 애니메이션 딜레이 (ms, 옵션)
 */

/**
 * 전체 프로젝트 데이터
 * @type {Project[]}
 */
// ========================================
// 스킬 데이터 및 렌더링
// ========================================

/**
 * 스킬 데이터 스키마
 * @typedef {Object} Skill
 * @property {string} name - 스킬 이름
 * @property {string} iconUrl - 스킬 아이콘 URL
 * @property {number} level - 숙련도 (0-100)
 * @property {string} [iconStyle] - 추가 인라인 스타일 (옵션)
 */

/**
 * 스킬 카테고리 데이터 스키마
 * @typedef {Object} SkillCategory
 * @property {string} icon - Font Awesome 아이콘 클래스
 * @property {string} title - 카테고리 제목
 * @property {Skill[]} skills - 스킬 목록
 */

/**
 * 전체 스킬 데이터
 * @type {SkillCategory[]}
 */
const skillsData = [
  {
    icon: 'fas fa-ship',
    title: 'Container & Orchestration',
    skills: [
      { name: 'Kubernetes', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', level: 90 },
      { name: 'Docker', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', level: 90 },
      { name: 'Helm', iconUrl: 'https://www.vectorlogo.zone/logos/helmsh/helmsh-icon.svg', level: 85, iconStyle: 'filter: invert(0.2);' },
      { name: 'Kustomize', iconUrl: 'images/kustomize.png', level: 80 },
      { name: 'Skaffold', iconUrl: 'images/skaffold.svg', level: 75 }
    ]
  },
  {
    icon: 'fas fa-code',
    title: 'IaC & GitOps',
    skills: [
      { name: 'Terraform', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg', level: 85 },
      { name: 'ArgoCD', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/argocd/argocd-original.svg', level: 85 },
      { name: 'GitHub Actions', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', level: 90 }
    ]
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Service Mesh & Security',
    skills: [
      { name: 'Istio', iconUrl: 'https://www.vectorlogo.zone/logos/istioio/istioio-icon.svg', level: 75 },
      { name: 'Kiali', iconUrl: 'images/kiali.png', level: 70 },
      { name: 'Trivy', iconUrl: 'https://raw.githubusercontent.com/aquasecurity/trivy/main/docs/imgs/logo.png', level: 80 }
    ]
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Monitoring & Observability',
    skills: [
      { name: 'Prometheus', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg', level: 85 },
      { name: 'Grafana', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg', level: 85 },
      { name: 'Loki', iconUrl: 'https://raw.githubusercontent.com/grafana/loki/main/docs/sources/logo.png', level: 80 },
      { name: 'k6', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/K6-logo.svg', level: 75 }
    ]
  },
  {
    icon: 'fas fa-server',
    title: 'Backend Development',
    skills: [
      { name: 'Go', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg', level: 85 },
      { name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 90 },
      { name: 'FastAPI', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', level: 85 },
      { name: 'Django', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', level: 80 },
      { name: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', level: 85 },
      { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', level: 80 }
    ]
  },
  {
    icon: 'fas fa-database',
    title: 'Database & Storage',
    skills: [
      { name: 'PostgreSQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', level: 85 },
      { name: 'Redis', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', level: 80 },
      { name: 'MySQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', level: 75 },
      { name: 'SQLite', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg', level: 75 }
    ]
  },
  {
    icon: 'fas fa-tools',
    title: 'Tools & Platform',
    skills: [
      { name: 'Git', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', level: 85 },
      { name: 'Linux', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', level: 80 }
    ]
  }
];

/**
 * 스킬 섹션을 동적으로 렌더링하는 함수
 */
function renderSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) {
        console.error('skills-grid container not found');
        return;
    }

    const skillCategoriesHTML = skillsData.map((category, index) => {
        // AOS delay 계산 (100ms 간격)
        const aosDelay = index * 100;

        // 스킬 아이템 HTML 생성
        const skillItemsHTML = category.skills.map(skill => {
            const styleAttr = skill.iconStyle ? `style="${skill.iconStyle}"` : '';
            return `
                <div class="skill-item" data-level="${skill.level}">
                    <img src="${skill.iconUrl}" alt="${skill.name}" loading="lazy" decoding="async" ${styleAttr}>
                    <span>${skill.name}</span>
                    <div class="skill-level"></div>
                </div>
            `;
        }).join('');

        return `
            <div class="skill-category" data-aos="fade-up" data-aos-delay="${aosDelay}">
                <h3><i class="${category.icon}"></i> ${category.title}</h3>
                <div class="skill-items">
                    ${skillItemsHTML}
                </div>
            </div>
        `;
    }).join('');

    skillsGrid.innerHTML = skillCategoriesHTML;

    // 스킬 레벨 애니메이션 재적용
    const skillItems = document.querySelectorAll('.skill-item[data-level]');
    skillItems.forEach(item => {
        const level = item.getAttribute('data-level');
        if (level) {
            item.style.setProperty('--skill-level', level + '%');
        }
    });
}

// ========================================
// 경력/타임라인 데이터 및 렌더링
// ========================================

/**
 * 경력/타임라인 아이템 데이터 스키마
 * @typedef {Object} Experience
 * @property {string} date - 날짜 또는 기간
 * @property {string} title - 제목
 * @property {string} subtitle - 부제목
 * @property {string[]} achievements - 성과 목록
 */

/**
 * 전체 경력 데이터
 * @type {Experience[]}
 */
const experiencesData = [
  {
    date: '2025.11',
    title: 'Cloud-Native 마이크로서비스 플랫폼 v2.0',
    subtitle: '5주 단독 개발 프로젝트 - Solid Cloud 환경 (v1.0 고도화)',
    achievements: [
      'Terraform으로 Solid Cloud 인프라 코드 기반 관리, Kustomize로 환경별 설정 분리',
      'GitHub Actions + Argo CD 기반 GitOps 파이프라인 (Git Push 후 5분 내 자동 배포)',
      'Istio Service Mesh 도입 및 mTLS STRICT 모드 적용 (Zero Trust Network)',
      'Prometheus/Grafana/Loki 관측성 시스템 구축 (P95 19.2ms, Error Rate 0%)',
      'k6 부하 테스트 기반 Kubernetes HPA 최적화 (응답 시간 11.6% 개선)'
    ]
  },
  {
    date: '2025.08',
    title: 'Cloud-Native 마이크로서비스 모니터링 플랫폼',
    subtitle: 'Go, FastAPI, K8s 기반 MSA 프로젝트',
    achievements: [
      'Go 고루틴 기반 커스텀 로드밸런서 및 Stats Aggregator 개발 (장애 전파 차단)',
      'FastAPI로 Auth/User/Blog 마이크로서비스 구현 (Redis Cache-Aside, SQLite 연동)',
      'Kustomize base/overlay 패턴으로 환경별 K8s 매니페스트 관리',
      'Vanilla JS + Chart.js + WebSocket으로 실시간 모니터링 대시보드 UI 구현',
      '프록시/집계 패턴으로 각 서비스 통계를 병렬 수집하여 관측 가능성 확보'
    ]
  },
  {
    date: '2023.06',
    title: '온라인 시험 관리 시스템 개발',
    subtitle: 'Django 기반 풀스택 웹 애플리케이션 프로젝트',
    achievements: [
      'Django 프레임워크를 활용한 풀스택 웹 애플리케이션 개발 및 MySQL 데이터베이스 연동',
      '관리자, 교사, 학생 3가지 역할에 따른 역할 기반 접근 제어(RBAC) 시스템 구현',
      '사용자, 문제, 시험지, 시험 관리 등 4가지 핵심 모듈로 구성된 도메인 로직 처리',
      'Django Admin 커스터마이징을 통한 시스템 운영 및 데이터 관리 효율화'
    ]
  },
  {
    date: '2023.05',
    title: 'SimpleChat 실시간 채팅 앱 개발',
    subtitle: 'Spring Boot, WebSocket 기반 개인 프로젝트',
    achievements: [
      'Spring Boot에서 WebSocket 프로토콜을 활용한 실시간 양방향 메시징 시스템 구축',
      'Spring Data JPA를 통해 채팅 메시지를 MySQL 데이터베이스에 저장 및 관리',
      'Thymeleaf 템플릿 엔진과 JavaScript 연동으로 동적인 채팅 UI 구현',
      '사용자 입력 유효성 검사 및 서버 측 예외 처리로 시스템 안정성 확보'
    ]
  },
  {
    date: '2022.08',
    title: '경소톤 해커톤 동상 수상',
    subtitle: 'SW융합대학 X 경영경제대학 연합 해커톤',
    achievements: [
      'Firebase(BaaS)를 활용한 서버리스 아키텍처 경험 및 실시간 데이터 처리 능력',
      'Android/Kotlin 개발 경험을 통해 모바일 애플리케이션의 빌드 및 배포 파이프라인에 대한 이해 보유',
      '해커톤 환경에서의 빠른 프로토타이핑 및 팀 협업 역량 검증',
      'Figma 기반 UI/UX 설계를 통한 개발-디자인 협업 프로세스 경험'
    ]
  },
  {
    date: '2020.03 ~ 현재',
    title: '단국대학교 컴퓨터공학과',
    subtitle: '학부 재학 중',
    achievements: [
      '클라우드 컴퓨팅 집중 학습',
      '컴퓨터공학과 2022년도 부회장',
      '다수 프로젝트 리더 경험',
      '아키텍처 설계 경험',
      '체계적 문서화 진행'
    ]
  }
];

/**
 * 경력/타임라인 섹션을 동적으로 렌더링하는 함수
 */
function renderExperiences() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) {
        console.error('timeline container not found');
        return;
    }

    const timelineHTML = experiencesData.map((experience, index) => {
        // 짝수/홀수에 따라 fade 방향 결정
        const aosDirection = index % 2 === 0 ? 'fade-right' : 'fade-left';

        // 성과 목록 HTML 생성
        const achievementsHTML = experience.achievements.map(achievement =>
            `<li>${achievement}</li>`
        ).join('');

        return `
            <div class="timeline-item" data-aos="${aosDirection}">
                <div class="timeline-date">${experience.date}</div>
                <div class="timeline-content">
                    <h3>${experience.title}</h3>
                    <p>${experience.subtitle}</p>
                    <ul>
                        ${achievementsHTML}
                    </ul>
                </div>
            </div>
        `;
    }).join('');

    timeline.innerHTML = timelineHTML;
}

// ========================================
// 프로젝트 데이터 및 렌더링
// ========================================

/**
 * 프로젝트 카드를 동적으로 렌더링하는 함수
 */
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) {
        console.error('projects-grid container not found');
        return;
    }

    const projectCardsHTML = projectsData.map(project => {
        // AOS delay 속성 처리
        const aosDelayAttr = project.aosDelay ? `data-aos-delay="${project.aosDelay}"` : '';

        // Featured 클래스 처리
        const featuredClass = project.featured ? 'featured' : '';

        // 배지 HTML 처리 (배지가 있을 때만 표시)
        const badgeHTML = project.badge ? `<span class="project-badge">${project.badge}</span>` : '';

        // 기술 스택 HTML 생성
        const techStackHTML = project.tech.map(tech => `<span>${tech}</span>`).join('');

        // 하이라이트 HTML 생성
        const highlightsHTML = project.highlights.map(highlight => `<li>${highlight}</li>`).join('');

        return `
            <div class="project-card ${featuredClass}" data-category="${project.category}" data-aos="fade-up" ${aosDelayAttr}>
                <div class="project-image">
                    <img src="${project.imageUrl}" alt="${project.imageAlt}" loading="lazy" decoding="async">
                    <div class="project-overlay">
                        <div class="project-links">
                            <a href="${project.githubUrl}" target="_blank" class="project-link">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="#" class="project-link" onclick="openProjectModal('${project.id}'); return false;">
                                <i class="fas fa-expand"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="project-content">
                    ${badgeHTML}
                    <h3>${project.title}</h3>
                    <p>${project.summary}</p>
                    <div class="project-tech">
                        ${techStackHTML}
                    </div>
                    <ul class="project-highlights">
                        ${highlightsHTML}
                    </ul>
                </div>
            </div>
        `;
    }).join('');

    projectsGrid.innerHTML = projectCardsHTML;
}

const projectsData = [
    {
        id: 'cloudnative_v2',
        category: 'cloud',
        featured: true,
        badge: 'Featured',
        title: 'Cloud-Native 마이크로서비스 플랫폼 v2.0',
        summary: 'Solid Cloud(단국대학교) 환경에서 Terraform을 활용한 인프라 자동화 및 GitOps 기반 완전 자동화된 마이크로서비스 플랫폼 구축',
        imageUrl: 'https://raw.githubusercontent.com/DvwN-Lee/Monitoring-v2/main/docs/04-operations/screenshots/grafana-golden-signals.png',
        imageAlt: 'Kubernetes 기반 Cloud-Native 마이크로서비스 플랫폼 v2.0 아키텍처',
        tech: ['Kubernetes', 'Terraform', 'Istio', 'Prometheus', 'ArgoCD', 'GitHub Actions'],
        highlights: [
            'Terraform으로 Solid Cloud 인프라를 코드 기반 관리, Kustomize로 환경별(local/cloud) 설정 분리하여 재현 가능한 개발/운영 환경 구축',
            'GitHub Actions + Argo CD 기반 GitOps 파이프라인 구축으로 Git Push 후 5분 내 Kubernetes 클러스터 자동 배포 달성',
            'Istio Service Mesh 도입 및 mTLS STRICT 모드 적용으로 Zero Trust Network 기반 보안 환경 구축',
            'Prometheus/Grafana 기반 관측성 시스템 구축, Golden Signals 대시보드로 정량적 분석 (P95 Latency 19.2ms, Error Rate 0%)',
            'k6 부하 테스트 기반 성능 분석 및 Kubernetes HPA 최적화로 응답 시간 11.6% 개선, 안정적인 트래픽 처리 역량 확보'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/Monitoring-v2',
        modalContent: `
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
    {
        id: 'dorazy',
        category: 'fullstack',
        featured: false,
        badge: '🥉 경소톤 동상',
        title: 'Dorazy - 도서관 예약 시스템',
        summary: '단국대학교 도산라운지 좌석 예약 및 관리 앱',
        imageUrl: 'https://user-images.githubusercontent.com/87077859/215061094-6b72ec52-0713-4ebf-81a5-744469bb7fd1.jpg',
        imageAlt: 'Dorazy 도서관 예약 시스템 모바일 앱 스크린샷',
        tech: ['Android', 'Kotlin', 'Firebase', 'Figma'],
        highlights: [
            'Firebase(BaaS) 활용 서버리스 아키텍처 및 실시간 데이터 처리 구현',
            'Android/Kotlin 개발 경험으로 모바일 애플리케이션 빌드 및 배포 파이프라인 이해',
            '해커톤 환경에서 빠른 프로토타이핑 및 팀 협업 역량 검증',
            'Figma 기반 UI/UX 설계를 통한 개발-디자인 협업 프로세스 경험'
        ],
        githubUrl: 'https://github.com/kimyeonhong00/dorazy.git',
        modalContent: `
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
    {
        id: 'cloudnative_v1',
        category: 'cloud',
        featured: false,
        badge: '',
        title: '실시간 마이크로서비스 모니터링 플랫폼',
        summary: 'Go, FastAPI, K8s 기반 실시간 모니터링 대시보드',
        imageUrl: 'https://github.com/user-attachments/assets/9a7b890b-1d7c-4c96-826f-e019df475dfb',
        imageAlt: 'Go와 FastAPI 기반 실시간 마이크로서비스 모니터링 대시보드',
        tech: ['Go (Golang)', 'Python (FastAPI)', 'Kubernetes', 'Kustomize', 'JavaScript', 'Redis'],
        highlights: [
            'Go 언어와 고루틴을 활용한 커스텀 로드밸런서 및 Stats Aggregator 개발 (타임아웃 2초로 장애 전파 차단)',
            'Kustomize base/overlay 패턴으로 개발/운영 환경별 Kubernetes 매니페스트 선언적 관리',
            'Go + Python FastAPI 마이크로서비스 아키텍처 설계 (100 RPS 성능 목표 검증)',
            'Vanilla JS + WebSocket 통신 기반 실시간 모니터링 대시보드 구축 (RPS, 응답시간, 서비스 상태 시각화)',
            '각 서비스의 통계를 병렬 수집하는 프록시/집계 패턴으로 관측 가능성 확보'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/Monitoring',
        modalContent: `
            <h2>프로젝트 개요</h2>
            <p>Go와 Python FastAPI를 사용한 마이크로서비스 아키텍처 기반 실시간 모니터링 플랫폼입니다.
            커스텀 로드밸런서와 통계 집계 시스템을 구축하여 100 RPS 이상의 트래픽을 안정적으로 처리합니다.</p>

            <h3>핵심 성과</h3>
            <ul>
                <li><strong>고성능 로드밸런서</strong>: Go 고루틴 기반 비동기 처리로 100 RPS 이상 안정적 처리</li>
                <li><strong>장애 격리</strong>: 타임아웃 2초 설정으로 서비스 간 장애 전파 차단</li>
                <li><strong>실시간 대시보드</strong>: WebSocket을 통한 실시간 RPS, 응답시간, 서비스 상태 시각화</li>
                <li><strong>환경별 배포</strong>: Kustomize로 개발/운영 환경 매니페스트 분리 관리</li>
            </ul>

            <h3>기술 스택</h3>
            <div class="modal-tech-stack">
                <span>Go (Golang)</span>
                <span>Python FastAPI</span>
                <span>Kubernetes</span>
                <span>Kustomize</span>
                <span>JavaScript</span>
                <span>WebSocket</span>
                <span>Redis</span>
            </div>

            <h3>아키텍처</h3>
            <ul>
                <li>Go 기반 커스텀 로드밸런서 및 Stats Aggregator</li>
                <li>Python FastAPI 마이크로서비스 (여러 백엔드 서비스)</li>
                <li>Vanilla JavaScript + WebSocket 실시간 대시보드</li>
                <li>Redis 기반 통계 데이터 캐싱</li>
                <li>Kubernetes 오케스트레이션 및 Kustomize 기반 배포 관리</li>
            </ul>

            <div class="modal-links">
                <a href="https://github.com/DvwN-Lee/Monitoring" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> GitHub Repository
                </a>
            </div>
        `
    },
    {
        id: 'forum',
        category: 'backend',
        featured: false,
        badge: '',
        title: 'Spring Boot 게시판 시스템',
        summary: 'RESTful API 기반 CRUD 게시판 웹 애플리케이션',
        imageUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKICAgIHN1YmdyYXBoICJDbGllbnQgVGllciIKICAgICAgICBBW+ybuSDruIzrnbzsmrDsoIBdCiAgICBlbmQKCiAgICBzdWJncmFwaCAiQXBwbGljYXRpb24gVGllciAoU3ByaW5nIEJvb3QpIgogICAgICAgIEJbPGI+Q29udHJvbGxlciBMYXllcjwvYj48YnI+PGk+UkVTVCBBUEkgRW5kcG9pbnRzPC9pPjxicj7smpTssq0v7J2R64u1IOyymOumrF0KICAgICAgICBDWzxiPlNlcnZpY2UgTGF5ZXI8L2I+PGJyPjxpPkJ1c2luZXNzIExvZ2ljPC9pPjxicj7tirjrnpzsnq3shZgg7LKY66asXQogICAgICAgIERbPGI+UmVwb3NpdG9yeSBMYXllcjwvYj48YnI+PGk+RGF0YSBBY2Nlc3M8L2k+PGJyPkRCIOyXsOuPmSDsnbjthLDtjpjsnbTsiqRdCiAgICBlbmQKCiAgICBzdWJncmFwaCAiUGVyc2lzdGVuY2UgVGllciIKICAgICAgICBFWzxiPkpQQSAvIEhpYmVybmF0ZTwvYj48YnI+PGk+T1JNIEZyYW1ld29yazwvaT5dCiAgICBlbmQKCiAgICBzdWJncmFwaCAiRGF0YSBUaWVyIgogICAgICAgIEZbPGI+UG9zdGdyZVNRTDwvYj48YnI+KOyatOyYgSBEQildCiAgICAgICAgR1s8Yj5IMjwvYj48YnI+KOqwnOuwnC/thYzsiqTtirggREIpXQogICAgZW5kCgogICAgQSAtLSAiMS4gSFRUUCBSZXF1ZXN0IChHRVQsIFBPU1QsIGV0Yy4pIiAtLT4gQgogICAgQiAtLSAiMi4gRFRP66W8IO2Kte2VnCDrqZTshozrk5wg7Zi47LacIiAtLT4gQwogICAgQyAtLSAiMy4gRW50aXR566W8IO2Kte2VnCDrqZTshozrk5wg7Zi47LacIiAtLT4gRAogICAgRCAtLSAiNC4gSlBBIOuplOyGjOuTnCDtmLjstpwgKGUuZy4sIHNhdmUsIGZpbmRCeUlkKSIgLS0+IEUKICAgIEUgLS0gIjUuIFNRTCDsv7zrpqwg7IOd7ISxIOuwjyDsi6TtlokiIC0tPiBGCiAgICBFIC0tICI1LiBTUUwg7L+866asIOyDneyEsSDrsI8g7Iuk7ZaJIiAtLT4gRwogICAgRyAtLSAiNi4g642w7J207YSwIOuwmO2ZmCIgLS0+IEUKICAgIEYgLS0gIjYuIOuNsOydtO2EsCDrsJjtmZgiIC0tPiBFCiAgICBFIC0tICI3LiBFbnRpdHkg6rCd7LK0IOunpO2VkSIgLS0+IEQKICAgIEQgLS0gIjguIEVudGl0eSDqsJ3ssrQg67CY7ZmYIiAtLT4gQwogICAgQyAtLSAiOS4gRFRP66GcIOuzgO2ZmCDtm4Qg67CY7ZmYIiAtLT4gQgogICAgQiAtLSAiMTAuIEhUTUwgKE11c3RhY2hlKSDrmJDripQgSlNPTiDsnZHri7UiIC0tPiBBCg==',
        imageAlt: 'Spring Boot와 JPA 기반 RESTful 게시판 시스템 아키텍처',
        tech: ['Spring Boot', 'JPA', 'Mustache', 'PostgreSQL', 'H2'],
        highlights: [
            'Spring Boot 프레임워크 기반 독립 실행형 웹 애플리케이션 아키텍처 설계 및 구축',
            'Spring Data JPA를 활용한 PostgreSQL/H2 데이터베이스 연동 및 데이터 영속성 관리',
            'RESTful API 원칙에 따른 게시글 및 댓글 CRUD 기능 구현',
            'Mustache 템플릿 엔진을 사용한 서버 사이드 렌더링(SSR) 방식의 UI 개발'
        ],
        githubUrl: 'https://github.com/Lee-Coderrr/forum.git',
        modalContent: `
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
    {
        id: 'exam',
        category: 'backend',
        featured: false,
        badge: '',
        title: '온라인 시험 관리 시스템',
        summary: 'Django 기반 온라인 시험 출제 및 채점 시스템',
        imageUrl: 'https://github.com/DvwN-Lee/OnlineExam/raw/main/images/Main.png',
        imageAlt: 'Django 기반 온라인 시험 출제 및 채점 관리 시스템',
        tech: ['Django', 'MySQL', 'jQuery', 'Bootstrap'],
        highlights: [
            'Django 프레임워크를 활용한 풀스택 웹 애플리케이션 개발 및 MySQL 데이터베이스 연동',
            '관리자, 교사, 학생 3가지 역할에 따른 역할 기반 접근 제어(RBAC) 시스템 설계 및 구현',
            '사용자, 문제, 시험지, 시험 관리 등 4가지 핵심 모듈로 구성된 복잡한 도메인 로직 처리',
            'Django Admin 커스터마이징으로 시스템 운영 및 데이터 관리 효율성 증대'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/onlineexam',
        modalContent: `
            <h2>프로젝트 개요</h2>
            <p>Django 프레임워크를 기반으로 구축한 온라인 시험 출제 및 채점 시스템입니다.</p>

            <h3>주요 기능</h3>
            <ul>
                <li>시험 문제 출제 및 관리 (문제 은행)</li>
                <li>역할 기반 사용자 관리 (학생, 교사, 관리자)</li>
                <li>실시간 시험 진행 및 자동 채점</li>
                <li>성적 조회 및 통계</li>
            </ul>

            <h3>기술적 구현</h3>
            <ul>
                <li>Django MTV 패턴 이해 및 적용</li>
                <li>Django ORM을 활용한 데이터베이스 설계</li>
                <li>Django Admin을 활용한 백엔드 관리 시스템 구축</li>
                <li>jQuery, Bootstrap을 활용한 클라이언트 UI</li>
                <li>MySQL 데이터베이스 활용</li>
            </ul>

            <h3>학습 포인트</h3>
            <ul>
                <li>Django MTV 패턴 이해 및 적용</li>
                <li>관계형 데이터베이스(MySQL) 모델링</li>
                <li>기본적인 웹 프론트엔드(jQuery)와 백엔드(Django) 연동</li>
            </ul>

            <div class="modal-links">
                <a href="https://github.com/Lee-Coderrr/OnlineExam.git" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> GitHub Repository
                </a>
            </div>
        `
    },
    {
        id: 'demochat',
        category: 'backend',
        featured: false,
        badge: '',
        title: 'SimpleChat - 실시간 채팅 앱',
        summary: 'Spring Boot와 WebSocket 기반 실시간 채팅 프로젝트',
        imageUrl: 'https://github.com/DvwN-Lee/DemoChat/raw/main/images/chat_2.png',
        imageAlt: 'Spring Boot와 WebSocket 기반 실시간 채팅 애플리케이션',
        tech: ['Spring Boot', 'WebSocket', 'JPA', 'Thymeleaf', 'MySQL'],
        highlights: [
            'Spring Boot 환경에서 WebSocket 프로토콜을 활용한 실시간 양방향 메시징 시스템 구축',
            'Spring Data JPA를 통해 실시간 채팅 메시지를 MySQL 데이터베이스에 안정적으로 저장 및 관리',
            'Thymeleaf 템플릿 엔진과 JavaScript를 연동하여 동적인 실시간 채팅 UI 구현',
            '사용자 이름 및 메시지 내용 유효성 검사 등 서버 측 예외 처리로 시스템 안정성 확보'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/demochat',
        modalContent: `
            <h2>프로젝트 개요</h2>
            <p>Spring Boot, Thymeleaf, WebSocket(STOMP)을 사용하여 구축한 간단한 실시간 채팅 애플리케이션입니다.</p>

            <h3>주요 기능</h3>
            <ul>
                <li>WebSocket/STOMP 기반 실시간 메시지 전송 및 수신</li>
                <li>사용자 이름 입력으로 채팅방 접속</li>
                <li>Spring Data JPA를 통한 메시지 및 사용자 정보 데이터베이스 영속화</li>
                <li>Thymeleaf와 JavaScript(SockJS, STOMP.js)를 활용한 동적 채팅 UI 구현</li>
                <li>채팅 메시지 전송 시간 표시</li>
            </ul>

            <h3>기술 스택</h3>
            <div class="modal-tech-stack">
                <span>Spring Boot</span>
                <span>Spring WebSocket</span>
                <span>JPA</span>
                <span>Thymeleaf</span>
                <span>JavaScript</span>
                <span>STOMP</span>
                <span>MySQL</span>
                <span>Gradle</span>
            </div>

            <h3>학습 포인트</h3>
            <ul>
                <li>Spring Boot 환경에서 WebSocket 연동 및 STOMP 메시지 브로커 설정</li>
                <li>JPA를 활용한 엔티티(User, Message) 설계 및 리포지토리 구현</li>
                <li>Thymeleaf를 이용한 서버 사이드 렌더링과 JavaScript(SockJS, STOMP.js)를 통한 클라이언트-서버 비동기 통신</li>
            </ul>

            <div class="modal-links">
                <a href="https://github.com/Lee-Coderrr/DemoChat.git" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> GitHub Repository
                </a>
            </div>
        `
    }
];

function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (project) {
        modalContent.innerHTML = `
            <h2>${project.title}</h2>
            ${project.modalContent}
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

// ===== Contact Form (아래에서 통합 처리) =====

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

    // Render skills dynamically
    renderSkills();

    // Render projects dynamically
    renderProjects();

    // Render experiences/timeline dynamically
    renderExperiences();

    // Initialize project filter after rendering
    initializeProjectFilter();

    // Refresh AOS to recognize dynamically added elements
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
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

// ===== Copy Email Function =====
function copyEmail(email, event) {
    // 클릭 애니메이션 추가
    const emailLink = event.target.closest('.email-copy');
    if (emailLink) {
        emailLink.classList.add('copying');
        setTimeout(() => {
            emailLink.classList.remove('copying');
        }, 300);
    }

    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
            showCopyFeedback(event);
        }).catch(err => {
            console.error('클립보드 API 복사 실패:', err);
            fallbackCopyEmail(email, event);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyEmail(email, event);
    }
}

function fallbackCopyEmail(email, evt) {
    const tempInput = document.createElement('textarea');
    tempInput.value = email;
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999);

    try {
        // Use modern Clipboard API if available, otherwise show a message
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(() => {
                showCopyFeedback(evt);
            });
        } else {
            // For browsers that don't support Clipboard API, show manual copy instruction
            alert('이메일 주소를 복사하려면 Ctrl+C (또는 Cmd+C)를 눌러주세요.');
        }
    } catch (err) {
        console.error('복사 실패:', err);
        alert('복사에 실패했습니다. 이메일 주소를 수동으로 복사해주세요: ' + email);
    }

    document.body.removeChild(tempInput);
}

function showCopyFeedback(evt) {
    if (!evt) return;

    const emailLink = evt.target.closest('.email-copy');
    if (!emailLink) return;

    // 링크에 복사 완료 클래스 추가
    emailLink.classList.add('copied');
    
    // 툴팁 생성 및 표시
    const tooltip = document.createElement('div');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = '이메일 주소가 클립보드에 복사되었습니다!';
    document.body.appendChild(tooltip);

    // 2초 후 툴팁 제거 애니메이션
    setTimeout(() => {
        tooltip.classList.add('fade-out');
        setTimeout(() => {
            if (tooltip.parentNode) {
                document.body.removeChild(tooltip);
            }
        }, 300);
    }, 2000);

    // 2.5초 후 링크 원래 상태로 복구
    setTimeout(() => {
        emailLink.classList.remove('copied');
    }, 2500);
}

// ===== Scroll to Top Button Click Handler =====
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Contact Form Handler (제거됨) =====
// Contact Form이 제거되어 해당 코드도 삭제되었습니다.

// ===== Details/Summary Accordion Animation =====
function setupDetailsAccordion() {
    document.querySelectorAll('.problem-item details').forEach(detail => {
        const summary = detail.querySelector('summary');
        const content = detail.querySelector('.problem-details');

        summary.addEventListener('click', (event) => {
            event.preventDefault();

            // 다른 details가 열려있으면 닫기 (아코디언 효과)
            document.querySelectorAll('.problem-item details[open]').forEach(openDetail => {
                if (openDetail !== detail && openDetail.open) {
                    const openContent = openDetail.querySelector('.problem-details');
                    openContent.style.height = '0px';
                    setTimeout(() => {
                        openDetail.removeAttribute('open');
                    }, 400);
                }
            });

            // 현재 details 토글
            if (detail.open) {
                // 닫기 애니메이션
                const currentHeight = content.scrollHeight;
                content.style.height = `${currentHeight}px`;

                requestAnimationFrame(() => {
                    content.style.height = '0px';
                });

                setTimeout(() => {
                    detail.removeAttribute('open');
                }, 400);

            } else {
                // 열기 애니메이션
                detail.setAttribute('open', '');
                const targetHeight = content.scrollHeight;

                content.style.height = '0px';

                requestAnimationFrame(() => {
                    content.style.height = `${targetHeight}px`;
                });

                // 애니메이션 완료 후 height를 auto로 설정 (반응형 대응)
                setTimeout(() => {
                    content.style.height = 'auto';
                }, 400);
            }
        });
    });
}

// 페이지 로드 시 아코디언 설정을 실행합니다.
setupDetailsAccordion();

// ===== Console Message =====
console.log('%c👋 안녕하세요! ', 'font-size: 24px; font-weight: bold; color: #4A90E2;');
console.log('%c포트폴리오를 방문해주셔서 감사합니다.', 'font-size: 16px; color: #7B68EE;');
console.log('%c궁금한 점이 있으시면 언제든 연락주세요!', 'font-size: 14px; color: #50E3C2;');
console.log('%cGitHub: https://github.com/Lee-Coderrr', 'font-size: 12px; color: #a0a9c9;');