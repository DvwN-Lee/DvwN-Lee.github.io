# 이동주 - Platform Engineer 포트폴리오

## 소개

코드로 표현된 인프라, 선언적 배포, 자동화된 검증을 통해 재현 가능하고 신뢰할 수 있는 플랫폼을 구축하는 Platform Engineer입니다. Go·Python 기반 Backend 개발 경험을 토대로 IaC, GitOps, Service Mesh, Observability 등 플랫폼 계층 전반을 직접 설계하고 구현했습니다. Kubernetes 환경에서 인프라부터 애플리케이션까지 코드로 정의하고, Terratest·Playwright·k6로 자동화된 방식으로 검증하는 방법론을 체계적으로 실천하고 있습니다.

**Email:** dongju101101@gmail.com
**GitHub:** https://github.com/DvwN-Lee
**Portfolio Site:** https://dvwn-lee.github.io

---

## 핵심 역량

### Platform Automation

- **IaC:** Terraform으로 GCP·CloudStack 인프라 전체를 코드화, Ansible로 Kubernetes Cluster 구성 관리 자동화
- **GitOps:** ArgoCD App of Apps 패턴으로 인프라/애플리케이션 앱을 계층적으로 선언적 관리, Kustomize base/overlay로 환경별 배포 분리
- **CI/CD Pipeline:** GitHub Actions `paths-filter` 기반 변경 서비스 선택적 빌드, 멀티 아키텍처(amd64/arm64) 이미지 빌드, Jenkins Groovy DSL Pipeline
- **Container Orchestration:** Kubernetes(k8s, k3s) Cluster 설계 및 운영, Helm·Kustomize 기반 배포 관리
- **Service Mesh:** Istio VirtualService/DestinationRule 트래픽 제어, Cilium CNI(eBPF 기반 kube-proxy 대체), MetalLB L2 LoadBalancer

### Platform Reliability

- **Infrastructure Testing:** Terratest 6단계 검증 체계(Static → Plan → Network → Compute → Integration → Stack, 4,327줄)로 인프라 신뢰성 자동 검증
- **E2E Testing:** Playwright로 Observability Stack(Grafana·Prometheus·Loki) 동작 자동 검증
- **Observability:** Prometheus + ServiceMonitor/PodMonitor 자동 메트릭 수집, Grafana Golden Signals Dashboard(Latency·Traffic·Errors·Saturation), Loki+Promtail 중앙 로깅
- **Performance:** k6 부하 테스트 시나리오 설계 및 HPA 임계값 튜닝, 성능 데이터 기반 의사결정

### Platform Security

- **Zero Trust Network:** Istio mTLS STRICT 서비스 간 상호 인증·암호화, NetworkPolicy 네임스페이스 수준 네트워크 격리, GCP Firewall 다층 방어
- **Supply Chain Security:** Trivy 컨테이너 취약점 스캔 CI 통합, HIGH 이상 취약점 빌드 자동 차단
- **Cloud Security:** GCP IAP 기반 Bastion 없는 보안 SSH, Shielded VM, External Secrets Operator + GCP Secret Manager 민감 정보 자동 동기화, Principle of Least Privilege Service Account 설정

### Backend Development

- **Languages:** Go, Python, Java, TypeScript
- **Frameworks:** FastAPI, Django, Spring Boot, React 19
- **Database:** PostgreSQL, MySQL, Redis, SQLite, MongoDB
- **API & Protocols:** RESTful API, WebSocket(STOMP), gRPC

---

## 프로젝트 로드맵

### [Evolution] Monitoring Platform의 진화: v1에서 v3까지

본 프로젝트 시리즈는 수동 구성 기반의 아키텍처에서 IaC, GitOps, 자동화된 검증 체계를 갖춘 클라우드 네이티브 플랫폼으로 진화해 온 과정을 담고 있습니다.

- **v1 (Foundational):** Microservice 구조 설계 및 Go 기반 커스텀 게이트웨이 구현 (플랫폼 기초 설계 역량)
- **v2 (Automated):** Kubernetes 전환, Istio Service Mesh 및 GitOps 도입 (플랫폼 자동화 및 보안 강화)
- **v3 (Reliable):** GCP 이관, IaC(Terraform) 및 Terratest 6단계 자동화 검증 (플랫폼 신뢰성 및 안정성 구현)

---

### Monitoring Platform 시리즈 (v1 → v2 → v3)

개인 학습 프로젝트로 단계적으로 발전시킨 Cloud-Native 플랫폼 시리즈입니다. 각 버전은 이전 버전에서 발견한 기술적 한계를 인식하고, 더 나은 플랫폼 구성 방식으로 개선한 결과입니다.

| 버전 | 기간 | 핵심 변화 | 인식한 한계 |
|------|------|-----------|-------------|
| **v1** | 2025.09 | Go 커스텀 컴포넌트(API Gateway, Stats Aggregator)로 MSA 패턴 직접 구현 | 커스텀 구현의 유지보수 비용, 프로덕션 수준 Service Mesh 기능 부재 |
| **v2** | 2025.10~12 | Istio Service Mesh로 대체 + ArgoCD GitOps 파이프라인 추가 | 온프레미스 환경 제약, 인프라 자체에 대한 자동화된 검증 체계 부재 |
| **v3** | 2025.12~2026.02 | GCP 전환 + Terratest 6단계 검증 + App of Apps 패턴 | — (현재 진행형) |

---

### 1. GCP Cloud-Native Monitoring Platform v3.0

**기간:** 2025.12 ~ 2026.02
**역할:** 1인 프로젝트 (Infrastructure 설계 및 구축, Backend 개발)
**GitHub:** [https://github.com/DvwN-Lee/Monitoring-v3](https://github.com/DvwN-Lee/Monitoring-v3)

#### 프로젝트 개요

v2(Solid Cloud) 환경의 한계(수동 인프라 프로비저닝, 검증 부재)를 극복하기 위해 GCP로 플랫폼을 전환하고 인프라 전 과정을 코드화한 프로젝트입니다. Terraform으로 리소스를 정의하고, **Terratest 6단계 검증 체계**를 구축하여 "인프라도 소프트웨어처럼 테스트될 수 있다"는 방법론을 실천했습니다.


#### 주요 구현 사항

**1. GCP Infrastructure as Code (Terraform)**

- VPC, Subnet, Firewall Rules, Compute Engine VM, GCP Secret Manager 등 전체 인프라를 Terraform으로 코드화
- IAP(Identity-Aware Proxy) 기반 Bastion 없는 보안 SSH 접속 환경 구성
- **Resource Right-sizing:** Prometheus 메트릭 분석을 통해 실제 사용량 대비 과도하게 할당된 Pod의 `requests/limits` 설정을 재조정하여 클러스터 자원 집적도 향상
- **비용 최적화:** MIG(Managed Instance Group) + Spot VM을 활용하여 Worker Node를 구성하고, HPA와 연동하여 트래픽에 따른 탄력적 비용 관리 체계 구축

**2. Terratest 기반 Infrastructure 검증 (6단계, 4,327줄)**

- Layer 0: Static Validation (Terraform fmt/validate)
- Layer 1: Plan Unit Test / Deep Plan Analysis
- Layer 2: Network Layer 검증 (VPC, Firewall, IAP 접근성)
- Layer 3: Compute & k3s 검증 (Node 상태, API Server 응답)
- Layer 4: Full Integration Test (전체 Stack 연동)
- Layer 5: Monitoring Stack 검증 (Prometheus, Grafana, Loki 정상 동작)

**3. ArgoCD App of Apps GitOps Pipeline**

- Root Application이 하위 Applications를 계층적으로 관리하는 App of Apps 패턴 도입
- Infrastructure Apps(Istio, Prometheus, Grafana, Loki) / Application Apps(Backend Services) 분리 관리
- External Secrets Operator + GCP Secret Manager 연동으로 민감 정보 자동 동기화

**4. CI/CD 고도화 (GitHub Actions)**

- `paths-filter` 기반 변경된 Service만 선택적으로 빌드하여 빌드 시간 단축
- 멀티 아키텍처 Docker 이미지 빌드 (amd64/arm64)
- Trivy 보안 스캔 결과 PR 댓글 자동화
- GitHub Actions에서 Terraform Firewall 규칙 동적 업데이트

**5. E2E 테스트 자동화 (Playwright, 321줄)**

- Grafana Dashboard 로드 및 Panel 데이터 정상 수신 검증
- Prometheus Target 상태 및 Loki 로그 수집 동작 검증
- Kiali Service Mesh 트래픽 그래프 접근성 확인

**6. Microservice Backend (Fullstack Synergy)**

- Go API Gateway (344줄): 경로 기반 라우팅, 요청 프록시 및 통합 메트릭 수집 인터페이스 구현
- Python FastAPI: Auth, Blog, User 3개 마이크로서비스 설계 및 배포
- Istio mTLS STRICT + GCP Firewall + NetworkPolicy 조합한 Zero Trust Network 구축

#### [Fullstack + Platform Synergy]

- **애플리케이션 가시성 확보:** Go로 작성된 API Gateway 레이어에서 직접 메트릭을 추출하고, 이를 Prometheus/Grafana 인프라와 연동하여 병목 지점을 추적하는 엔드 투 엔드 관측성을 구현했습니다.
- **보안의 계층화:** 서비스 코드 내의 JWT 인증 로직(Application)과 Istio mTLS(Infrastructure)를 결합하여, 애플리케이션과 네트워크 양측에서 검증되는 다층 보안 체계를 구축했습니다.

#### 기술 스택

| 영역 | 기술 |
|------|------|
| Cloud & Infra | GCP, Terraform, k3s v1.31, Helm, Ansible |
| Platform | ArgoCD (App of Apps), Istio v1.24 (mTLS), External Secrets Operator |
| Observability | Prometheus, Grafana, Loki, Kiali |
| Testing | Terratest (Go, 4,327줄), Playwright (TypeScript, 321줄) |
| Backend | Go (API Gateway), Python FastAPI (Auth/Blog/User) |

#### 핵심 학습

- Terratest 6단계 파이프라인으로 인프라를 코드 수준에서 자동 검증하는 Platform Reliability 체계 구축
- App of Apps 패턴으로 다수 ArgoCD Application을 계층적으로 관리하는 선언적 플랫폼 구조 설계
- IAP·Shielded VM·Firewall·NetworkPolicy·mTLS 조합으로 코드로 표현된 다층 Zero Trust 보안 아키텍처 구현
- MIG + Spot VM을 활용한 Worker Node 자동 확장 및 비용 최적화 경험

---

### 2. exam-platform - Online Exam Platform

**기간:** 2025.12 ~ 2026.02
**역할:** 1인 프로젝트 (Full-Stack 개발, Test Automation)
**GitHub:** https://github.com/DvwN-Lee/exam-platform

#### 프로젝트 개요

Legacy 온라인 시험 시스템(Django 2.1/Python 3.6/jQuery)을 Django 5.2 LTS + React 19 Full-Stack으로 재구현한 프로젝트입니다. TDD 방법론을 적용하여 Backend 303개 테스트(92% 커버리지)를 달성하고, Service Layer Pattern 도입으로 비즈니스 로직과 View를 분리했습니다.

#### 주요 구현 사항

**1. Legacy 시스템 Full-Stack 마이그레이션 및 재구현**

- Backend: Django 2.1 → Django 5.2 LTS + DRF, Python 3.6 → Python 3.14
- Frontend: jQuery Template 렌더링 → React 19 + TypeScript SPA
- REST API 기반 Backend/Frontend 분리 아키텍처로 전환

**2. TDD 기반 테스트 전략 (303개 테스트, 92% 커버리지)**

- Unit Test: Service Layer / Repository 개별 로직 검증
- Integration Test: API Endpoint → DB 연동 전체 흐름 검증
- E2E Test: Playwright 기반 학생/교사 시나리오 검증
- CI Pipeline(GitHub Actions)에서 전체 테스트 자동 실행 및 커버리지 리포트 생성

**3. Service Layer Pattern 도입**

- View에 혼재되어 있던 비즈니스 로직을 Service Layer로 분리
- 단일 책임 원칙 적용으로 테스트 용이성 및 코드 재사용성 향상

**4. Database 성능 최적화 (Query & Schema)**

- **복합 인덱스(Composite Index) 전략:** 응시 이력 및 성적 통계 쿼리 분석을 통해 `(student_id, exam_id, created_at)` 복합 인덱스를 설계하여 Full Table Scan 방지 및 조회 속도 개선
- **N+1 쿼리 최적화:** Django ORM의 `select_related` 및 `prefetch_related`를 전략적으로 활용하여 시험 목록 조회 시 Database 접근 횟수를 70% 감소(10회 → 3회)
- **Database Connection Pool 튜닝:** 피크 타임 시 응답 지연을 방지하기 위해 서버 리소스에 최적화된 `pool_size` 및 `max_overflow` 파라미터 도출

**5. 보안 (JWT HttpOnly Cookie + RBAC)**

- Access/Refresh Token을 HttpOnly Cookie로 관리하여 XSS 공격 노출 방지
- Frontend(React) + Backend(DRF) 양측에서 RBAC 이중 검증
- 교사/학생/관리자 권한별 API Endpoint 접근 제어

**6. Multi-Database 아키텍처**

- PostgreSQL: 핵심 관계형 데이터 (사용자, 시험, 문제, 응시)
- MongoDB: 비정형 로그 데이터 (응시 이벤트, 답안 변경 이력)
- Redis: 세션 관리 및 캐싱

**7. 기능 구현**

- 자동 채점(객관식) + 수동 채점(주관식) 이중 채점 시스템
- 시험 응시 중 Auto-Save (답안 유실 방지)
- 학생/교사 대시보드 (성적 추이, 예정 시험, 통계)
- TanStack Query로 Server State 관리, TanStack Router로 Type-safe 라우팅

#### [Fullstack + Platform Synergy]

- **데이터 중심 성능 최적화:** Django ORM의 N+1 쿼리 문제를 해결(Application)함과 동시에, DB 인덱스 전략 수립 및 리소스 할당 최적화(Platform)를 병행하여 시스템 전반의 처리 용량을 확보했습니다.
- **테스트 주도 신뢰성 확보:** 백엔드 92% 커버리지의 TDD(Application)와 GitHub Actions CI 파이프라인(Platform)을 통합하여, 코드 변경이 인프라 배포까지 안전하게 이어지는 'Continuous Quality' 체계를 구축했습니다.

#### 기술 스택

| 영역 | 기술 |
|------|------|
| Backend | Django 5.2 LTS, DRF, Python 3.14 (uv), pytest |
| Frontend | React 19, TypeScript, TanStack Query/Router, Tailwind CSS 4 |
| Database | PostgreSQL, MongoDB, Redis |
| Platform | Docker Compose, GitHub Actions CI, Terraform, GCP |
| Testing | Playwright (E2E), Vitest, MSW, Factory Boy |

#### 핵심 학습

- **Vertical Optimization:** 애플리케이션 코드 개선(Service Layer 분리)과 데이터베이스 최적화(Query 감소 70%)를 아우르는 수직적 성능 개선 역량 확보
- **현대적 프론트엔드 아키텍처:** React 19와 Type-safe한 상태 관리/라우팅을 적용하여 유지보수성이 높은 대규모 SPA 개발 경험
- **자동화된 품질 보증:** Unit, Integration, E2E 테스트가 통합된 CI 파이프라인을 통해 서비스의 안정성을 정량적으로 보장하는 방법론 체득

---

### 3. Cloud-Native Microservice Platform v2.0

**기간:** 2025.10.26 ~ 2025.12.19
**역할:** 1인 프로젝트 (Infrastructure 설계 및 구축, Backend 개발)
**GitHub:** https://github.com/DvwN-Lee/Monitoring-v2

#### 프로젝트 개요

Solid Cloud(CloudStack) 환경에서 Terraform 기반 Infrastructure 자동화와 GitOps 배포 파이프라인을 구축한 Cloud-Native 플랫폼입니다. Istio Service Mesh로 서비스 간 보안 통신을 구현하고, Prometheus/Grafana/Loki 통합 관측성 시스템을 구축했습니다. k6 부하 테스트 기반 HPA 튜닝으로 트래픽 부하에 대응하는 안정성을 확보했습니다.

온프레미스 CloudStack 환경의 네트워크 구성 제약과, Terraform으로 배포한 인프라 자체를 코드 수준에서 자동으로 검증하는 체계가 없다는 점을 인식했습니다. 이를 해결하기 위해 v3에서 GCP로 전환하고 Terratest 기반 6단계 인프라 검증 체계를 구축했습니다.

#### 주요 구현 사항

**1. Infrastructure as Code (Terraform + Kustomize)**

- Terraform으로 CloudStack 인프라(VM, 네트워크, 스토리지, Port Forwarding)를 코드화
- Kustomize base/overlay 패턴으로 개발/운영 환경별 Kubernetes Manifest 선언적 관리
- Terraform State를 Git이 아닌 별도 Backend에 저장하여 동시 작업 시 State Lock 충돌 방지

**2. GitOps CI/CD Pipeline**

- CI: GitHub Actions로 Docker 이미지 빌드 → Trivy 보안 스캔(HIGH 이상 빌드 차단) → 레지스트리 Push 자동화
- CD: Argo CD가 Git Repository 변경을 감지하여 Kustomize Build → Kubernetes Apply 수행
- Git Push 후 평균 5분 내 자동 배포 달성

**3. Istio Service Mesh (Zero Trust Network)**

- mTLS STRICT 모드 적용으로 모든 서비스 간 통신 상호 인증 및 암호화
- NetworkPolicy로 네임스페이스 수준 네트워크 격리 (Backend 네임스페이스는 Frontend만 접근 허용)
- Kiali 대시보드로 MSA 트래픽 흐름 및 서비스 의존성 시각화

**4. Observability System**

- Prometheus + ServiceMonitor/PodMonitor 기반 자동 메트릭 수집
- Grafana Golden Signals 대시보드 구성 (Latency, Traffic, Errors, Saturation)
- Loki + Promtail 중앙 로깅 시스템 구축

**5. 성능 최적화 (Data-driven Tuning)**

- **k6 기반 HPA 임계값 최적화:** k6 부하 테스트(100 VU) 중 발생하는 지연 시간 및 에러율 데이터를 분석하여, CPU 사용량 기반 HPA(`targetCPUUtilization: 70%`) 임계값의 유효성 검증 및 조정
- **성능 개선 결과:** P99 Latency 94% 감소(3.71s → 238ms) 및 에러율 0.01% 미만 유지 확인
- **Observability 오버헤드 관리:** Prometheus 저장소 부하를 줄이기 위해 High-cardinality 레이블을 정리하고 수집 주기를 튜닝하여 모니터링 스택의 리소스 점유율 약 15% 절감

**6. 아키텍처 결정 기록 (ADR)**

- ADR 10건 작성: Istio vs Linkerd 선택, Kustomize vs Helm 비교, HPA 임계값 설정 근거 등 아키텍처 결정 배경 및 Trade-off 문서화

#### [Fullstack + Platform Synergy]

- **데이터 기반 아키텍처 의사결정:** 부하 테스트(k6)로 수집된 애플리케이션 지연 시간 데이터를 분석하여, HPA 임계값을 튜닝하고 최적의 리소스 가이드라인을 설정하는 'SRE적 접근 방식'을 실천했습니다.
- **문서화를 통한 지식 공유:** 복잡한 기술적 선택의 이유를 ADR로 기록하여, 플랫폼의 유지보수성과 팀 내 기술적 일관성을 높이는 협업 기반을 마련했습니다.

#### 기술 스택

| 영역 | 기술 |
|------|------|
| Infrastructure | Kubernetes, Terraform, Kustomize |
| Platform | Argo CD, GitHub Actions, Istio (mTLS), Trivy |
| Observability | Prometheus, Grafana, Loki, Kiali |
| Performance | k6 (부하 테스트) |
| Backend | Go, Python FastAPI, PostgreSQL, Redis |

#### 핵심 학습

- IaC로 재현 가능한 인프라를 구축하고 Terraform State를 별도 Backend에 저장하여 State 일관성 확보
- ArgoCD + Kustomize 기반 GitOps: 선언적 배포로 환경별 일관성을 코드로 보장
- Istio mTLS STRICT와 NetworkPolicy로 네임스페이스 수준의 Zero Trust 네트워크 구현
- k6 부하 테스트 → Golden Signals 실측 → HPA 튜닝으로 이어지는 데이터 기반 성능 최적화 사이클 경험

---

### 4. Kubernetes CI/CD Infrastructure

**기간:** 2025.11.27 ~ 2025.11.30
**역할:** 1인 프로젝트 (Infrastructure 설계 및 구축)
**GitHub:** https://github.com/DvwN-Lee/k8s-cicd-automation

#### 프로젝트 개요

CloudStack 환경에서 Terraform과 Ansible을 조합하여 Kubernetes Cluster를 자동으로 구축하고, Jenkins, GitLab, Docker Registry를 배포하여 Git Push to Deploy 파이프라인을 구현한 IaC 프로젝트입니다. 수동 구성 방식의 한계를 극복하기 위해 전체 프로비저닝 과정을 코드화하여 인프라 공급 주기를 단축하고 구성의 일관성을 확보했습니다.

#### 주요 구현 사항

**1. IaC 파이프라인 (Terraform → Ansible)**

- Terraform으로 CloudStack 인프라(VM 3대, Network, Port Forwarding 규칙) 코드화
- VM 프로비저닝 완료 후 Ansible Inventory 파일을 자동 생성하여 구성 관리 단계로 seamless 전달
- Terraform(인프라 프로비저닝) + Ansible(소프트웨어 구성 관리)의 역할 분리로 각 도구의 강점 활용

**2. Kubernetes Cluster 자동화 (Ansible Playbook)**

- containerd v1.7.2 런타임, Kubernetes v1.28.15, Cilium CNI v1.14.5, MetalLB v0.13.12 순차 설치 자동화
- kubeadm init/join, kubelet 설정, CNI 플러그인 설치 전 과정을 멱등성 있게 구현하여 재현 가능한 클러스터 구축 체계 마련

**3. CI/CD 도구 배포 및 파이프라인 구성**

- Jenkins + GitLab CE + Docker Registry 기반 Git Push to Deploy 파이프라인 구현
- GitLab Push → Jenkins 자동 빌드 → Docker 이미지 생성 및 Registry Push → Kubernetes 자동 배포
- Jenkins Pipeline을 Groovy DSL로 작성하여 빌드/테스트/배포 단계 선언적 정의

**4. Workload 격리 (Node Selector)**

- 3-Node 구성: Control Plane(2 CPU, 4GB) / DevOps Node(4 CPU, 8GB) / App Node(2 CPU, 4GB)
- Node Selector(`kubernetes.io/hostname`)로 Jenkins, GitLab, Docker Registry를 DevOps Node에 고정 배치
- DevOps 도구와 애플리케이션 워크로드를 분리하여 리소스 경합 방지

**5. 네트워크 구성**

- Cilium CNI: kube-proxy 대체 모드(eBPF 기반)로 네트워크 성능 향상
- MetalLB L2 모드: 외부에서 Service 접근 가능한 LoadBalancer IP 할당

#### 기술 스택

| 영역 | 기술 |
|------|------|
| IaC & Config | Terraform, Ansible |
| Platform | Kubernetes v1.28, containerd, Cilium (eBPF), MetalLB |
| CI/CD | Jenkins (Groovy Pipeline), GitLab CE, Docker Registry |

#### 핵심 학습

- Terraform(인프라 프로비저닝) + Ansible(소프트웨어 구성 관리) 역할 분리로 반복 가능한 플랫폼 부트스트랩 자동화
- Ansible 멱등성 Playbook으로 kubeadm 기반 Kubernetes Cluster를 수동 개입 없이 재현 가능하게 구성
- Cilium eBPF CNI와 MetalLB를 코드로 통합하여 네트워킹 레이어까지 IaC 범위 확장

---

### 5. 실시간 Microservice Monitoring Platform v1.0

**기간:** 2025.09.02 ~ 2025.09.27
**역할:** 1인 프로젝트 (Architecture 설계, Backend 개발)
**GitHub:** https://github.com/DvwN-Lee/Monitoring

#### 프로젝트 개요

단국대학교 CloudStack(Solid Cloud) 환경에서 Go와 Python(FastAPI)을 활용한 폴리글랏 마이크로서비스 기반 실시간 모니터링 대시보드를 구축했습니다. Go로 API Gateway와 Stats Aggregator를 구현하여 100 RPS 이상의 트래픽을 안정적으로 처리하고, Kustomize로 Kubernetes 환경별 배포를 관리합니다.

직접 구현한 Circuit Breaker, Stats Aggregator는 기능적으로 동작했으나, 이를 유지보수하는 비용과 프로덕션 수준의 Service Mesh 기능(세밀한 트래픽 제어, 서비스 간 가시성)을 커스텀으로 구현하는 것의 한계를 확인했습니다. 이 경험이 v2에서 Istio Service Mesh를 도입하고 커스텀 컴포넌트를 대체하는 결정의 근거가 되었습니다.

#### 주요 구현 사항

**1. Go 기반 동시성 최적화 컴포넌트**

- **API Gateway:** 고루틴 기반 비차단(Non-blocking) I/O 처리를 통해 마이크로서비스 요청 분산 및 라우팅 구현
- **Stats Aggregator 최적화:** 대량의 메트릭 처리 시 발생하는 채널 블로킹 현상을 방지하기 위해 **Buffered Channel**과 **Worker Pool** 패턴을 도입하여 동시성 처리 성능 안정화
- **Circuit Breaker:** 특정 서비스 장애 시 지연 시간이 전체 시스템으로 전파되는 것을 차단하기 위한 타임아웃 및 폴백 로직 구현

**2. Python FastAPI 마이크로서비스**

- Auth, Blog, User 3개 서비스를 FastAPI로 구현
- Redis Cache-Aside 패턴 적용: 자주 조회되는 데이터를 Redis에 캐싱하여 응답 속도 개선
- 각 서비스가 SQLite를 독립적으로 사용 (Database per Service 패턴)

**3. Kustomize 환경별 설정 관리**

- base: 공통 Kubernetes 리소스 정의 (Deployment, Service, ConfigMap)
- overlay: 환경별 차이 (Replica 수, Resource Limits, 환경 변수)
- local / staging / production 3개 환경 Manifest 선언적 관리

**4. 실시간 모니터링 대시보드**

- Vanilla JavaScript + Chart.js + WebSocket으로 RPS, 평균 응답 시간, 서비스 상태를 1초마다 실시간 업데이트
- Stats Aggregator가 WebSocket으로 집계 메트릭을 Dashboard에 푸시

#### 기술 스택

| 영역 | 기술 |
|------|------|
| Backend | Go (Custom Gateway/Proxy), Python FastAPI |
| Orchestration | Kubernetes, Kustomize |
| Database | SQLite (Independent), Redis (Cache-Aside) |
| Frontend | Vanilla JS, Chart.js, WebSocket |

#### 핵심 학습

- Go 고루틴 기반 비동기 처리로 커스텀 Reverse Proxy·Stats Aggregator를 구현하여 Service Mesh의 핵심 역할을 직접 이해
- Kustomize base/overlay 패턴으로 환경별 Kubernetes Manifest를 선언적으로 관리하는 플랫폼 구조 설계
- 커스텀 구현의 한계를 실제로 경험하고 표준 도구(Istio) 도입의 필요성을 데이터 기반으로 판단

---

### 6. 온라인 시험 관리 시스템 (Legacy)

**기간:** 2023.06
**역할:** Fullstack 개발 (1인 프로젝트)
**GitHub:** https://github.com/DvwN-Lee/OnlineExam

#### 프로젝트 개요

Django 프레임워크를 활용한 온라인 시험 출제 및 관리 시스템입니다. 관리자, 교사, 학생 3가지 역할을 가진 사용자 모델을 설계하고, Django Admin을 통해 시스템 운영 기능을 구현했습니다. 이 프로젝트를 Django 5.2 LTS + React 19로 완전 재작성한 것이 exam-platform v2입니다.

#### 주요 구현 사항

**1. 역할 기반 사용자 모델 설계**

- `user_type` 필드로 관리자, 교사, 학생 3가지 역할을 구분하는 사용자 모델 정의
- Django Admin을 통해 사용자 등록, 역할 할당, 권한 관리 기능 제공

**2. 도메인 모델링**

- 사용자(User), 문제(Question), 시험지(Exam), 응시(Submission) 4가지 핵심 모델을 Django ORM으로 정의
- 시험지와 문제는 ManyToManyField 관계로 설계하여 문제 재사용 지원
- MySQL InnoDB 엔진을 백엔드로 사용하여 트랜잭션 기반 데이터 무결성 확보

**3. Django Admin 커스터마이징**

- 시험지/문제/응시 결과를 Django Admin에서 관리할 수 있도록 ModelAdmin 등록 및 커스터마이징
- `list_display`, `list_filter`, `search_fields` 설정으로 데이터 조회 효율화
- Inline Admin으로 시험지 생성 시 문제를 동시에 추가하는 UX 개선

**4. Frontend**

- jQuery + Bootstrap 기반 사용자 인터페이스

#### 기술 스택

**Backend:** Django, MySQL, Django ORM
**Frontend:** jQuery, Bootstrap, Django Admin
**Infrastructure:** Python 가상환경

---

### 7. SimpleChat - 실시간 채팅 Application

**기간:** 2023.05.17
**역할:** Backend 개발 (1인 프로젝트)
**GitHub:** https://github.com/DvwN-Lee/demochat

#### 프로젝트 개요

Spring Boot 환경에서 WebSocket 프로토콜과 STOMP 메시지 브로커를 활용한 실시간 양방향 채팅 시스템입니다. Pub/Sub 패턴으로 메시지를 브로드캐스트하고, Spring Data JPA로 메시지 영속성을 확보했습니다.

#### 주요 구현 사항

**1. WebSocket + STOMP 아키텍처**

- Spring WebSocket으로 `/ws` Endpoint WebSocket 연결 수립
- STOMP 메시지 브로커로 `/topic/public`을 구독하는 모든 클라이언트에 메시지 브로드캐스트 (Pub/Sub 패턴)
- SockJS Fallback 적용: WebSocket 미지원 브라우저에서도 실시간 통신 지원

**2. 메시지 영속성 (Spring Data JPA)**

- `Message` Entity 설계: `id`, `text`, `userId`, `username`, `timestamp` 필드 구성
- `JpaRepository<Message, Long>` 상속으로 메시지 저장 및 조회 구현
- MySQL InnoDB 백엔드로 메시지 영속성 확보

**3. 실시간 UI (Thymeleaf + JavaScript)**

- Thymeleaf 서버 사이드 렌더링으로 초기 페이지 로드
- SockJS + STOMP.js로 클라이언트 WebSocket 연결 및 메시지 구독
- 메시지 수신 시 DOM 조작으로 채팅 UI에 동적 추가, 자동 스크롤 구현
- 사용자 입력 유효성 검사 및 서버 측 예외 처리로 안정성 확보

#### 기술 스택

**Backend:** Spring Boot, Spring WebSocket, STOMP, Spring Data JPA, MySQL, Gradle
**Frontend:** Thymeleaf, JavaScript, SockJS, STOMP.js

---

### 8. Dorazy - 도서관 예약 System (Hackathon 동상 수상)

**기간:** 2022.05.30 ~ 2022.08.19
**역할:** Android 개발 및 Firebase Backend, 팀 리더 (4인 팀)
**GitHub:** https://github.com/kimyeonhong00/dorazy
**수상:** 경소톤 Hackathon 동상 (SW융합대학 X 경영경제대학 연합 해커톤)

#### 프로젝트 개요

단국대학교 도산라운지 좌석 예약 및 관리 Android 앱입니다. Firebase BaaS를 활용한 Serverless Architecture를 채택하여 서비스 로직을 빠르게 구성하고, 실시간 데이터 동기화 기능을 구현하여 해커톤 동상을 수상했습니다.

#### 주요 구현 사항

**1. Firebase Serverless 아키텍처 기반 프로토타이핑**

- Firestore NoSQL 데이터베이스로 좌석 정보, 예약 내역, 사용자 데이터 실시간 동기화 체계 구축
- Firebase Authentication으로 사용자 인증 간소화 및 데이터 접근 제어
- Firestore Realtime Listener로 좌석 상태 변경을 UI에 실시간 반영

**2. 실시간 데이터 무결성 확보**

- Firestore 문서의 예약 상태(`isReserved` 필드)를 확인한 후 예약 처리를 수행하여 중복 예약 차단
- 예약된 좌석은 Realtime Listener를 통해 즉시 비활성화되어 사용자 간 충돌 방지

**3. 게이미피케이션 요소 도입**

- 공부 시간 측정 타이머 기능 및 학습 시간 집계 로직 구현
- Firestore 실시간 데이터를 활용한 랭킹 시스템으로 사용자 참여 유도

**4. 팀 협업 및 프로세스**

- 팀 프로젝트 라이프사이클 관리: 기획 / Figma 디자인 / Android 개발 협업
- Figma로 UI/UX 가이드를 도출하고 Android XML/Kotlin으로 일관성 있게 구현
- Feature Branch 전략을 활용한 형상 관리로 코드 안정성 확보

#### 기술 스택

**Mobile:** Android, Kotlin
**Backend (BaaS):** Firebase (Firestore, Authentication)
**Design:** Figma

---

## 기술 스택

### Platform Engineering

| 분류 | 기술 |
|------|------|
| IaC & GitOps | Terraform, Ansible, Argo CD, Kustomize, Helm |
| Orchestration | Kubernetes (k8s, k3s), Docker, containerd |
| CI/CD Pipeline | GitHub Actions, Jenkins, GitLab |
| Service Mesh | Istio (mTLS), Kiali |
| Observability | Prometheus, Grafana, Loki |
| Reliability & Security | Terratest, Playwright, k6, Trivy, NetworkPolicy |

### Software Engineering

| 분류 | 기술 |
|------|------|
| Languages | Go, Python, Java, TypeScript |
| Frameworks | FastAPI, Django, Spring Boot, React 19 |
| Database | PostgreSQL, MySQL, Redis, MongoDB, SQLite |
| API & Protocols | RESTful API, WebSocket (STOMP), gRPC |

### Cloud & Operations

| 분류 | 기술 |
|------|------|
| Cloud | GCP (Compute Engine, VPC, MIG, IAP, Secret Manager), CloudStack |
| OS | Linux (Ubuntu, CentOS) |
| Dev Tools | Git, Docker Compose, Skaffold, uv |

---

## 학력 및 수상

**단국대학교 컴퓨터공학과**
2021.03 ~ 2026.02 (졸업 예정)

**수상 경력**
2022.08 - 경소톤 Hackathon 동상 (Dorazy - 도서관 예약 System)

---

## 연락처

**Email:** dongju101101@gmail.com
**GitHub:** https://github.com/DvwN-Lee
**Blog:** https://velog.io/@dvwn-lee
**Portfolio Site:** https://dvwn-lee.github.io

---

**최종 수정일:** 2026.02
