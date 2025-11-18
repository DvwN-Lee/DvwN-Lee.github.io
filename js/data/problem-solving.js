// ========================================
// Problem Solving Data Module
// ========================================

/**
 * @typedef {Object} ProblemSolvingItem
 * @property {string} id - 고유 ID
 * @property {string} title - 문제 해결 제목
 * @property {string[]} tags - 관련 기술 태그 배열
 * @property {string} situation - 문제 상황 (HTML)
 * @property {string[]} tasks - 과업 목표 목록 (HTML)
 * @property {string[]} actions - 구체적인 해결 과정 목록 (HTML)
 * @property {string[]} results - 결과 및 성과 목록 (HTML)
 */

/**
 * @type {ProblemSolvingItem[]}
 */
export const problemSolvingData = [
    {
        id: 'msa-observability',
        title: 'MSA 환경에서의 자동화된 성능 최적화 및 관측 가능성 확보',
        tags: ['GitOps', 'Kubernetes', 'Istio', 'Prometheus', 'Grafana', 'k6', 'HPA', 'Terraform'],
        situation: `
            단독으로 진행한 'Monitoring-v2' 프로젝트는 기존 시스템(v1)의 수동적이고 비효율적인 운영 방식을 개선해야 하는 과제가 있었습니다.
            인프라 변경은 수작업으로 이루어져 휴먼 에러 가능성이 높았고, 배포 프로세스는 복잡하고 느렸습니다.
            또한, 서비스 간 통신 보안이 확보되지 않았으며, 시스템 장애나 성능 저하 발생 시 원인을 빠르게 파악할 수 있는 관측 가능성이 부재한 상태였습니다.
        `,
        tasks: [
            '<strong>인프라 프로비저닝 자동화</strong>: 수작업을 최소화하고 일관된 인프라 환경을 구축.',
            '<strong>배포 파이프라인 자동화</strong>: Git Push만으로 5분 내에 안전하게 애플리케이션을 배포.',
            '<strong>강력한 서비스 보안 체계 구축</strong>: Zero Trust Network 원칙에 기반한 서비스 간 통신 암호화.',
            '<strong>관측 가능성 시스템 구축 및 성능 최적화</strong>: 실시간 모니터링 및 부하 테스트를 통해 병목 현상을 찾아내고, 시스템 성능을 10% 이상 개선.'
        ],
        actions: [
            '<strong>Terraform 도입으로 인프라 코드화(IaC)</strong>: Solid Cloud(OpenStack) 환경의 모든 인프라(네트워크, 스토리지, VM 등)를 코드로 정의하여, 명령어 하나로 전체 인프라를 일관되게 생성하고 관리할 수 있는 기반을 마련했습니다.',
            '<strong>GitOps 파이프라인 구축</strong>: GitHub Actions로 CI(Docker Image 빌드 및 푸시)를 자동화하고, ArgoCD를 이용해 Git Repository의 Manifest 파일을 기준으로 Kubernetes 클러스터 상태를 동기화하는 CD 파이프라인을 구축했습니다. 이를 통해 <strong>Git Push 후 5분 내 배포</strong>라는 목표를 달성했습니다.',
            '<strong>Istio Service Mesh 도입</strong>: 모든 서비스 Pod에 Envoy Proxy를 Sidecar로 주입하고, mTLS STRICT 모드를 적용하여 클러스터 내 모든 통신을 상호 인증 및 암호화했습니다. 이를 통해 코드 수정 없이 Zero Trust Network를 구현했습니다.',
            '<strong>통합 관측 가능성 시스템 구축</strong>: Prometheus로 실시간 메트릭을 수집하고, Loki로 로그를 중앙화했으며, Grafana를 통해 이를 시각화했습니다. 이를 통해 시스템의 모든 상태를 한눈에 파악할 수 있게 되었습니다.',
            '<strong>k6 부하 테스트 기반 HPA 튜닝</strong>: k6 스크립트로 실제와 유사한 트래픽 시나리오를 작성하여 부하 테스트를 진행했습니다. 테스트 결과 드러난 CPU 병목 현상을 기반으로 Horizontal Pod Autoscaler(HPA)의 임계값을 정밀하게 튜닝하여 불필요한 리소스 낭비를 줄이고 안정적인 응답성을 확보했습니다.'
        ],
        results: [
            '<strong>배포 시간 단축</strong>: 수동으로 수십 분 걸리던 배포가 <strong>Git Push 후 평균 5분</strong>으로 단축되었습니다.',
            '<strong>성능 개선</strong>: HPA 최적화를 통해 부하 테스트 시 <strong>평균 응답 시간이 11.6% 개선</strong>되었습니다.',
            '<strong>시스템 안정성 확보</strong>: <strong>P95 Latency 19.2ms, Error Rate 0%</strong>라는 높은 수준의 안정성을 달성했습니다.',
            '<strong>운영 효율성 및 보안 강화</strong>: 인프라 및 배포 자동화로 운영 부담이 크게 줄었으며, mTLS 적용으로 높은 수준의 서비스 보안을 확보했습니다.'
        ]
    }
];
