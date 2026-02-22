# 이동주 - DevOps/Cloud Engineer 포트폴리오

## 소개

자동화를 통해 안정적이고 재현 가능한 시스템을 구축하는 DevOps Engineer입니다. Backend 개발(Django, Spring Boot, FastAPI, Go) 경험을 기반으로 DevOps 영역으로 진출하여, 개발자 관점에서 Infrastructure 자동화와 배포 파이프라인을 설계했습니다. Kubernetes 환경에서 IaC, CI/CD Pipeline, Service Mesh, Observability System을 직접 구현하고 운영한 경험을 보유하고 있습니다.

**Email:** dongju101101@gmail.com
**GitHub:** https://github.com/DvwN-Lee
**Portfolio Site:** https://dvwn-lee.github.io

---

## 핵심 역량

### Cloud & Infrastructure

- **Container Orchestration:** Kubernetes(k8s, k3s) Cluster 설계 및 운영, Helm/Kustomize 기반 배포 관리
- **Infrastructure as Code:** Terraform으로 GCP/CloudStack 인프라 자동화, Ansible로 서버 구성 관리
- **Service Mesh:** Istio 기반 mTLS STRICT 보안 통신, VirtualService/DestinationRule 트래픽 제어
- **Networking:** Cilium CNI(kube-proxy 대체), MetalLB L2 LoadBalancer, NetworkPolicy 기반 네트워크 격리

### CI/CD & GitOps

- **CI/CD Pipeline:** GitHub Actions, Argo CD, Jenkins를 활용한 Build/Test/Deploy 자동화
- **GitOps:** Kustomize base/overlay 패턴으로 환경별 선언적 배포 관리
- **Security Automation:** Trivy Container 취약점 스캔 CI 통합, HIGH 이상 취약점 빌드 자동 차단
- **Testing:** Playwright E2E, Terratest Infrastructure 검증, pytest 기반 3계층 테스트 전략

### Observability & Monitoring

- **Metric 수집:** Prometheus + ServiceMonitor/PodMonitor 기반 자동 수집
- **시각화:** Grafana Golden Signals Dashboard 구성 (Latency, Traffic, Errors, Saturation)
- **Logging:** Loki + Promtail 중앙 로깅 시스템 구축
- **성능 테스트:** k6 부하 테스트 및 HPA 튜닝

### Backend Development

- **Languages:** Go, Python, Java, TypeScript
- **Frameworks:** FastAPI, Django, Spring Boot, React 19
- **Database:** PostgreSQL, MySQL, Redis, SQLite, MongoDB
- **API & Protocols:** RESTful API, WebSocket(STOMP), gRPC

---

## 프로젝트

### 1. GCP Cloud-Native Monitoring Platform v3.0

**기간:** 2025.12 ~ 2026.02
**역할:** 1인 프로젝트 (Infrastructure 설계 및 구축, Backend 개발)
**GitHub:** https://github.com/DvwN-Lee/Monitoring-v3

#### 프로젝트 개요

v2(Solid Cloud) 환경의 Cloud-Native Platform을 GCP로 전환한 프로젝트입니다. Terraform으로 GCP 리소스 전체를 코드화하고, Terratest 6단계 검증 체계로 Infrastructure 신뢰성을 확보했습니다. ArgoCD App of Apps 패턴으로 GitOps 파이프라인을 구현하고, Playwright E2E 테스트로 Observability Stack 동작을 자동 검증합니다.

#### 주요 구현 사항

**1. GCP Infrastructure as Code (Terraform)**

- VPC, Subnet, Firewall Rules, Compute Engine VM, GCP Secret Manager 등 전체 인프라를 Terraform으로 코드화
- IAP(Identity-Aware Proxy) 기반 Bastion 없는 보안 SSH 접속 환경 구성
- Shielded VM 적용 및 Service Account 최소 권한(Principle of Least Privilege) 설정
- MIG(Managed Instance Group) + Spot VM으로 Worker Node 자동 확장 및 비용 최적화

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

**6. Microservice Backend**

- Go API Gateway (344줄): 경로 기반 라우팅, 요청 프록시
- Python FastAPI: Auth, Blog, User 3개 서비스
- Istio mTLS STRICT + GCP Firewall + NetworkPolicy 조합한 Zero Trust Network

#### 기술 스택

| 영역 | 기술 |
|------|------|
| Cloud | GCP (Compute Engine, VPC, Firewall, IAP, MIG, Spot VM, Secret Manager) |
| Infrastructure | Terraform, k3s v1.31, Helm |
| GitOps | ArgoCD (App of Apps), GitHub Actions (paths-filter, multi-arch) |
| Service Mesh | Istio v1.24 (mTLS STRICT) |
| Observability | Prometheus, Grafana, Loki, Kiali |
| Secret | External Secrets Operator |
| Testing | Terratest (Go, 4,327줄), Playwright (TypeScript, 321줄) |
| Backend | Go (API Gateway), Python FastAPI (Auth/Blog/User) |

#### 핵심 학습

- Terratest로 Infrastructure를 코드 수준에서 검증하는 6단계 파이프라인 구축 경험
- App of Apps 패턴으로 다수 ArgoCD Application을 계층적으로 관리하는 GitOps 구조 설계
- GCP 환경에서 IAP, Shielded VM, Firewall, NetworkPolicy를 조합한 다층 보안 아키텍처 적용
- MIG + Spot VM을 활용한 Worker Node 자동 확장 및 비용 최적화

---

### 2. exam-platform - Online Exam Platform

**기간:** 2025.12 ~ 2026.02
**역할:** 1인 프로젝트 (Full-Stack 개발, Test Automation)
**GitHub:** https://github.com/DvwN-Lee/exam-platform

#### 프로젝트 개요

Legacy 온라인 시험 시스템(Django 2.1/Python 3.6/jQuery)을 Django 5.2 LTS + React 19 Full-Stack으로 완전 재작성한 프로젝트입니다. TDD 방법론을 적용하여 Backend 303개 테스트(92% 커버리지)를 달성하고, Service Layer Pattern 도입으로 비즈니스 로직과 View를 분리했습니다.

#### 주요 구현 사항

**1. Legacy 시스템 Full-Stack 마이그레이션**

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

**4. N+1 쿼리 최적화**

- Django Debug Toolbar로 ORM 쿼리 실행 분석
- `select_related` / `prefetch_related` 적용으로 시험 목록 조회 시 Database 접근 횟수 70% 감소 (10회 → 3회)
- Composite Index 전략: `exam_state_idx`, `exam_time_range_idx`, `student_exam_lookup_idx`

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

#### 기술 스택

| 영역 | 기술 |
|------|------|
| Backend | Django 5.2 LTS, DRF, Python 3.14 (uv) |
| Frontend | React 19, TypeScript, TanStack Query 5.90, TanStack Router 1.141, Zustand 5.0, shadcn/ui, Tailwind CSS 4.1 |
| Database | PostgreSQL, MongoDB, Redis |
| Testing | pytest (Unit/Integration), Playwright (E2E), Factory Boy, Vitest, MSW |
| Infrastructure | Docker Compose, GitHub Actions CI, Terraform (GCP), Helm, ArgoCD |
| Auth | JWT (HttpOnly Cookie), RBAC |

#### 핵심 학습

- TDD Red-Green-Refactor 사이클을 통한 테스트 주도 개발 방법론 체득
- Service Layer Pattern으로 관심사 분리 및 N+1 쿼리 최적화 (DB 접근 70% 감소)
- Legacy 시스템 마이그레이션 전략 수립 및 완전 재작성 실행 경험
- JWT HttpOnly Cookie 기반 인증 + RBAC 이중 검증 보안 설계

---

### 3. Cloud-Native Microservice Platform v2.0

**기간:** 2025.10.26 ~ 2025.12.19
**역할:** 1인 프로젝트 (Infrastructure 설계 및 구축, Backend 개발)
**GitHub:** https://github.com/DvwN-Lee/Monitoring-v2

#### 프로젝트 개요

Solid Cloud(CloudStack) 환경에서 Terraform 기반 Infrastructure 자동화와 GitOps 배포 파이프라인을 구축한 Cloud-Native 플랫폼입니다. Istio Service Mesh로 서비스 간 보안 통신을 구현하고, Prometheus/Grafana/Loki 통합 관측성 시스템을 구축했습니다. k6 부하 테스트 기반 HPA 튜닝으로 안정적인 트래픽 처리를 달성했습니다.

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

**5. 성능 최적화 (k6 부하 테스트 기반 HPA 튜닝)**

- k6 부하 테스트 시나리오 작성 및 실행 (100 VU, 10분)
- CPU 사용률 기반 HPA(`targetCPUUtilizationPercentage: 70`) 임계값 튜닝
- **테스트 결과:** Grafana 정상 트래픽 실측 P95 9.77ms / P99 19.8ms, k6 부하 테스트(100 VU) P95 74.76ms / 에러율 0.01%
- **HPA 튜닝 효과:** P99 Latency 94% 감소 (3.71s → 238ms), 5xx 에러율 99.1% 감소 (0.460% → 0.004%)

**6. 아키텍처 결정 기록 (ADR)**

- ADR 10건 작성: Istio vs Linkerd 선택, Kustomize vs Helm 비교, HPA 임계값 설정 근거 등 아키텍처 결정 배경 및 Trade-off 문서화

#### 기술 스택

| 영역 | 기술 |
|------|------|
| Infrastructure | Terraform, Kubernetes, Kustomize |
| CI/CD | GitHub Actions, Argo CD, Trivy |
| Service Mesh | Istio (mTLS STRICT, VirtualService, DestinationRule) |
| Observability | Prometheus, Grafana, Loki, Kiali |
| Backend | Go (API Gateway), Python FastAPI (Auth/Blog/User) |
| Database | PostgreSQL, Redis |
| Performance | k6 (부하 테스트) |

#### 핵심 학습

- IaC를 통한 재현 가능한 Infrastructure 구축 및 Terraform State 관리
- GitOps 기반 선언적 배포: Argo CD + Kustomize 연동으로 환경별 배포 일관성 확보
- Istio Service Mesh: mTLS, Kiali 시각화를 통한 MSA 보안 및 Observability 강화
- Golden Signals 기반 모니터링 체계 구축 및 k6 부하 테스트 기반 데이터 기반 성능 최적화

---

### 4. Kubernetes CI/CD Infrastructure

**기간:** 2025.11.27 ~ 2025.11.30
**역할:** 1인 프로젝트 (Infrastructure 설계 및 구축)
**GitHub:** https://github.com/DvwN-Lee/k8s-cicd-automation

#### 프로젝트 개요

CloudStack 환경에서 Terraform과 Ansible을 조합하여 Kubernetes Cluster를 자동으로 구축하고, Jenkins, GitLab, Docker Registry를 배포하여 Git Push to Deploy 파이프라인을 구현한 IaC 프로젝트입니다. 수동으로 2시간 이상 소요되던 Cluster 구축을 15분으로 단축했습니다.

#### 주요 구현 사항

**1. IaC 파이프라인 (Terraform → Ansible)**

- Terraform으로 CloudStack 인프라(VM 3대, Network, Port Forwarding 규칙) 코드화
- VM 프로비저닝 완료 후 Ansible Inventory 파일을 자동 생성하여 구성 관리 단계로 seamless 전달
- Terraform(인프라 프로비저닝) + Ansible(소프트웨어 구성 관리)의 역할 분리로 각 도구의 강점 활용

**2. Kubernetes Cluster 자동화 (Ansible Playbook)**

- containerd v1.7.2 런타임, Kubernetes v1.28.15, Cilium CNI v1.14.5, MetalLB v0.13.12 순차 설치 자동화
- kubeadm init/join, kubelet 설정, CNI 플러그인 설치 전 과정을 멱등성 있게 구현
- 구축 시간 단축: 수동 2시간 이상 → Terraform+Ansible 15분 (87.5% 감소)

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
| IaC | Terraform (CloudStack Provider), Ansible (Roles 기반) |
| Container Platform | Kubernetes v1.28.15, containerd v1.7.2 |
| Networking | Cilium v1.14.5 (CNI), MetalLB v0.13.12 (L2 LoadBalancer) |
| CI/CD | Jenkins, GitLab CE, Docker Registry |
| Cloud | CloudStack (Solid Cloud) |

#### 핵심 학습

- Terraform과 Ansible을 연계한 자동화된 Infrastructure Provisioning 파이프라인 설계
- kubeadm 기반 Kubernetes Cluster 수동 구축 및 트러블슈팅 경험
- Cilium eBPF 기반 CNI와 MetalLB LoadBalancer 구성 방법 습득
- Jenkins Pipeline Groovy DSL을 통한 CI/CD 자동화

---

### 5. 실시간 Microservice Monitoring Platform v1.0

**기간:** 2025.09.02 ~ 2025.09.27
**역할:** 1인 프로젝트 (Architecture 설계, Backend 개발)
**GitHub:** https://github.com/DvwN-Lee/Monitoring

#### 프로젝트 개요

Go와 Python(FastAPI)을 활용한 폴리글랏 마이크로서비스 기반 실시간 모니터링 대시보드입니다. Go로 API Gateway와 Stats Aggregator를 구현하여 100 RPS 이상의 트래픽을 안정적으로 처리하고, Kustomize로 Kubernetes 환경별 배포를 관리합니다. 이 프로젝트는 v2.0의 기반이 되었으며, v2.0에서 커스텀 컴포넌트를 Istio Service Mesh로 대체하고 GitOps 파이프라인을 추가했습니다.

#### 주요 구현 사항

**1. Go 기반 커스텀 컴포넌트**

- **API Gateway:** 경로 기반 라우팅(Path-based Routing)으로 `/login` → Auth 서비스, `/posts` → Blog 서비스 분산 처리
- **Stats Aggregator / Reverse Proxy:** 각 마이크로서비스로 요청을 프록시하면서 RPS, 평균 응답 시간, 에러율을 병렬로 수집 및 집계
- 2초 타임아웃 설정으로 특정 서비스 장애가 전체 시스템으로 전파되는 것을 차단 (Circuit Breaker 패턴)
- Go 고루틴(Goroutine)으로 여러 서비스의 통계를 동시에 수집하여 100 RPS 이상 안정적 처리

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
| Backend | Go (API Gateway, Stats Aggregator), Python 3.x FastAPI (Auth/Blog/User) |
| Frontend | Vanilla JavaScript, Chart.js, WebSocket |
| Orchestration | Kubernetes, Kustomize (base/overlay) |
| Database | SQLite (서비스별 독립), Redis (Cache-Aside) |

#### 핵심 학습

- Go 고루틴 기반 비동기 처리 및 커스텀 Reverse Proxy/Stats Aggregator 설계 경험
- 경로 기반 라우팅으로 마이크로서비스 트래픽을 분산하는 API Gateway 패턴 구현
- Kustomize base/overlay를 활용한 환경별 Kubernetes Manifest 관리
- 폴리글랏 마이크로서비스 아키텍처 (Go + Python FastAPI) 설계 및 서비스 간 통신 구현

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

단국대학교 도산라운지 좌석 예약 및 관리 Android 앱입니다. Firebase BaaS를 활용하여 Serverless Architecture로 빠르게 프로토타이핑하고, 해커톤 48시간 내에 MVP를 완성하여 동상을 수상했습니다.

#### 주요 구현 사항

**1. Firebase Serverless 아키텍처**

- Firestore NoSQL 데이터베이스로 좌석 정보, 예약 내역, 사용자 데이터 실시간 동기화
- Firebase Authentication으로 Google 로그인 구현, 사용자 인증 간소화
- Firestore Realtime Listener로 좌석 상태 변경을 실시간으로 UI에 반영

**2. 중복 예약 방지**

- Firestore 문서의 예약 상태(`isReserved` 필드)를 확인한 후 예약 처리하여 중복 예약 차단
- 예약된 좌석은 Realtime Listener를 통해 즉시 비활성화되어 다른 사용자가 선택 불가 처리

**3. 게이미피케이션 - 학습 시간 기반 실시간 랭킹**

- 공부 시간 측정 타이머 기능 구현
- Firestore Realtime Listener로 학습 시간 집계 및 랭킹 변화 실시간 반영
- 해커톤 심사위원에게 게이미피케이션 요소가 긍정적 평가를 받아 수상에 기여

**4. Hackathon 협업**

- 48시간 동안 팀원 4명과 역할 분담: 기획 / Figma 디자인 / Android 개발 / 발표
- Figma로 UI/UX 디자인 완성 후 Android 개발 진행하여 디자인-개발 일관성 유지
- Feature Branch 전략으로 팀원 간 코드 충돌 최소화

#### 기술 스택

**Mobile:** Android, Kotlin
**Backend (BaaS):** Firebase (Firestore, Authentication)
**Design:** Figma

---

## 기술 스택

### Infrastructure & DevOps

| 분류 | 기술 |
|------|------|
| Container & Orchestration | Kubernetes (k8s, k3s), Docker, Helm, Kustomize, containerd |
| IaC & GitOps | Terraform, Ansible, Argo CD, GitHub Actions, Jenkins, GitLab |
| Service Mesh & Networking | Istio, Cilium (eBPF), MetalLB |
| Observability | Prometheus, Grafana, Loki, Kiali |
| Security | Trivy, NetworkPolicy, mTLS, IAP, Shielded VM |
| Testing & Performance | Playwright, Terratest, k6, pytest |

### Backend Development

| 분류 | 기술 |
|------|------|
| Languages | Go, Python, Java, TypeScript |
| Frameworks | FastAPI, Django, Spring Boot, React 19 |
| Database | PostgreSQL, MySQL, Redis, SQLite, MongoDB |
| API & Protocols | RESTful API, WebSocket (STOMP), gRPC |

### Cloud & Platform

| 분류 | 기술 |
|------|------|
| Cloud | GCP (Compute Engine, VPC, MIG, IAP, Secret Manager), CloudStack |
| OS | Linux (Ubuntu, CentOS) |
| Tools | Git, Docker Compose, Skaffold, uv |

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
