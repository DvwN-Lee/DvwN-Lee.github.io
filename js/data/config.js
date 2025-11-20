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
        title: '안녕하세요,<br><span class="gradient-text">Cloud/DevOps Engineer</span><br>이동주입니다',
        subtitle: '클라우드 네이티브 아키텍처와 DevOps 엔지니어링을 통해<br>안정적이고 확장 가능한 시스템을 구축합니다'
    },
    about: {
        title: '자동화로 견고한 시스템을 구축하는 DevOps 엔지니어, 이동주입니다.',
        paragraphs: [
            'DevOps의 핵심은 기술의 나열이 아닌, 자동화를 통해 <strong>안정적이고 효율적인 시스템을 구축</strong>하는 것이라 생각합니다. 저는 클라우드 네이티브 환경의 복잡성을 이해하고, 개발부터 운영까지의 전체 파이프라인을 최적화하여 팀의 생산성을 높이는 데 기여하고 싶습니다.',
            'Kubernetes 환경에서 GitHub Actions, ArgoCD를 활용한 CI/CD 파이프라인을 설계하고, Terraform 기반의 IaC(Infrastructure as Code)로 인프라 관리를 자동화한 경험이 있습니다. 또한, Prometheus, Grafana를 이용한 모니터링 시스템과 Istio 기반의 Service Mesh를 구축하여 마이크로서비스 아키텍처의 관측성을 확보하고 장애에 선제적으로 대응하는 역량을 갖추었습니다.',
            '현재의 경험에 만족하지 않고, 더 높은 수준의 시스템 신뢰성을 목표로 SRE(Site Reliability Engineering) 방법론에 깊은 관심을 두고 있습니다. 특히 Kubernetes 내부 동작 원리를 깊이 파고들어 복잡한 분산 시스템의 문제를 해결하고, Service Mesh 기술을 능숙하게 다루는 전문가로 성장해 나갈 것입니다.'
        ],
        highlights: ['Cloud Native', 'DevOps', 'Backend', 'Security']
    },
    email: 'dongju101101@gmail.com',
    socials: [
        {
            name: 'GitHub',
            url: 'https://github.com/DvwN-Lee',
            iconClass: 'fab fa-github',
            handle: 'github.com/DvwN-Lee'
        },
        {
            name: 'Blog',
            url: 'https://velog.io/@dongju101',
            iconClass: 'fas fa-blog',
            handle: 'velog.io/@dongju101'
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/dongju-lee',
            iconClass: 'fab fa-linkedin',
            handle: 'linkedin.com/in/dongju-lee'
        }
    ]
};
