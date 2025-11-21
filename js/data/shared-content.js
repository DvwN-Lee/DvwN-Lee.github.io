// ========================================
// Shared Content Module
// ========================================

/**
 * 프로젝트와 Problem Solving 섹션에서 공유되는 콘텐츠
 * DRY(Don't Repeat Yourself) 원칙에 따라 중복 데이터를 단일 소스로 관리
 */

/**
 * Cloud-Native 마이크로서비스 플랫폼 v2.0 공유 콘텐츠
 */
export const cloudNativeV2Content = {
    situation: `단독으로 진행한 'Monitoring-v2' 프로젝트는 기존 시스템(v1)의 수동적이고 비효율적인 운영 방식을 개선해야 하는 과제가 있었습니다. 인프라 변경은 수작업으로 이루어져 휴먼 에러 가능성이 높았고, 배포 프로세스는 복잡하고 느렸습니다. 또한, 서비스 간 통신 보안이 확보되지 않았으며, 시스템 장애나 성능 저하 발생 시 원인을 빠르게 파악할 수 있는 관측 가능성이 부재한 상태였습니다.`,

    tasks: [
        '<strong>인프라 프로비저닝 자동화</strong>: 수작업을 최소화하고 일관된 인프라 환경을 구축.',
        '<strong>배포 파이프라인 자동화</strong>: Git Push만으로 5분 내에 안전하게 애플리케이션을 배포.',
        '<strong>강력한 서비스 보안 체계 구축</strong>: Zero Trust Network 원칙에 기반한 서비스 간 통신 암호화.',
        '<strong>관측 가능성 시스템 구축 및 성능 최적화</strong>: 실시간 모니터링 및 부하 테스트를 통해 병목 현상을 찾아내고, 시스템 성능을 10% 이상 개선.'
    ],

    actions: [
        '<strong>Terraform 도입으로 인프라 코드화(IaC)</strong>: Solid Cloud(OpenStack) 환경의 모든 인프라(네트워크, 스토리지, VM 등)를 코드로 정의하여, 명령어 하나로 전체 인프라를 일관되게 생성하고 관리하는 기반을 마련했습니다.',
        '<strong>GitOps 자동화 파이프라인 구축</strong>: GitHub Actions로 CI(Docker 빌드, Trivy 보안 스캔, 이미지 푸시)를 자동화하고, Argo CD를 이용해 Git Repository를 기준으로 클러스터 상태를 동기화하는 CD 파이프라인을 구축하여 <strong>5분 내 무중단 배포</strong>를 실현했습니다.',
        '<strong>다층적 보안 체계 적용</strong>: Istio Service Mesh의 <strong>mTLS STRICT 모드</strong>로 서비스 간 통신을 상호 인증 및 암호화하고, Kubernetes <strong>NetworkPolicy</strong>로 파드 간 접근을 제어하여 Zero Trust Network를 구현했습니다. 또한 CI 단계에 <strong>Trivy</strong>를 통합하여 이미지 취약점을 사전에 차단했습니다.',
        '<strong>통합 관측 가능성 시스템 구축</strong>: Prometheus로 실시간 메트릭을 수집하고, Loki로 로그를 중앙화했으며, Grafana를 통해 Golden Signals 대시보드를 구축했습니다. Kiali를 활용해 서비스 메시를 시각적으로 모니터링하여 복잡한 MSA 구조의 트래픽 흐름을 명확히 파악할 수 있게 되었습니다.',
        '<strong>k6 부하 테스트 기반 성능 최적화</strong>: k6 스크립트로 실제와 유사한 트래픽 시나리오 기반의 부하 테스트를 진행했습니다. 테스트 결과 드러난 병목 현상을 기반으로 HPA의 임계값을 정밀하게 튜닝하여 <strong>평균 응답 시간을 11.6% 개선</strong>하고 안정적인 트래픽 처리 용량을 확보했습니다.'
    ],

    results: [
        '<strong>배포 속도 및 안정성 향상</strong>: 수동으로 수십 분 걸리던 배포가 <strong>Git Push 후 평균 5분 내</strong>의 완전 자동화된 프로세스로 개선되었고, 휴먼 에러 가능성을 원천 차단했습니다.',
        '<strong>보안 자동화 및 강화</strong>: mTLS 암호화, NetworkPolicy, 자동화된 Trivy 취약점 스캔을 통해 코드 변경 없이 <strong>높은 수준의 보안 체계</strong>를 구축했습니다.',
        '<strong>정량적 성능 개선</strong>: HPA 최적화를 통해 부하 상황에서 <strong>평균 응답 시간을 11.6% 단축</strong>하고, <strong>P95 Latency 19.2ms, Error Rate 0%</strong>의 높은 시스템 안정성을 달성했습니다.',
        '<strong>운영 효율성 증대</strong>: 인프라 및 배포 자동화, 중앙화된 관측성 시스템을 통해 복잡한 MSA 환경의 운영 부담을 크게 절감하고, 장애 발생 시 원인 분석 시간을 단축했습니다.'
    ],

    // 모달용 구조화된 콘텐츠
    modal: {
        overview: '로컬 환경의 블로그 플랫폼을 단국대학교 Solid Cloud(OpenStack) 환경으로 이전하며, <strong>Terraform 기반 인프라 자동화(IaC)</strong>, <strong>GitOps 배포 파이프라인</strong>, <strong>Istio Service Mesh 기반 보안 강화</strong>, <strong>통합 관측성 시스템</strong>을 구축한 Cloud-Native 프로젝트입니다. 5주간의 개인 프로젝트로 진행하여 모든 핵심 목표를 달성했습니다.',

        keyFeatures: [
            '<strong>Terraform 기반 인프라 자동화</strong>: Solid Cloud 인프라(VM, 네트워크, 스토리지)를 코드로 완벽히 관리',
            '<strong>GitOps 기반 완전 자동화 CI/CD</strong>: GitHub Actions, Argo CD, Kustomize를 연동하여 Git Push 후 5분 내 자동 배포',
            '<strong>컨테이너 보안 자동화</strong>: CI 파이프라인에 <strong>Trivy</strong>를 통합하여 이미지 빌드 시 취약점을 자동 탐지 및 차단',
            '<strong>Zero Trust Network 보안</strong>: Istio mTLS STRICT 모드 및 NetworkPolicy를 적용하여 서비스 간 통신 보안 강화',
            '<strong>통합 관측성(Observability) 시스템</strong>: Prometheus/Grafana/Loki로 Golden Signals 모니터링, 중앙화된 로그 관리',
            '<strong>서비스 메시 시각화</strong>: Kiali 대시보드를 통해 MSA 트래픽 흐름과 서비스 의존성을 시각적으로 분석',
            '<strong>성능 부하 테스트 및 최적화</strong>: k6 부하 테스트 기반 HPA 튜닝으로 응답 시간 11.6% 개선 (P95 Latency 19.2ms 달성)'
        ],

        technicalImplementation: [
            '<strong>Infrastructure as Code</strong>: Terraform, Kustomize',
            '<strong>CI/CD & GitOps</strong>: GitHub Actions, Argo CD',
            '<strong>Container & Orchestration</strong>: Docker, Kubernetes',
            '<strong>Service Mesh & Security</strong>: Istio (mTLS, Kiali), Trivy, NetworkPolicy, RBAC',
            '<strong>Observability Stack</strong>: Prometheus, Grafana, Loki',
            '<strong>Backend</strong>: Go (API Gateway), Python/FastAPI (Services)',
            '<strong>Database & Cache</strong>: PostgreSQL, Redis',
            '<strong>Testing</strong>: k6 (Load Testing)'
        ],

        learningPoints: [
            '<strong>IaC 설계 및 운영</strong>: Terraform으로 재현 가능하고 일관된 클라우드 인프라 환경을 구축하고 운영하는 역량을 확보했습니다.',
            '<strong>GitOps 기반 CI/CD 파इ프라인 완전 자동화</strong>: 개발부터 배포까지의 전체 프로세스를 자동화하며 MSA 환경의 복잡성을 관리하는 경험을 쌓았습니다.',
            '<strong>Service Mesh를 활용한 고급 보안 및 트래픽 관리</strong>: Istio를 통해 코드 수정 없이 mTLS 암호화, 접근 제어 등 높은 수준의 보안을 적용하고, Kiali로 복잡한 서비스 관계를 시각화하며 디버깅 효율을 높였습니다.',
            '<strong>DevSecOps</strong>: CI 과정에 Trivy 취약점 스캔을 통합하여 개발 초기 단계부터 보안을 고려하는 DevSecOps를 실천했습니다.',
            '<strong>데이터 기반 성능 최적화</strong>: k6 부하 테스트로 시스템의 병목을 정량적으로 분석하고, HPA 튜닝을 통해 실제 성능 개선(응답시간 11.6% 단축)을 이끌어냈습니다.'
        ]
    }
};
