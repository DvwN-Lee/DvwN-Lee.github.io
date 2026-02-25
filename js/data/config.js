// ========================================
// Config Data Module
// ========================================

/**
 * @typedef {Object} SocialLink
 * @property {string} name - 소셜 미디어 이름 (e.g., 'GitHub')
 * @property {string} url - URL
 * @property {string} iconClass - Font Awesome 아이콘 클래스 (e.g., 'fab fa-github')
 */

/**
 * @typedef {Object} SiteConfig
 * @property {string} email - 연락 이메일 주소
 * @property {SocialLink[]} socials - 소셜 미디어 링크 배열
 */

/**
 * 사이트 전체 설정값
 * @type {SiteConfig}
 */
export const config = {
    hero: {
        title: '안녕하세요,<br><span class="gradient-text">Platform Engineer</span><br>이동주입니다',
        subtitle: '코드로 표현된 인프라와 선언적 배포를 통해<br>재현 가능하고 신뢰할 수 있는 플랫폼을 구축합니다'
    },
    about: {
        title: '코드로 표현된 인프라와 자동화된 검증으로 재현 가능한 플랫폼을 구축하는 Platform Engineer, 이동주입니다.',
        paragraphs: [
            'Platform Engineering의 핵심은 인프라를 코드로 표현하고, 배포를 선언적으로 정의하며, 검증을 자동화하여 <strong>재현 가능하고 신뢰할 수 있는 플랫폼</strong>을 만드는 것이라 생각합니다. IaC, GitOps, Observability를 통해 복잡한 클라우드 네이티브 환경을 코드 수준에서 관리하고, 언제나 동일하게 재현되는 인프라를 구축하는 경험을 쌓아왔습니다.',
            'Terraform으로 GCP와 Solid Cloud 인프라 전체를 코드화하고, ArgoCD App of Apps 패턴으로 선언적 GitOps를 구현했습니다. Prometheus, Grafana, Loki 기반 Observability 시스템과 Istio Service Mesh를 통해 관측성과 보안을 플랫폼 수준에서 내재화한 경험이 있으며, Terratest를 활용한 인프라 테스트 자동화로 플랫폼의 신뢰성을 검증했습니다.',
            '현재의 경험에 그치지 않고, GCP 환경 End-to-End 자동화와 인프라 테스트 자동화를 통해 <strong>코드로 증명되는 플랫폼 엔지니어링</strong>을 실천하고 있습니다. 선언적 구성과 자동화된 검증으로 언제나 재현 가능한 인프라를 목표로 성장해 나갈 것입니다.'
        ],
        highlights: ['Cloud Native', 'Platform', 'Backend', 'Security']
    },
    email: 'dongju101101@gmail.com',
    socials: [
        {
            name: 'GitHub',
            url: 'https://github.com/DvwN-Lee',
            iconClass: 'fab fa-github',
            handle: 'github.com/DvwN-Lee'
        }
    ],

    /**
     * 애플리케이션 전역 상수값
     * 각 모듈에서 하드코딩된 값들을 중앙화하여 관리
     */
    constants: {
        animations: {
            /** Fade In/Out 지속 시간 (ms) */
            fadeIn: 300,
            fadeOut: 300,
            /** Masonry Layout 안정화 지연 (ms) */
            layoutSettle: 100,
            /** Modal transitionend fallback (ms) */
            modalFallback: 400,
            /** imagesLoaded timeout (ms) */
            imagesLoadedTimeout: 5000,
            /** 순차 애니메이션 간격 (ms) */
            sequentialInterval: 120,
            /** 초기 로드 애니메이션 시작 지연 (ms) */
            initialLoadDelay: 800,
            /** 카운터 애니메이션 지속 시간 (ms) */
            counterDuration: 2000,
            /** TypeWriter 단어 대기 시간 (ms) */
            typeWriterWait: 3000,
            /** 아이콘 전환 지속 시간 (ms) */
            iconTransition: 100,
            /** 복사 피드백 리셋 지연 (ms) */
            feedbackReset: 2000,
            /** 클릭 애니메이션 지속 시간 (ms) */
            clickAnimation: 300,
        },
        navigation: {
            /** Navbar scrolled 상태 임계값 (px) */
            scrolledThreshold: 50,
            /** Scroll to Top 버튼 표시 임계값 (px) */
            scrollTopThreshold: 300,
            /** 섹션 offset 조정값 (px) */
            sectionOffset: 100,
        },
        projects: {
            /** Eager loading 적용 개수 (첫 N개) */
            eagerLoadCount: 6,
            /** 순차 애니메이션 최대 개수 */
            maxSequentialAnimation: 6,
        },
        /** TypeWriter 표시 단어 목록 */
        typeWriterWords: ['Platform Engineer', 'Cloud Native Engineer', 'Backend Developer'],
    },
};
