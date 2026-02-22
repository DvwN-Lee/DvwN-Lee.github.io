# 자기소개서: DevOps/Backend Engineer

## 헤드라인

"GitOps 파이프라인으로 배포를 5분 이내로 자동화하고, k6 부하 테스트 기반 P95 Latency 74.76ms를 달성한 DevOps/Backend 엔지니어입니다. Kubernetes부터 Spring Boot까지, 인프라와 애플리케이션 전 영역에서 안정성과 효율성을 추구합니다." (목표 및 지향점 강조, 야망을 표현, 달성하고자 하는 목표를 명시)

---

## 1. 자기소개

### DevOps와 Backend 개발, 두 영역의 시너지

자동화를 통해 안정적이고 효율적인 시스템을 구축하는 것이 DevOps의 핵심이라고 생각합니다. 저는 Backend 개발 경험(Django, Spring Boot, FastAPI)을 바탕으로 DevOps 영역으로 진출하여, 개발자의 관점에서 운영 자동화를 설계했습니다.

단국대학교 재학 중 Solid Cloud(CloudStack) 환경에서 Kubernetes 클러스터를 직접 구축하며, Linux 커널 수준의 네트워크(Cilium eBPF)부터 애플리케이션 레벨의 트래픽 제어(Istio Service Mesh)까지 학습했습니다. 특히 Backend 애플리케이션을 직접 개발한 경험이 있기에, 개발자가 겪는 배포 과정의 불편함을 이해하고 이를 자동화할 수 있었습니다.

### 기술 커뮤니케이션 역량

1년 6개월간의 코딩 교육 강사 활동(D-Lab, 로보그램)과 교내 스터디 리더 경험을 통해, 비전공자나 비개발 직군에게도 기술적 제약사항과 시스템 구조를 명확히 설명하는 능력을 길렀습니다. C언어 포인터 개념, Python 알고리즘 최적화, Web 프레임워크 설계 등을 가르치며, 복잡한 기술을 단순하게 전달하는 방법을 익힐 수 있었습니다.

기술적 깊이와 소통 능력을 바탕으로 개발팀과 운영팀 사이의 협업을 원활하게 하는 DevOps 문화를 정착시키겠습니다.

---

## 2. 핵심 역량

### Infrastructure as Code 및 GitOps 기반 자동화

- **Terraform + Ansible:** CloudStack 인프라 프로비저닝 및 Kubernetes 클러스터 구성 자동화 (수동 2시간 → 15분)
- **GitHub Actions + Argo CD:** GitOps 파이프라인으로 Git Push 후 5분 내 자동 배포
- **Trivy 보안 스캔:** CI 파이프라인에 통합하여 컨테이너 취약점 자동 탐지
- **k6 부하 테스트:** CPU 사용률 기반 HPA 튜닝으로 안정적 처리 달성 (P95 74.76ms, 100 VU)

### Service Mesh 및 Zero Trust Security

- **Istio mTLS STRICT + NetworkPolicy:** Zero Trust Network 구현, 서비스 간 암호화 통신 및 네트워크 격리
- **Kiali:** 서비스 간 통신 흐름 시각화 및 트래픽 패턴 분석
- **VirtualService/DestinationRule:** Canary 배포, Blue/Green 배포 등 다양한 배포 전략 구현

### Observability 및 Troubleshooting

- **Prometheus + Grafana:** Golden Signals(Latency, Traffic, Errors, Saturation) 기반 모니터링 대시보드 구축
- **Loki + Promtail:** 중앙 로깅 시스템으로 서비스 로그 통합 관리 및 LogQL 기반 분석
- **CPU 기반 HPA:** CPU 사용률(임계값 70%) 기반 오토스케일링으로 트래픽 증가 시 자동 스케일아웃 구성
- **트러블슈팅:** 컨테이너 로그, Kubernetes Events, 네트워크 레이어 심층 분석

### Backend Development 및 API 설계

- **Django:** RBAC 시스템 설계, ORM 쿼리 최적화 (N+1 Query 해결로 쿼리 수 90% 감소)
- **Spring Boot:** WebSocket 실시간 통신, STOMP Pub/Sub 패턴, SockJS Fallback 구현
- **FastAPI:** 비동기 I/O 기반 고성능 API, Redis Cache-Aside 패턴 적용
- **Go:** 고루틴 기반 로드밸런서 및 Stats Aggregator 개발 (100 RPS 안정 처리)

### Technical Communication 및 Documentation

- **강사 및 멘토 활동:** C언어, Python 알고리즘을 가르치며 기술 커뮤니케이션 역량 강화
- **협업 리더십 (UMC):** 코드 리뷰 역량 향상 및 팀원 기술 성장 지원
- **기술 문서 작성:** ADR 10건 작성, 아키텍처 결정 배경 및 Trade-off 문서화

---

## 3. 주요 프로젝트 경험

### Cloud-Native 마이크로서비스 플랫폼 v2.0

**기간:** 2025.09 ~ 2025.11
**역할:** 1인 프로젝트 (인프라 설계, 구축, 백엔드 개발)
**기술 스택:** Kubernetes, Terraform, Argo CD, Istio, Prometheus, Grafana, Loki, Kustomize, Go, Python (FastAPI)
**GitHub:** https://github.com/DvwN-Lee/Monitoring-v2

#### 프로젝트 개요

Solid Cloud(CloudStack) 환경에서 Terraform을 활용한 인프라 자동화 및 GitOps 기반 완전 자동화된 마이크로서비스 플랫폼을 구축했습니다. 실제 운영 환경을 가정하여 보안, 관측성, 성능을 모두 고려한 Production-Ready 시스템을 설계했습니다.

#### 주요 성과

**1. 인프라 자동화 (Infrastructure as Code)**

- Terraform으로 CloudStack 인프라를 코드화하여 VM 프로비저닝, 네트워크 설정, 포트 포워딩을 자동화했습니다.
- Kustomize base/overlay 패턴으로 개발/운영 환경별 설정을 분리하여 환경별 차이를 선언적으로 관리했습니다.
- Terraform State를 Git으로 관리하지 않고 별도 백엔드에 저장하여 동시 작업 시 충돌을 방지했습니다.

**2. CI/CD 파이프라인 (GitOps)**

- GitHub Actions + Argo CD 기반 GitOps 파이프라인으로 Git Push 후 5분 내 자동 배포를 달성했습니다.
- CI 단계: 소스 코드 빌드 → Docker 이미지 생성 → Trivy 보안 스캔 → 컨테이너 레지스트리 Push
- CD 단계: Argo CD가 Git Repository 변경 감지 → Kustomize Build → Kubernetes Apply
- CI 파이프라인에 Trivy 보안 스캔을 통합하여 빌드 단계에서 HIGH 이상 컨테이너 취약점 발견 시 빌드를 실패시켜 취약한 이미지의 배포를 원천 차단했습니다.

**3. Service Mesh 및 보안 (Zero Trust)**

- Istio Service Mesh의 mTLS STRICT 모드를 적용하여 모든 서비스 간 통신을 TLS로 암호화했습니다.
- NetworkPolicy를 적용하여 네임스페이스 수준의 네트워크 격리를 구현했습니다. 예를 들어, Backend 네임스페이스는 Frontend만 접근 가능하도록 제한했습니다.
- VirtualService와 DestinationRule을 활용하여 트래픽 라우팅, 재시도, 타임아웃 정책을 구현했습니다.

**4. 관측성 시스템 (Observability)**

- Prometheus + ServiceMonitor/PodMonitor로 마이크로서비스 메트릭을 자동 수집했습니다.
- Grafana에서 Golden Signals(Latency, Traffic, Errors, Saturation) 기반 대시보드를 구축하여 시스템 상태를 실시간으로 모니터링했습니다.
- Loki + Promtail로 중앙 로깅 시스템을 구축하여 여러 Pod의 로그를 통합 관리하고, Grafana LogQL로 신속한 로그 검색을 수행했습니다.
- 부하 테스트(100 VU, 10분) 결과 P95 Latency 74.76ms, 에러율 0.01%를 달성했습니다.

**5. 성능 최적화 (Performance Tuning)**

- k6 부하 테스트(100 VU, 10분)를 수행하여 시스템 병목을 정량적으로 분석했습니다.
- CPU 사용률 기반 HPA(`targetCPUUtilizationPercentage: 70`)를 구성하여 트래픽 증가에 따른 자동 스케일아웃을 달성했습니다.
- 부하 테스트 기준 P95 Latency 74.76ms, 에러율 0.01%를 달성했습니다.

#### 기술적 도전 및 해결 과정

**문제 1: Istio Sidecar Injection 이슈**

- **상황:** 특정 Pod에서 Istio Sidecar가 자동 주입되지 않아 Service Mesh에 연결되지 않는 문제가 발생했습니다.
- **원인 분석:** Namespace에 `istio-injection=enabled` 라벨이 있어도, Pod의 Annotation이나 SecurityContext 설정으로 인해 Sidecar 주입이 차단되는 경우가 있었습니다.
- **해결:** `kubectl describe pod`로 이벤트를 확인하고, Pod Template에 `sidecar.istio.io/inject: "true"` Annotation을 명시적으로 추가했습니다. 또한 `istioctl analyze`로 Istio 설정 오류를 사전 점검하는 프로세스를 추가했습니다.
- **결과:** 모든 Pod에 Sidecar가 정상 주입되어 Service Mesh에 연결되었으며, mTLS 통신이 정상 작동했습니다.

**문제 2: HPA 임계값 설정**

- **상황:** 부하 테스트 중 트래픽 증가 시 Pod가 즉시 스케일아웃되지 않아 순간적으로 응답 시간이 상승하는 현상이 발생했습니다.
- **원인 분석:** HPA의 기본 CPU 임계값이 높아, 실제로 Pod가 포화 상태에 도달하기 전까지 스케일아웃이 트리거되지 않았습니다.
- **해결:** `targetCPUUtilizationPercentage: 70`으로 임계값을 조정하여, CPU 사용률이 70%에 도달하면 스케일아웃이 트리거되도록 구성했습니다.
- **결과:** k6 부하 테스트(100 VU, 10분) 기준 P95 Latency 74.76ms, 에러율 0.01%를 안정적으로 달성했습니다.

**문제 3: Terraform State Drift**

- **상황:** Terraform으로 인프라를 관리하던 중, 수동으로 리소스를 변경하여 Terraform State와 실제 인프라 상태가 불일치하는 문제가 발생했습니다.
- **원인 분석:** CloudStack UI에서 VM 리소스를 직접 수정하여 Terraform이 인식하지 못한 변경 사항이 발생했습니다.
- **해결:** `terraform plan`으로 Drift를 감지하고, `terraform apply`로 실제 인프라를 Terraform State와 동기화했습니다. 이후 모든 인프라 변경은 Terraform을 통해서만 수행하도록 팀 규칙을 수립했습니다.
- **결과:** 인프라 변경 이력이 Git으로 추적 가능해졌으며, 인프라 상태가 일관되게 유지되었습니다.

#### 아키텍처 결정 배경

- **Istio vs Linkerd:** VirtualService/DestinationRule 기반 세밀한 트래픽 제어와 Canary/Blue-Green 배포 전략 구현을 위해 Istio 선택
- **Kustomize vs Helm:** YAML Overlay 방식의 간결한 선언적 관리, Argo CD 통합 간편성으로 Kustomize 선택
- **Prometheus:** Pull 기반 메트릭 수집, ServiceMonitor/PodMonitor 자동 수집, 오픈소스 비용 절감

---

### Kubernetes CI/CD Infrastructure

**기간:** 2024
**역할:** 1인 프로젝트 (인프라 설계 및 구축)
**기술 스택:** Terraform, Ansible, Kubernetes v1.28.15, Cilium CNI, MetalLB, Jenkins, GitLab, Docker Registry
**GitHub:** https://github.com/DvwN-Lee/k8s-cicd-automation

#### 프로젝트 개요

CloudStack 환경에서 Terraform과 Ansible을 활용하여 Kubernetes 클러스터를 완전 자동으로 구축하고, Jenkins, GitLab, Docker Registry를 배포하여 Git Push to Deploy 파이프라인을 구현했습니다. 수동 설치 시 2시간 이상 소요되는 클러스터 구축을 15분으로 단축했습니다.

#### 주요 성과

**1. Infrastructure as Code (Terraform + Ansible 조합)**

- Terraform으로 CloudStack 인프라(VM 3대, Network, Port Forwarding)를 코드화하고, 프로비저닝과 동시에 Ansible Inventory를 자동 생성했습니다.
- Terraform은 인프라 프로비저닝에 특화되어 있고, Ansible은 소프트웨어 구성 관리에 특화되어 있어 두 도구를 조합하여 각각의 장점을 활용했습니다.
- Terraform으로 VM 생성 → Ansible Inventory 자동 생성 → Ansible Playbook으로 Kubernetes 설치 및 설정을 파이프라인화했습니다.

**2. Kubernetes 클러스터 자동화**

- Ansible Playbook으로 containerd 런타임, Kubernetes v1.28.15, Cilium CNI, MetalLB 로드밸런서를 멱등성 있게 설치했습니다.
- 수동 설치 시 2시간 이상 소요되던 클러스터 구축을 15분으로 단축하여 87.5%의 시간 절감 효과를 달성했습니다.
- kubeadm init/join, kubelet 설정, CNI 플러그인 설치 등 모든 과정을 자동화하여 사람의 실수를 제거했습니다.

**3. CI/CD 파이프라인 구축**

- Jenkins + GitLab + Docker Registry 기반 Git Push to Deploy 파이프라인을 구축했습니다.
- GitLab에 소스 코드 Push → Jenkins가 자동 빌드 → Docker 이미지 생성 및 Registry에 Push → Kubernetes에 자동 배포
- Jenkins Pipeline을 Groovy DSL로 작성하여 빌드, 테스트, 배포 단계를 선언적으로 정의했습니다.

**4. 워크로드 격리 및 리소스 최적화**

- DevOps Node(GitLab/Jenkins/Registry)와 App Node(애플리케이션 워크로드)를 분리하여 리소스 경합을 방지했습니다.
- Node Selector(`kubernetes.io/hostname`)를 활용하여 Jenkins, GitLab, Docker Registry가 지정된 Node에서만 실행되도록 제어했습니다.
- DevOps 도구들은 리소스 사용량이 많기 때문에, 애플리케이션과 분리하여 안정적인 CI/CD 환경을 유지했습니다.

---

### 실시간 마이크로서비스 모니터링 플랫폼 v1.0

**기간:** 2025.08
**역할:** 1인 프로젝트 (아키텍처 설계, 백엔드 개발)
**기술 스택:** Go, Python (FastAPI), Kubernetes, Kustomize, Redis, SQLite, WebSocket
**GitHub:** https://github.com/DvwN-Lee/Monitoring

#### 프로젝트 개요

Go와 Python(FastAPI)을 활용한 폴리글랏 마이크로서비스 아키텍처 기반 실시간 모니터링 대시보드입니다. Go 고루틴 기반 커스텀 로드밸런서를 개발하여 100 RPS 이상의 트래픽을 안정적으로 처리했습니다. 이 프로젝트는 v2.0으로 발전하여 Istio Service Mesh와 GitOps 파이프라인을 추가한 Production-Ready 시스템으로 확장되었습니다.

#### 주요 성과

**1. Go 고루틴 기반 커스텀 컴포넌트 개발**

- Go 고루틴(Goroutine)을 활용한 커스텀 Reverse Proxy와 Stats Aggregator를 개발하여 100 RPS 이상의 트래픽을 안정적으로 처리했습니다.
- 경로 기반 라우팅(Path-based Routing)으로 `/login` → Auth 서비스, `/posts` → Blog 서비스 등 요청을 각 마이크로서비스로 분산했습니다.
- 2초 타임아웃을 설정하여 특정 서비스의 지연이 전체 시스템으로 전파되는 것을 차단했습니다 (Circuit Breaker 패턴).
- Stats Aggregator로 각 서비스의 RPS, 평균 응답 시간, 에러율을 실시간으로 수집하고 집계했습니다.

**2. 마이크로서비스 설계 및 FastAPI 구현**

- Auth, User, Blog 3개의 마이크로서비스를 FastAPI로 구현하고, RESTful API를 설계했습니다.
- Redis Cache-Aside 패턴을 적용하여 자주 조회되는 데이터를 캐싱하고, 응답 속도를 개선했습니다.
- SQLite를 사용하여 각 서비스의 데이터를 독립적으로 관리했습니다 (Database per Service 패턴).

**3. Kustomize 환경별 설정 관리**

- Kustomize base/overlay 패턴으로 개발/운영 환경별 Kubernetes 매니페스트를 선언적으로 관리했습니다.
- Base: 공통 설정 (Deployment, Service, ConfigMap), Overlay: 환경별 차이 (Replica 수, Resource Limits)

**4. 실시간 대시보드 (WebSocket)**

- Vanilla JavaScript + Chart.js + WebSocket으로 RPS, 평균 응답 시간, 서비스 상태를 실시간으로 시각화했습니다.
- WebSocket으로 1초마다 Stats Aggregator로부터 메트릭을 수신하여 대시보드를 업데이트했습니다.

#### v1.0에서 v2.0으로의 발전

v1.0 프로젝트는 Cloud-Native v2.0으로 발전했습니다. 커스텀 로드밸런서를 Istio Service Mesh로 대체하여 mTLS와 트래픽 제어를 확보했고, Argo CD 기반 GitOps 파이프라인과 Prometheus/Grafana/Loki 관측성 시스템을 추가했습니다.

---

### Dorazy - 도서관 예약 시스템 (해커톤 동상 수상)

**기간:** 2022.08
**역할:** Android 개발 및 Backend (Firebase), 팀 리더 (4인 팀)
**기술 스택:** Android, Kotlin, Firebase (Firestore, Authentication), Figma
**성과:** 경소톤 해커톤 동상 수상
**GitHub:** https://github.com/kimyeonhong00/dorazy

#### 프로젝트 개요

단국대학교 도산라운지 좌석 예약 및 관리 앱으로, 공간 이용 활성화를 목표로 기획부터 개발까지 주도했습니다. 해커톤 48시간 동안 팀 리더로서 기획, 디자인, 개발, 발표를 총괄하여 동상을 수상했습니다.

#### 주요 성과

**1. Firebase 서버리스 아키텍처**

- Firebase BaaS를 활용하여 백엔드 서버 없이 빠른 프로토타이핑을 수행했습니다.
- Firestore NoSQL 데이터베이스로 좌석 정보, 예약 내역, 사용자 데이터를 실시간으로 동기화했습니다.
- Firebase Authentication으로 Google 로그인을 구현하여 사용자 인증을 간소화했습니다.

**2. 동시성 제어 (Concurrency Control)**

- **문제 상황:** 동일한 좌석에 대한 중복 예약을 방지해야 했습니다.
- **해결 방법:** Firestore 문서의 예약 상태(`isReserved` 필드)를 실시간으로 확인한 후 예약 처리하여 중복 예약을 차단했습니다. Firestore Realtime Listener를 통해 좌석 상태 변경을 즉시 UI에 반영했습니다.
- **결과:** 예약된 좌석은 즉시 비활성화되어 다른 사용자가 선택할 수 없도록 처리했습니다.

**3. 게이미피케이션 (Gamification)**

- 학습 시간 기반 실시간 랭킹 시스템을 도입하여 사용자 참여를 유도했습니다.
- Firestore Realtime Listener를 활용하여 랭킹 변화를 실시간으로 반영했습니다.
- 해커톤 발표에서 이 기능이 심사위원들에게 긍정적인 평가를 받았습니다.

**4. 해커톤 협업 및 빠른 프로토타이핑**

- 48시간 동안 팀원 4명과 역할 분담(기획, 디자인, Android 개발, 발표)을 통해 MVP를 완성했습니다.
- Figma로 UI/UX 디자인을 먼저 완성하고, Android 개발은 디자인을 기반으로 진행하여 일관성을 유지했습니다.
- Git을 활용하여 팀원 간 코드 충돌을 최소화하고, Feature Branch 전략으로 협업했습니다.

#### Firebase 서버리스 아키텍처의 장단점

**장점:**
- 백엔드 서버 구축 없이 빠르게 프로토타이핑 가능
- 실시간 데이터 동기화 기능 제공
- 인증, 데이터베이스, 스토리지, Functions 등 All-in-One 솔루션

**단점:**
- Firebase 종속성 증가 (Vendor Lock-in)
- 복잡한 비즈니스 로직 구현 시 제약
- 비용 예측이 어려움 (사용량 기반 과금)

**DevOps 관점:** Firebase 서버리스 아키텍처 경험을 통해 이후 Kubernetes Serverless(Knative), FaaS 패턴 설계 시 인사이트를 확보했습니다.

---

### 온라인 시험 관리 시스템 (Django Fullstack)

**기간:** 2023.06
**역할:** Fullstack 개발 (1인 프로젝트)
**기술 스택:** Django, MySQL, Django ORM, jQuery, Bootstrap, Django Admin
**GitHub:** https://github.com/DvwN-Lee/onlineexam

#### 프로젝트 개요

Django 프레임워크를 활용한 풀스택 웹 애플리케이션으로, 온라인 시험 출제, 응시, 채점 시스템을 구현했습니다. 관리자, 교사, 학생 3가지 역할에 따른 RBAC(Role-Based Access Control) 시스템을 설계하여 복잡한 도메인 로직을 처리했습니다.

#### 주요 성과

**1. 역할 기반 사용자 모델 설계**

- 관리자, 교사, 학생 3가지 역할을 가진 사용자 모델을 Django ORM으로 설계했습니다.
- 관리자: 사용자 관리, 전체 시험지 관리, 시스템 설정
- 교사: 문제 출제, 시험지 생성, 학생 성적 확인
- 학생: 시험 응시, 성적 조회
- Django의 `user_type` 필드로 역할을 구분하고, Django Admin을 통해 사용자 및 권한 관리 기능을 제공했습니다.

**2. 복잡한 도메인 모델링**

- 사용자(User), 문제(Question), 시험지(Exam), 응시(Submission) 4가지 핵심 모델로 구성된 복잡한 도메인을 설계했습니다.
- 문제 유형: 객관식, 주관식, OX 등 다양한 유형을 지원하고, Polymorphic 패턴으로 설계했습니다.
- 시험지와 문제는 Many-to-Many 관계로 설계하여 하나의 문제를 여러 시험지에서 재사용 가능하도록 구현했습니다.

**3. Django 모델 설계 및 관계 정의**

- 사용자(User), 문제(Question), 시험지(Exam), 응시(Submission) 4가지 핵심 모델을 Django ORM으로 정의했습니다.
- 시험지와 문제는 ManyToManyField 관계로 설계하여 하나의 문제를 여러 시험지에서 재사용 가능하도록 구현했습니다.
- MySQL InnoDB 엔진을 백엔드로 사용하여 트랜잭션 기반 데이터 무결성을 확보했습니다.

**4. Django Admin 커스터마이징**

- Django Admin 인터페이스를 커스터마이징하여 관리자가 GUI로 시스템을 운영할 수 있도록 구현했습니다.
- Custom Admin Actions를 추가하여 여러 시험지를 한 번에 활성화/비활성화하는 기능을 구현했습니다.
- Inline Admin을 활용하여 시험지 생성 시 문제를 동시에 추가할 수 있도록 UX를 개선했습니다.

#### 기술적 도전 및 해결 과정

**문제 1: 주관식 문제 채점 흐름 설계**

- **상황:** 주관식 문제는 자동 채점이 불가능하므로 교사가 수동으로 채점해야 했습니다.
- **해결:** Django Admin 인터페이스를 통해 교사가 학생의 응시 내역을 조회하고 점수를 직접 입력할 수 있도록 Submission 모델을 Admin에 등록했습니다.

**문제 2: 객관식 자동 채점 로직**

- **상황:** 학생이 시험을 제출하면 객관식 문제에 대한 채점 결과를 즉시 확인해야 했습니다.
- **해결:** Submission 모델에 정답 비교 로직을 구현하여 객관식 문제의 채점 결과를 저장하고, Django Admin에서 집계 결과를 확인할 수 있도록 구성했습니다.


---

### SimpleChat - 실시간 채팅 애플리케이션

**기간:** 2023.05
**역할:** Backend 개발
**기술 스택:** Spring Boot, WebSocket, JPA, Thymeleaf, MySQL
**GitHub:** https://github.com/DvwN-Lee/demochat

#### 프로젝트 개요

Spring Boot 환경에서 WebSocket 프로토콜을 활용한 실시간 양방향 메시징 시스템입니다. STOMP(Simple Text Oriented Messaging Protocol)를 활용하여 Pub/Sub 패턴을 구현하고, Spring Data JPA로 메시지 영속성을 확보했습니다.

#### 주요 구현 사항

**1. WebSocket + STOMP 아키텍처 설계**

- Spring WebSocket을 활용하여 `/ws` endpoint로 WebSocket 연결을 수립하고, STOMP를 통해 메시지를 주고받았습니다.
- SockJS Fallback을 적용하여 WebSocket을 지원하지 않는 브라우저에서도 실시간 통신이 가능하도록 구성했습니다.
- `/topic/public` destination을 구독하는 클라이언트들에게 메시지를 브로드캐스트하는 Pub/Sub 패턴을 구현했습니다.

**2. Spring Data JPA 메시지 영속성 설계**

- `Message` Entity를 설계하여 메시지 내용(`text`), 발신자 ID(`userId`), 발신자명(`username`), 타임스탬프(`timestamp`)를 저장했습니다.
- Spring Data JPA의 `JpaRepository`를 상속하여 메시지 저장 및 조회 기능을 구현했습니다.
- MySQL InnoDB 엔진을 백엔드로 사용하여 메시지 영속성을 확보했습니다.

**3. 채팅 메시지 이력 조회**

- 채팅방 입장 시 기존 메시지 이력을 `JpaRepository`의 `findAll()` 메서드로 조회하여 클라이언트에 전달했습니다.
- 메시지는 단일 테이블 구조(`id`, `text`, `userId`, `username`, `timestamp`)로 설계하여 조인 없이 단순 조회가 가능하도록 구성했습니다.

**4. Thymeleaf + JavaScript 실시간 UI 구현**

- Thymeleaf 템플릿 엔진으로 서버 사이드 렌더링(SSR)을 수행하고, JavaScript(SockJS + STOMP.js)로 클라이언트 사이드 WebSocket 연결을 처리했습니다.
- 메시지 수신 시 DOM 조작으로 채팅 UI에 동적으로 메시지를 추가하고, 자동 스크롤 기능을 구현했습니다.

---

## 4. 기술 스택

### Infrastructure & DevOps

**Container & Orchestration:** Kubernetes, Docker, Helm, Kustomize, containerd
**IaC & GitOps:** Terraform, Ansible, Argo CD, GitHub Actions, Jenkins, GitLab
**Service Mesh & Networking:** Istio, Cilium, MetalLB
**Monitoring & Observability:** Prometheus, Grafana, Loki, Kiali
**Security:** Trivy, NetworkPolicy, mTLS
**Performance Testing:** k6

### Backend Development

**Languages:** Go, Python
**Frameworks:** FastAPI, Django
**Database:** PostgreSQL, MySQL, Redis, SQLite
**API & Protocols:** RESTful API, WebSocket

### Cloud & Platform

**Cloud:** CloudStack (Solid Cloud), AWS
**OS:** Linux (Ubuntu, CentOS)
**Tools:** Git, Docker Compose, Skaffold

---

## 5. 성과 및 지표

### DevOps 프로젝트 성과

**Cloud-Native 마이크로서비스 플랫폼 v2.0**
- 배포 자동화: Git Push 후 5분 내 자동 배포
- 성능: k6 부하 테스트(100 VU, 10분) 기준 P95 Latency 74.76ms, 에러율 0.01%
- 보안: mTLS STRICT 모드, Trivy 자동 스캔, NetworkPolicy 적용
- HPA: CPU 사용률 기반 오토스케일링(임계값 70%) 구성
- 문서화: ADR 10건 작성, 운영 가이드 및 트러블슈팅 문서 완비

**Kubernetes CI/CD Infrastructure**
- 인프라 구축 시간: 수동 2시간 → Terraform+Ansible 15분 (87.5% 단축)
- CI/CD 통합: Jenkins + GitLab + Docker Registry 기반 Git Push to Deploy 파이프라인 구축

**실시간 마이크로서비스 모니터링 플랫폼**
- 성능: 100 RPS 안정적 처리
- 장애 격리: 2초 타임아웃으로 장애 전파 차단

### Backend 프로젝트 성과

**Django 온라인 시험 관리 시스템**
- 도메인 모델링: 사용자(역할 구분), 문제, 시험지, 응시 4가지 핵심 모델 설계
- Django Admin: 시험지 및 사용자 관리 인터페이스 커스터마이징

**Spring Boot SimpleChat**
- WebSocket + STOMP Pub/Sub 패턴으로 실시간 메시지 브로드캐스트 구현
- SockJS Fallback으로 WebSocket 미지원 브라우저 호환성 확보

**Dorazy 도서관 예약 앱 (해커톤)**
- 수상: 경소톤 해커톤 동상
- 개발 기간: 48시간 내 프로토타입 완성 및 배포
- Firebase 동시성 제어: Firestore 실시간 상태 확인으로 좌석 중복 예약 방지

---

## 6. 지원 동기 및 포부

### DevOps를 선택한 이유: Backend 개발에서 느낀 배포의 중요성

Backend 개발자로 Django와 Spring Boot 프로젝트를 진행하면서, 애플리케이션을 작성하는 것만큼 안정적으로 배포하고 운영하는 것이 중요하다는 것을 깨달았습니다. 코드가 완성되어도 배포 환경이 불안정하면 서비스 품질을 보장할 수 없었습니다.

SimpleChat 프로젝트에서 로컬 환경에서는 문제없이 동작하던 WebSocket 연결이 배포 환경에서 끊기는 문제를 겪었습니다. Nginx Reverse Proxy 설정과 WebSocket Upgrade 헤더를 이해하며, 인프라 레이어의 중요성을 체감했습니다. 이 경험이 Kubernetes, Service Mesh, Ingress Controller 등 인프라 기술을 학습하게 된 계기였습니다.

### Backend 경험이 DevOps에 미친 영향

Backend 개발 경험은 DevOps 업무에 명확한 이점을 제공했습니다.

- **애플리케이션 관점의 인프라 설계:** ORM N+1 Query 문제, Database Connection Pool 설정, Cache 전략 등을 이해하고 있기에, Kubernetes Resource Limits, HPA 설정, Redis Cache 구성 등을 애플리케이션 특성에 맞게 조정할 수 있었습니다.
- **개발자와의 원활한 소통:** Backend 개발자가 겪는 배포 과정의 불편함을 직접 경험했기에, CI/CD 파이프라인을 개발자 관점에서 설계할 수 있었습니다. GitHub Actions에서 Docker 이미지 빌드부터 Argo CD 배포까지 5분 이내로 자동화한 것도 이러한 이해에서 비롯되었습니다.
- **트러블슈팅 역량 강화:** 애플리케이션 로그, Database 쿼리, API 응답 시간 등을 분석하는 능력이 있어, Prometheus/Grafana로 수집한 메트릭을 해석하고 병목을 정확히 파악할 수 있었습니다.

### 단기 및 중기 성장 계획

**입사 후 기여하고 싶은 영역**

- **GitOps 파이프라인 구축 및 개선:** GitHub Actions, Argo CD, Flux 등을 활용하여 배포 자동화 파이프라인을 구축하고, 배포 시간을 단축하며 안정성을 확보하고 싶습니다. (GitOps 기술 스택 및 툴을 이용하여 배포 자동화 파이프라인을 구축하고, 배포 시간을 단축하며 안정성을 확보하고 싶습니다 등으로 추상적인 표현으로 수정)
- **Observability 시스템 강화:** Prometheus, Grafana, Loki를 활용하여 Golden Signals(Latency, Traffic, Errors, Saturation) 기반 모니터링 대시보드를 구성하고, 장애를 조기에 감지하고 싶습니다. (Observability 시스템을 구축하고, 장애를 조기에 감지하고 싶습니다 등으로 추상적인 표현으로 수정)
- **Infrastructure as Code 확산:** Terraform, Helm, Kustomize 등을 활용하여 인프라를 코드로 관리하고, 재현 가능한 환경을 구축하고 싶습니다. (Infrastructure as Code를 구축하고, 재현 가능한 환경을 구축하고 싶습니다 등으로 추상적인 표현으로 수정)

+ fullstack-devops 엔지니어로 성장하고 싶습니다와 같은 표현 추가

**기술 역량 확장 계획**

- **Kubernetes 전문성 강화:** CKA(Certified Kubernetes Administrator), CKAD(Certified Kubernetes Application Developer) 자격증을 취득하여 Kubernetes 운영 역량을 공식적으로 검증받고 싶습니다.
- **SRE(Site Reliability Engineering) 역량 확장:** Error Budget, SLO/SLI 기반 서비스 안정성 관리 방법론을 학습하고, 서비스 신뢰성을 정량적으로 측정하고 개선하고 싶습니다.
- **Cloud 플랫폼 경험 확대:** 현재 CloudStack 환경에서 쌓은 경험을 바탕으로, AWS/GCP/Azure 등 Public Cloud 환경에서의 인프라 구축 및 운영 경험을 확대하고 싶습니다.

### Fullstack-DevOps 시너지

Backend 개발과 DevOps 운영 경험을 결합하여, 애플리케이션 레이어부터 인프라 레이어까지 End-to-End로 문제를 해결할 수 있는 엔지니어가 되고 싶습니다.

- **애플리케이션 성능 최적화:** 애플리케이션 코드 수준의 최적화(ORM Query, Cache)와 인프라 수준의 최적화(HPA, Resource Limits, Node Affinity)를 결합하여 시스템 전체의 성능을 개선하고 싶습니다.
- **장애 대응 및 복구:** 애플리케이션 로그와 인프라 메트릭을 종합적으로 분석하여 장애 원인을 빠르게 파악하고, 근본 원인을 해결하고 싶습니다.
- **개발자 경험(DX) 개선:** 개발자가 배포 과정에서 겪는 불편함을 이해하고, CI/CD 파이프라인과 개발 환경을 개선하여 팀 전체의 생산성을 향상시킬 수 있습니다.

**측정하고, 자동화하고, 소통하는** 엔지니어가 되어 서비스 안정성과 팀 생산성을 모두 향상시키는 기여를 하고 싶습니다.

---

## 7. 학력 및 수상

**단국대학교 컴퓨터공학과**
2021.03 ~ 현재 (재학 중)

**수상 경력**
2022.08 - 경소톤 해커톤 동상 (Dorazy - 도서관 예약 시스템)

---

## 8. 연락처

**Email:** dongju101101@gmail.com
**GitHub:** https://github.com/DvwN-Lee
**Blog:** https://velog.io/@dvwn-lee
**Portfolio:** https://dvwn-lee.github.io
