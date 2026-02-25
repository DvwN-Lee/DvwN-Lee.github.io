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
/**
 * Cloud-Native 모니터링 플랫폼 v3.0 (GCP) 공유 콘텐츠
 */
export const cloudNativeV3Content = {
    situation: `'Monitoring-v3' 프로젝트는 기존 v2의 Solid Cloud 환경에서 GCP(Google Cloud Platform)로 전환하며, 클라우드 네이티브 인프라 자동화 수준을 한 단계 끌어올리는 과제가 있었습니다. 기존에는 IaC 범위가 일부 인프라에 한정되어 있었고, Secret 관리가 수동적이었으며, GitOps 구조가 단순하여 대규모 확장에 한계가 있었습니다.`,

    tasks: [
        '<strong>GCP 리소스 전체 IaC 자동화</strong>: VPC, Firewall, VM, Secret Manager 등 모든 GCP 리소스를 Terraform으로 코드화.',
        '<strong>대규모 GitOps 구조 설계</strong>: ArgoCD App of Apps 패턴으로 Infrastructure/Application Apps를 계층적으로 관리.',
        '<strong>Secret 관리 자동화</strong>: External Secrets Operator와 GCP Secret Manager를 연동하여 민감 정보의 안전한 주입 및 자동 동기화.',
        '<strong>Zero Trust Network 보안 강화</strong>: Istio mTLS, GCP Firewall, NetworkPolicy를 조합한 다층 보안 아키텍처 구축.'
    ],

    actions: [
        '<strong>Terraform으로 GCP 리소스 전체 코드화</strong>: VPC, Subnet, Firewall Rules, Compute Engine VM, Secret Manager 등 전체 인프라를 Terraform으로 정의하여, <strong>명령어 하나로 전체 인프라 프로비저닝</strong>이 가능한 환경을 구축했습니다.',
        '<strong>ArgoCD App of Apps 패턴 도입</strong>: Root Application이 하위 Application들을 관리하는 계층 구조로 GitOps를 구현하여, Infrastructure Apps(Istio, Prometheus 등)와 Application Apps(Backend Services)를 분리 관리했습니다.',
        '<strong>External Secrets Operator 연동</strong>: GCP Secret Manager에 저장된 민감 정보를 Kubernetes Secret으로 자동 동기화하여, Secret 변경 시 애플리케이션에 자동 반영되는 체계를 구축했습니다.',
        '<strong>다층 보안 아키텍처 적용</strong>: Istio mTLS STRICT 모드로 서비스 간 통신을 암호화하고, GCP Firewall로 외부 접근을 제어하며, NetworkPolicy로 Pod 간 트래픽을 제한하는 Zero Trust Network를 구현했습니다.',
        '<strong>K3s 경량 Kubernetes 환경 구축</strong>: GCP Compute Engine에서 K3s v1.31 클러스터를 구성하여, 리소스 효율성과 운영 편의성을 확보했습니다.'
    ],

    results: [
        '<strong>End-to-End 인프라 자동화 달성</strong>: Terraform으로 GCP 리소스 전체를 관리하여, 인프라 재현성과 일관성을 확보하고 휴먼 에러를 원천 차단했습니다.',
        '<strong>확장 가능한 GitOps 구조 확립</strong>: App of Apps 패턴으로 수십 개의 Application을 체계적으로 관리할 수 있는 구조를 구축했습니다.',
        '<strong>보안 Secret 관리 자동화</strong>: External Secrets를 통해 Secret 갱신 시 수동 개입 없이 자동 동기화되어 운영 효율성이 향상되었습니다.',
        '<strong>다층 보안 체계 구현</strong>: Network, Transport, Application 레이어에서 각각 보안을 적용하여 Defense in Depth 전략을 실현했습니다.'
    ],

    modal: {
        overview: 'GCP 환경에서 K3s Kubernetes Cluster를 운영하는 Microservice Monitoring Platform입니다. <strong>Terraform으로 GCP 리소스 전체를 자동화</strong>하고, <strong>ArgoCD App of Apps 패턴</strong>으로 GitOps를 구현하여 End-to-End 자동화를 달성했습니다.',

        keyFeatures: [
            '<strong>Full IaC</strong>: Terraform으로 GCP VPC, Firewall, VM, Secret Manager 등 전체 인프라 코드화',
            '<strong>App of Apps GitOps</strong>: ArgoCD로 Infrastructure/Application Apps를 계층적 관리',
            '<strong>Secret 자동화</strong>: External Secrets Operator + GCP Secret Manager 연동',
            '<strong>Zero Trust Network</strong>: Istio mTLS + GCP Firewall + NetworkPolicy 조합',
            '<strong>통합 Observability</strong>: Prometheus, Loki, Grafana, Kiali 스택'
        ],

        technicalImplementation: [
            '<strong>Cloud</strong>: Google Cloud Platform (VPC, Compute Engine, Secret Manager)',
            '<strong>Kubernetes</strong>: K3s v1.31',
            '<strong>IaC</strong>: Terraform',
            '<strong>GitOps</strong>: ArgoCD (App of Apps)',
            '<strong>Service Mesh</strong>: Istio v1.24',
            '<strong>Observability</strong>: Prometheus, Loki, Grafana, Kiali',
            '<strong>Secret</strong>: External Secrets Operator',
            '<strong>Backend</strong>: Go (API Gateway), Python/FastAPI (Services)'
        ],

        learningPoints: [
            'GCP 환경에서 Terraform을 활용한 전체 인프라 자동화 경험',
            'ArgoCD App of Apps 패턴을 통한 대규모 GitOps 구조 설계',
            'External Secrets와 Cloud Secret Manager를 연동한 보안 Secret 관리',
            'K3s 경량 Kubernetes 환경에서의 Production 운영 경험'
        ]
    }
};

/**
 * Cloud-Native 마이크로서비스 플랫폼 v2.0 공유 콘텐츠
 */
export const cloudNativeV2Content = {
    situation: `단독으로 진행한 'Monitoring-v2' 프로젝트는 기존 시스템(v1)의 수동적이고 비효율적인 운영 방식을 개선해야 하는 과제가 있었습니다. 인프라 변경은 수작업으로 이루어져 휴먼 에러 가능성이 높았고, 배포 프로세스는 복잡하고 느렸습니다. 또한, 서비스 간 통신 보안이 확보되지 않았으며, 시스템 장애나 성능 저하 발생 시 원인을 빠르게 파악할 수 있는 관측 가능성이 부재한 상태였습니다.`,

    tasks: [
        '<strong>인프라 프로비저닝 자동화</strong>: 수작업을 최소화하고 일관된 인프라 환경을 구축.',
        '<strong>배포 파이프라인 자동화</strong>: Git Push만으로 5분 내에 안전하게 애플리케이션을 배포.',
        '<strong>서비스 보안 체계 구축</strong>: Istio mTLS STRICT 모드를 통한 서비스 간 상호 인증 및 암호화 통신.',
        '<strong>관측 가능성 시스템 구축 및 성능 최적화</strong>: 실시간 모니터링 및 부하 테스트를 통해 병목 현상을 찾아내고, 시스템 성능을 10% 이상 개선.'
    ],

    actions: [
        '<strong>Terraform 도입으로 인프라 코드화(IaC)</strong>: Solid Cloud(OpenStack) 환경의 모든 인프라(네트워크, 스토리지, VM 등)를 코드로 정의하여, 명령어 하나로 전체 인프라를 일관되게 생성하고 관리하는 기반을 마련했습니다.',
        '<strong>GitOps 자동화 파이프라인 구축</strong>: GitHub Actions로 CI(Docker 빌드, Trivy 보안 스캔, 이미지 푸시)를 자동화하고, Argo CD를 이용해 Git Repository를 기준으로 클러스터 상태를 동기화하는 CD 파이프라인을 구축하여 <strong>5분 내 무중단 배포</strong>를 실현했습니다.',
        '<strong>Service Mesh 보안 체계 적용</strong>: Istio Service Mesh의 <strong>mTLS STRICT 모드</strong>로 서비스 간 통신을 상호 인증 및 암호화하여 서비스 간 보안 통신을 구현했습니다. 또한 CI 단계에 <strong>Trivy</strong>를 통합하여 CRITICAL/HIGH 취약점을 자동 탐지하고 PR 코멘트로 리포팅을 자동화했습니다.',
        '<strong>통합 관측 가능성 시스템 구축</strong>: Prometheus로 실시간 메트릭을 수집하고, Loki로 로그를 중앙화했으며, Grafana를 통해 Golden Signals 대시보드를 구축했습니다. Kiali를 활용해 서비스 메시를 시각적으로 모니터링하여 복잡한 MSA 구조의 트래픽 흐름을 명확히 파악할 수 있게 되었습니다.',
        '<strong>k6 부하 테스트 기반 성능 최적화</strong>: k6 스크립트로 실제와 유사한 트래픽 시나리오 기반의 부하 테스트를 진행했습니다. 테스트 결과 드러난 병목 현상을 기반으로 HPA의 임계값을 정밀하게 튜닝하여 <strong>P99 Latency 99.5% 개선(3.71s → 20.4ms)</strong>, 5xx 에러율 99.1% 감소(0.460% → 0.004%)를 달성하고 안정적인 트래픽 처리 용량을 확보했습니다.'
    ],

    results: [
        '<strong>배포 속도 및 안정성 향상</strong>: 수동으로 수십 분 걸리던 배포가 <strong>Git Push 후 평균 5분 내</strong>의 완전 자동화된 프로세스로 개선되었고, 휴먼 에러 가능성을 원천 차단했습니다.',
        '<strong>보안 자동화 및 강화</strong>: Istio mTLS STRICT 모드로 서비스 간 암호화 통신을 구현하고, 자동화된 Trivy 취약점 스캔을 통해 코드 변경 없이 <strong>높은 수준의 보안 체계</strong>를 구축했습니다.',
        '<strong>정량적 성능 개선</strong>: HPA 최적화를 통해 <strong>P99 Latency 99.5% 개선(3.71s → 20.4ms)</strong>, 5xx 에러율 99.1% 감소(0.460% → 0.004%)를 달성하고, Grafana 정상 트래픽 실측 <strong>P95 9.77ms / P99 19.8ms</strong>, k6 부하 테스트(100 VU) <strong>P95 74.76ms / 에러율 0.01%</strong>의 시스템 안정성을 확보했습니다.',
        '<strong>운영 효율성 증대</strong>: 인프라 및 배포 자동화, 중앙화된 관측성 시스템을 통해 복잡한 MSA 환경의 운영 부담을 크게 절감하고, 장애 발생 시 원인 분석 시간을 단축했습니다.'
    ],

    // 모달용 구조화된 콘텐츠
    modal: {
        overview: '로컬 환경의 블로그 플랫폼을 단국대학교 Solid Cloud(OpenStack) 환경으로 이전하며, <strong>Terraform 기반 인프라 자동화(IaC)</strong>, <strong>GitOps 배포 파이프라인</strong>, <strong>Istio Service Mesh 기반 보안 강화</strong>, <strong>통합 관측성 시스템</strong>을 구축한 Cloud-Native 프로젝트입니다. 단독으로 진행한 개인 프로젝트로 모든 핵심 목표를 달성했습니다.',

        keyFeatures: [
            '<strong>Terraform 기반 인프라 자동화</strong>: Solid Cloud 인프라(VM, 네트워크, 스토리지)를 코드로 관리',
            '<strong>GitOps 기반 완전 자동화 CI/CD</strong>: GitHub Actions, Argo CD, Kustomize를 연동하여 Git Push 후 5분 내 자동 배포',
            '<strong>컨테이너 보안 자동화</strong>: CI 파이프라인에 <strong>Trivy</strong>를 통합하여 CRITICAL/HIGH 취약점을 자동 탐지 및 PR 코멘트 리포팅 자동화',
            '<strong>Service Mesh 보안</strong>: Istio mTLS STRICT 모드를 적용하여 서비스 간 상호 인증 및 암호화 통신 구현',
            '<strong>통합 관측성(Observability) 시스템</strong>: Prometheus/Grafana/Loki로 Golden Signals 모니터링, 중앙화된 로그 관리',
            '<strong>서비스 메시 시각화</strong>: Kiali 대시보드를 통해 MSA 트래픽 흐름과 서비스 의존성을 시각적으로 분석',
            '<strong>성능 부하 테스트 및 최적화</strong>: k6 부하 테스트 기반 HPA 튜닝으로 P99 Latency 99.5% 개선(3.71s → 20.4ms), 5xx 에러율 99.1% 감소(0.460% → 0.004%)'
        ],

        technicalImplementation: [
            '<strong>Infrastructure as Code</strong>: Terraform, Kustomize',
            '<strong>CI/CD & GitOps</strong>: GitHub Actions, Argo CD',
            '<strong>Container & Orchestration</strong>: Docker, Kubernetes',
            '<strong>Service Mesh & Security</strong>: Istio (mTLS, Kiali), Trivy, RBAC',
            '<strong>Observability Stack</strong>: Prometheus, Grafana, Loki',
            '<strong>Backend</strong>: Go (API Gateway), Python/FastAPI (Services)',
            '<strong>Database & Cache</strong>: PostgreSQL, Redis',
            '<strong>Testing</strong>: k6 (Load Testing)'
        ],

        learningPoints: [
            '<strong>IaC 설계 및 운영</strong>: Terraform으로 재현 가능하고 일관된 클라우드 인프라 환경을 구축하고 운영하는 역량을 기를 수 있었습니다.',
            '<strong>GitOps 기반 CI/CD 파이프라인 완전 자동화</strong>: 개발부터 배포까지의 전체 프로세스를 자동화하며 MSA 환경의 복잡성을 관리하는 경험을 쌓았습니다.',
            '<strong>Service Mesh를 활용한 고급 보안 및 트래픽 관리</strong>: Istio를 통해 코드 수정 없이 mTLS 암호화, 접근 제어 등 높은 수준의 보안을 적용하고, Kiali로 복잡한 서비스 관계를 시각화하며 디버깅 효율을 높였습니다.',
            '<strong>DevSecOps</strong>: CI 과정에 Trivy 취약점 스캔을 통합하여 개발 초기 단계부터 보안을 고려하는 DevSecOps를 실천했습니다.',
            '<strong>데이터 기반 성능 최적화</strong>: k6 부하 테스트로 시스템의 병목을 정량적으로 분석하고, HPA 튜닝을 통해 P99 Latency 99.5% 개선(3.71s → 20.4ms) 및 5xx 에러율 99.1% 감소(0.460% → 0.004%)를 달성했습니다.'
        ]
    }
};

/**
 * exam-platform - 온라인 시험 플랫폼 공유 콘텐츠
 */
export const examPlatformV2Content = {
    situation: `Legacy 온라인 시험 시스템(Django 2.1/Python 3.6/jQuery)은 보안 패치가 중단된 프레임워크를 사용하고 있었고, 테스트 코드가 전무하여 코드 변경 시 사이드 이펙트 파악이 불가능했습니다. Template 기반 렌더링으로 SPA 수준의 UX를 제공할 수 없었으며, View에 비즈니스 로직이 혼재되어 유지보수성이 낮은 상태였습니다.`,

    tasks: [
        '<strong>Legacy 시스템 Full-Stack 마이그레이션</strong>: Django 2.1 → Django 5.2 LTS, jQuery → React 19로 완전 재작성.',
        '<strong>TDD 기반 품질 보증 체계 구축</strong>: pytest + Playwright 기반 Backend 317개 테스트, 95% 커버리지 달성.',
        '<strong>Service Layer Pattern 도입</strong>: View에 혼재된 비즈니스 로직을 Service Layer로 분리하여 유지보수성 향상.',
        '<strong>N+1 쿼리 최적화</strong>: ORM 쿼리 분석을 통해 select_related/prefetch_related 적용으로 Database 접근 횟수 감소.'
    ],

    actions: [
        '<strong>Full-Stack 재작성</strong>: Backend를 Django 5.2 LTS + DRF로 전환하고, Frontend를 React 19 + TypeScript SPA로 완전 재작성하여 Modern Stack 기반의 확장 가능한 아키텍처를 구축했습니다.',
        '<strong>TDD Workflow 확립</strong>: Red-Green-Refactor 사이클을 적용하여 pytest 기반 Backend 317개 테스트를 작성하고, Unit/Integration/E2E 3계층 테스트 전략으로 95% 커버리지를 달성했습니다.',
        '<strong>Service Layer 분리</strong>: View에 혼재되어 있던 비즈니스 로직을 Service Layer로 분리하여 단일 책임 원칙을 적용하고, 테스트 용이성과 코드 재사용성을 향상시켰습니다.',
        '<strong>N+1 쿼리 최적화</strong>: Django Debug Toolbar로 ORM 쿼리를 분석하고, select_related/prefetch_related를 적용하여 시험 목록 조회 시 Database 접근 횟수를 감소시켰습니다.',
        '<strong>JWT HttpOnly Cookie 인증</strong>: Refresh Token을 HttpOnly Cookie로 관리하고, Frontend/Backend 양측에서 RBAC 이중 검증을 적용하여 보안을 강화했습니다.',
        '<strong>Modern Frontend 구축</strong>: TanStack Query로 Server State를 관리하고, TanStack Router로 Type-Safe 라우팅을 구현하여 SPA 수준의 UX를 제공했습니다.',
        '<strong>Dual Grading + Auto-Save</strong>: 자동 채점과 수동 채점을 지원하는 이중 채점 시스템을 구현하고, 시험 응시 중 Auto-Save 기능으로 답안 유실을 방지했습니다.'
    ],

    results: [
        '<strong>95% 테스트 커버리지 달성</strong>: Backend 317개 테스트(Unit/Integration/E2E 3계층)로 코드 변경 시 안전망을 확보하고, 리팩토링 자신감을 확보했습니다.',
        '<strong>유지보수성 향상</strong>: Service Layer Pattern 도입으로 비즈니스 로직이 View에서 분리되어 코드 재사용성과 테스트 용이성이 향상되었습니다.',
        '<strong>Database 접근 70% 감소</strong>: N+1 쿼리 최적화로 시험 목록 조회 시 select_related/prefetch_related 적용으로 Database 접근 횟수가 감소하여 응답 속도가 개선되었습니다.',
        '<strong>Modern Stack 경험 확보</strong>: Django 5.2 LTS + React 19 + TypeScript 기반의 Full-Stack 개발 역량을 확보했습니다.',
        '<strong>DevOps 자동화</strong>: Docker Compose로 개발 환경을 표준화하고, GitHub Actions CI Pipeline으로 테스트 자동화를 구축했습니다.'
    ],

    modal: {
        overview: 'Legacy Django 2.1 온라인 시험 시스템을 <strong>Django 5.2 LTS + React 19</strong> Full-Stack으로 완전 재작성한 프로젝트입니다. <strong>TDD 방법론</strong>으로 Backend 317개 테스트(95% 커버리지)를 달성하고, Service Layer Pattern과 N+1 쿼리 최적화로 코드 품질과 성능을 개선했습니다.',

        keyFeatures: [
            '<strong>TDD Backend 317개 테스트</strong>: pytest + Playwright 기반 Unit/Integration/E2E 3계층 테스트 전략 (95% 커버리지)',
            '<strong>Service Layer Pattern</strong>: 비즈니스 로직과 View 분리로 단일 책임 원칙 적용',
            '<strong>N+1 쿼리 최적화</strong>: select_related/prefetch_related로 Database 접근 횟수 감소',
            '<strong>JWT HttpOnly Cookie</strong>: Access/Refresh Token + RBAC Frontend/Backend 이중 검증',
            '<strong>Dual Grading System</strong>: 자동 채점 + 수동 채점 지원, 시험 중 Auto-Save',
            '<strong>Modern Frontend</strong>: TanStack Query/Router 기반 Type-Safe SPA'
        ],

        technicalImplementation: [
            '<strong>Backend</strong>: Django 5.2 LTS, Django REST Framework, pytest',
            '<strong>Frontend</strong>: React 19, TypeScript, TanStack Query/Router',
            '<strong>Database</strong>: PostgreSQL (관계형), MongoDB (비정형), Redis (캐싱/세션)',
            '<strong>Testing</strong>: pytest (Unit/Integration), Playwright (E2E), Factory Boy',
            '<strong>DevOps</strong>: Docker Compose, GitHub Actions CI',
            '<strong>Authentication</strong>: JWT (HttpOnly Cookie), RBAC'
        ],

        learningPoints: [
            'TDD Red-Green-Refactor 사이클을 통한 테스트 주도 개발 방법론 체득',
            'Service Layer Pattern 도입으로 관심사 분리 및 아키텍처 설계 역량 강화',
            'Django ORM N+1 문제 분석 및 최적화 경험',
            'JWT HttpOnly Cookie 기반 인증 시스템 설계 및 보안 강화',
            'Legacy 시스템 마이그레이션 전략 수립 및 실행 경험'
        ]
    }
};
