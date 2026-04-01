# 이동주 - AI Agent Developer 포트폴리오

## 소개

LangGraph StateGraph와 MCP Protocol로 AI Agent를 설계하고, Prometheus 기반 LLM Serving Observability로 성능을 측정하는 AI Agent Developer입니다.

Backend(Django, FastAPI, Go) 개발 경험을 토대로 Cloud-Native Platform(Kubernetes, Terraform, Istio, ArgoCD)을 직접 설계하고 구현했으며, 이 인프라 역량을 기반으로 AI Agent 시스템의 배포, 관측, 품질 검증까지 엔드투엔드로 수행합니다.

**Email:** dongju101101@gmail.com
**GitHub:** https://github.com/DvwN-Lee
**Portfolio Site:** https://dvwn-lee.github.io

---

## 핵심 역량

### AI Agent Development

- **Agent Architecture:** LangGraph StateGraph 기반 상태 전이 및 도구 호출 선언적 관리
- **MCP Protocol:** FastMCP Streamable HTTP로 도구를 MCP 서버로 분리, Agent-도구 결합도 제거
- **RAG Pipeline:** Voyage AI 임베딩 + FAISS 벡터 검색, RAGAS faithfulness 기반 품질 검증
- **Agent Observability:** LangFuse v3 self-hosted tracing, 토큰 소비 및 도구 호출 패턴 추적
- **LLM Serving Metrics:** TTFT, TPS, TPOT, Queue Depth 등 LLM 전용 Prometheus 메트릭 설계

### Platform Engineering

- **IaC:** Terraform으로 GCP·CloudStack 인프라 전체를 코드로 관리, Ansible로 Kubernetes Cluster 구성 관리 자동화
- **GitOps:** ArgoCD App of Apps 패턴으로 인프라/애플리케이션 앱을 계층 구조로 선언적 관리, Kustomize base/overlay로 환경별 배포 분리
- **CI/CD Pipeline:** GitHub Actions `paths-filter` 기반 변경 서비스 선택적 빌드, 멀티 아키텍처(amd64/arm64) 이미지 빌드, Jenkins Groovy DSL Pipeline
- **Service Mesh:** Istio VirtualService/DestinationRule 트래픽 제어, Cilium CNI(eBPF 기반 kube-proxy 대체), MetalLB L2 LoadBalancer
- **Infrastructure Testing:** Terratest 7단계 검증 체계(Static → Plan Unit → Plan Deep Analysis → Network → Compute → Integration → Stack)로 인프라 신뢰성 자동 검증
- **Observability:** Prometheus + ServiceMonitor/PodMonitor 자동 메트릭 수집, Grafana Golden Signals Dashboard(Latency·Traffic·Errors·Saturation), Loki+Promtail 중앙 로깅

### Backend Development

- **Languages:** Go, Python, TypeScript
- **Frameworks:** FastAPI, Django, React 19
- **Database:** PostgreSQL, Redis, SQLite
- **API & Protocols:** RESTful API, WebSocket

---

## 프로젝트 로드맵

### [Evolution 1] Monitoring Platform의 진화: v1에서 v3까지

본 프로젝트 시리즈는 수동 구성 기반의 아키텍처에서 IaC, GitOps, 자동화된 검증 체계를 갖춘 클라우드 네이티브 플랫폼으로 진화해 온 과정을 담고 있습니다.

### Monitoring Platform 시리즈 (v1 → v2 → v3)

개인 학습 프로젝트로 단계적으로 발전시킨 Cloud-Native 플랫폼 시리즈입니다. 각 버전은 이전 버전에서 발견한 기술적 한계를 인식하고, 더 나은 플랫폼 구성 방식으로 개선한 결과입니다.

| 버전 | 기간 | 핵심 변화 | 인식한 한계 |
|------|------|-----------|-------------|
| **v1** | 2025.09 | Go 커스텀 컴포넌트(API Gateway, Stats Aggregator)로 MSA 패턴 직접 구현 | 커스텀 구현의 유지보수 비용, 프로덕션 수준 Service Mesh 기능 부재 |
| **v2** | 2025.09~12 | Istio Service Mesh로 대체 + ArgoCD GitOps 파이프라인 추가 | 온프레미스 환경 제약, 인프라 자체에 대한 자동화된 검증 체계 부재 |
| **v3** | 2025.12~2026.02 | GCP 전환 + Terratest 7단계 검증 + App of Apps 패턴 | — (현재 진행형) |

---

### [Evolution 2] 시험 플랫폼의 진화: Legacy에서 AI Agent까지

| 버전 | 기간 | 핵심 변화 | 인식한 한계 |
|------|------|-----------|-------------|
| **OnlineExam (Legacy)** | 2023.06 | Django 2.1/jQuery, 단일 앱 | 테스트 부재, 구조적 한계 |
| **exam-platform** | 2025.12~2026.02 | Django 5.2+React 19, TDD 3계층 | AI 기반 문제 출제 수요 |
| **ai-exam-agent** | (개발 중) | Multi-Agent, MCP 통합 | — (진행형) |

---

## 프로젝트 상세

### 1. fAInancial-agent — 한국 금융 데이터 AI Agent

**기간:** 2025.12 ~ 2026.03
**역할:** 1인 프로젝트 (AI Agent 설계, Backend 개발)
**GitHub:** https://github.com/DvwN-Lee/fAInancial-agent

#### 프로젝트 개요

한국 금융 데이터(DART 공시, KRX 주가)를 자연어로 질의할 수 있는 AI Agent 시스템입니다. LangGraph StateGraph로 Agent 상태 전이와 도구 호출을 선언적으로 관리하고, FastMCP Streamable HTTP로 DART/KRX/RAG 도구를 독립 MCP 서버로 분리했습니다.

#### 주요 구현 사항

**1. LangGraph StateGraph 기반 Agent 아키텍처**
- while loop → LangGraph StateGraph 진화 과정을 코드로 보존하며 선언적 Agent 아키텍처 확립
- 상태 전이와 도구 호출 흐름을 그래프로 명시적 관리

**2. MCP Protocol 기반 도구 분리**
- FastMCP Streamable HTTP로 DART, KRX, RAG 도구를 MCP 서버로 분리
- Agent가 MCP Protocol을 통해 도구를 발견하고 호출하는 구조
- 도구 추가/변경 시 Agent 코드 수정 없이 대응 가능

**3. RAG Pipeline (Voyage AI + FAISS)**
- Voyage AI voyage-finance-2 임베딩으로 DART 공시 문서 벡터화
- FAISS 인덱스로 유사도 검색 기반 RAG 파이프라인 구축
- RAGAS faithfulness 평가로 생성 응답 품질 정량 검증

**4. Agent Observability**
- LangFuse v3 self-hosted tracing 통합
- Agent 실행 경로, 토큰 소비, 도구 호출 패턴 실시간 추적
- Docker Compose 기반 LangFuse 인프라 구축

**5. Streamlit Bloomberg Terminal UI**
- 금융 데이터 분석 전용 인터페이스

#### 기술 스택

| 영역 | 기술 |
|------|------|
| Agent | LangGraph StateGraph, Gemini API |
| MCP | FastMCP v3 (Streamable HTTP) |
| RAG | Voyage AI (voyage-finance-2), FAISS |
| Observability | LangFuse v3 (self-hosted) |
| Backend | Python, FastAPI |
| Infra | Docker Compose |
| Testing | pytest, RAGAS |
| UI | Streamlit |

#### 핵심 학습

- LangGraph StateGraph를 활용한 선언적 Agent 아키텍처 설계
- MCP Protocol 기반 도구 분리로 Agent-도구 간 결합도 제거
- Voyage AI + FAISS RAG 파이프라인 구축 및 RAGAS 품질 검증
- LangFuse v3 self-hosted 환경에서 Agent Observability 확보

---

### 2. obLLMa — LLM Serving Observability Platform

**기간:** 2025.12 ~ 2026.03
**역할:** 1인 프로젝트 (메트릭 설계, 부하 분석)
**GitHub:** https://github.com/DvwN-Lee/obLLMa

#### 프로젝트 개요

LLM Serving 환경에 특화된 Observability Stack입니다. 기존 웹 서버 메트릭(RPS, Latency)으로는 파악할 수 없는 LLM 특유의 성능 병목을 드러내기 위해 TTFT, TPS, TPOT, Queue Depth 등 LLM Serving 전용 Prometheus 메트릭을 설계하고, 단계별 부하 테스트 시나리오로 성능을 정량 분석했습니다.

#### 주요 구현 사항

**1. LLM 전용 Prometheus 메트릭 설계**
- TTFT(Time To First Token), TPS(Tokens Per Second), TPOT(Time Per Output Token), Queue Depth, Active Requests 등
- Prometheus Histogram/Gauge/Counter로 구현

**2. MonitoredSemaphore 동시성 추적**
- active_requests와 queue_depth를 실시간 추적하는 asyncio 기반 세마포어 구현
- 동시 요청 수와 대기열 깊이를 실시간으로 확인

**3. 단계별 부하 테스트 시나리오**
- Baseline, Concurrency Sweep, Sustained Load, Variable Prompt Length, Model Comparison 시나리오 설계
- LLM 서빙 성능 한계와 병목 지점 정량 분석

**4. TTFT Canary Metric 발굴**
- 동시 요청 증가 시 TTFT가 급격히 저하되는 queuing bottleneck 발견
- throughput만으로는 보이지 않는 성능 병목을 canary metric으로 드러냄

**5. Grafana 대시보드**
- TTFT 분포, TPS 추이, Queue Depth, Active Requests 등 LLM 서빙 성능 실시간 시각화

#### [AI Agent + Platform Synergy]

- Platform Engineering에서 쌓은 Prometheus/Grafana 역량을 LLM Serving 도메인에 확장 적용한 프로젝트
- Monitoring v3의 Golden Signals → obLLMa의 LLM Serving Signals로 관측성 개념을 AI 영역에 확장 적용

#### 기술 스택

| 영역 | 기술 |
|------|------|
| Metrics | Prometheus (Histogram, Gauge, Counter) |
| Visualization | Grafana |
| Backend | FastAPI, Python |
| LLM Runtime | Ollama |
| Infra | Docker Compose |
| Concurrency | MonitoredSemaphore (asyncio) |

#### 핵심 학습

- LLM Serving 환경에 특화된 Prometheus 메트릭 설계 역량
- TTFT, TPS 등 LLM 전용 지표로 기존 웹 서버 메트릭과 차별화된 관측성 확보
- Canary metric 개념을 통한 사전적 성능 병목 탐지 경험

---

### 3. gemini-mcp — Gemini CLI MCP Server

**기간:** 2026.02
**역할:** 1인 프로젝트 (MCP Server 설계 및 구현)
**GitHub:** https://github.com/DvwN-Lee/gemini_mcp
**npm:** @dongju101/gemini-mcp

#### 프로젝트 개요

Gemini CLI를 Subprocess로 호출하는 MCP Server입니다. Google AI Pro 구독의 OAuth 인증을 활용하여 API Key 없이 Gemini를 사용할 수 있으며, npm 패키지로 배포하여 `npx`로 즉시 사용 가능합니다. Claude Code, Claude Desktop 등 MCP 호환 환경에서 Gemini와 대화형 질의를 수행할 수 있습니다.

#### 주요 구현 사항

**1. FastMCP 기반 MCP Server 구현**
- 3개 Tool(gemini_chat, gemini_reset, gemini_fetch_chunk), 3개 Prompt, 2개 Resource 정의
- Zod 스키마 기반 파라미터 검증

**2. Gemini CLI Subprocess JSONL 스트림 파싱**
- `child_process.spawn` + readline AsyncIterator로 실시간 line-by-line JSONL 파싱
- Per-Session Promise 체이닝으로 동시 접근 직렬화
- Quota 에러 감지 시 gemini-3-flash → gemini-2.5-flash 자동 Fallback Chain

**3. Multi-Session Workspace 격리**
- Session별 독립 Workspace 디렉토리 자동 생성 및 관리
- OAuth 인증 파일 symlink 동기화
- sha256 content hash 캐시로 불필요한 disk I/O 방지
- 토큰 초과 시 Session 자동 리셋

**4. change_mode 코드 수정 파서**
- FILE 헤더 + OLD/NEW 블록 구조 2단계 파싱
- 대용량 응답 multi-chunk 분할 + TTL 기반 in-memory ChunkCache

**5. 보안 환경변수 격리**
- Subprocess 환경변수 allowlist 필터링
- stderr 출력에서 민감 정보 제거

#### 기술 스택

| 영역 | 기술 |
|------|------|
| MCP Framework | FastMCP v3 |
| Language | TypeScript, Node.js 18+ |
| Schema | Zod |
| Testing | Vitest |
| Distribution | npm (@dongju101/gemini-mcp) |
| Target | Gemini CLI (OAuth, Subprocess) |

#### 핵심 학습

- MCP Protocol 기반 Tool/Prompt/Resource 설계 및 FastMCP Server 구현
- Subprocess JSONL 스트림 파싱과 동시성 제어(Promise 직렬화) 경험
- npm 패키지 배포 및 npx 기반 zero-install 배포 전략 실천

---

### 4. GCP Cloud-Native Monitoring Platform v3.0

**기간:** 2025.12 ~ 2026.02
**역할:** 1인 프로젝트 (Infrastructure 설계 및 구축, Backend 개발)
**GitHub:** [https://github.com/DvwN-Lee/Monitoring-v3](https://github.com/DvwN-Lee/Monitoring-v3)

#### 프로젝트 개요

v2(Solid Cloud) 환경의 한계(수동 인프라 프로비저닝, 검증 부재)를 극복하기 위해 GCP로 플랫폼을 전환하고 인프라 전 과정을 코드로 관리한 프로젝트입니다. Terraform으로 리소스를 정의하고, **Terratest 7단계 검증 체계**를 구축하여 "인프라도 소프트웨어처럼 테스트될 수 있다"는 방법론을 실천했습니다.


#### 주요 구현 사항

**1. GCP Infrastructure as Code (Terraform)**

- VPC, Subnet, Firewall Rules, Compute Engine VM, GCP Secret Manager 등 전체 인프라를 Terraform으로 코드로 정의
- IAP(Identity-Aware Proxy) 기반 Bastion 없는 보안 SSH 접속 환경 구성
- **Resource Right-sizing:** Prometheus 메트릭으로 CPU 사용량 10.8%, Istio 사이드카 실측 30~50 MiB/pod 데이터를 기반으로 과도하게 할당된 Pod의 `requests/limits`를 재조정하여 클러스터 자원 활용도 향상
- **비용 최적화:** MIG(Managed Instance Group)으로 Worker Node Auto-healing 체계 구축(Spot VM 선점 시 자동 복구), Spot VM 활용으로 Worker Node 비용 절감, HPA(min 2/max 5 pods, CPU 70%)로 Pod 수준 탄력적 스케일링 구현

**2. Terratest 기반 Infrastructure 검증 (7단계)**

- Layer 0: Static Validation (Terraform fmt/validate)
- Layer 1: Plan Unit Test (리소스 구성 검증)
- Layer 1.5: Plan Deep Analysis (12개 Subtest: ResourceCount, FirewallTargetTags, IAMRoles 등)
- Layer 2: Network Layer 검증 (VPC, Firewall, IAP 접근성)
- Layer 3: Compute & K3s 검증 (Node 상태, API Server 응답)
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

**5. E2E 테스트 자동화 (Playwright)**

- Grafana Dashboard 로드 및 Panel 데이터 정상 수신 검증
- Prometheus Target 상태 및 Query API 동작 검증
- Kiali Service Mesh 트래픽 그래프 접근성 확인

**6. Microservice Backend (Fullstack Synergy)**

- Go API Gateway: 경로 기반 라우팅, 요청 프록시 및 통합 메트릭 수집 인터페이스 구현
- Python FastAPI: Auth, Blog, User 3개 마이크로서비스 설계 및 배포
- Istio mTLS STRICT + GCP Firewall + NetworkPolicy 조합한 Zero Trust Network 구축

#### [Fullstack + Platform Synergy]

- **애플리케이션 가시성 확보:** Go로 작성된 API Gateway 레이어에서 직접 메트릭을 추출하고, 이를 Prometheus/Grafana 인프라와 연동하여 병목 지점을 추적하는 엔드 투 엔드 관측성을 구현했습니다.
- **다층 보안 구성:** 서비스 코드 내의 JWT 인증 로직(Application)과 Istio mTLS(Infrastructure)를 결합하여, 애플리케이션과 네트워크 양측에서 검증되는 다층 보안 체계를 구축했습니다.

#### 기술 스택

| 영역 | 기술 |
|------|------|
| Cloud & Infra | GCP, Terraform, K3s v1.31, Helm |
| Platform | ArgoCD (App of Apps), Istio v1.24 (mTLS), External Secrets Operator |
| Observability | Prometheus, Grafana, Loki, Promtail, Kiali |
| Testing | Terratest (Go), Playwright (TypeScript) |
| Backend | Go (API Gateway), Python FastAPI (Auth/Blog/User) |

#### 핵심 학습

- Terratest 7단계 파이프라인으로 인프라를 코드 수준에서 자동 검증하는 Platform Reliability 체계 구축
- App of Apps 패턴으로 다수 ArgoCD Application을 계층적으로 관리하는 선언적 플랫폼 구조 설계
- IAP·Shielded VM·Firewall·NetworkPolicy·mTLS 조합으로 코드로 구성한 다층 Zero Trust 보안 아키텍처 구현
- MIG Auto-healing + Spot VM으로 안정적이고 비용 효율적인 Worker Node 운영 체계를 코드로 관리, HPA로 Pod 수준 탄력적 스케일링 구현
- `terraform apply` 한 번으로 전체 인프라를 약 10분 내 완성하는 재현 가능한 배포 체계 달성
- 프로젝트 전반 Troubleshooting 19건 문서화: ArgoCD Sync Wave Race Condition, Helm–Terraform 설정 불일치 등 Platform 계층 장애 원인 분석 및 해결

---

### 5. exam-platform - Online Exam Platform

**기간:** 2025.12 ~ 2026.02
**역할:** 1인 프로젝트 (Full-Stack 개발, Test Automation)
**GitHub:** https://github.com/DvwN-Lee/exam-platform

#### 프로젝트 개요

Legacy 온라인 시험 시스템(Django 2.1/Python 3.7/jQuery)을 Django 5.2 LTS + React 19 Full-Stack으로 재구현한 프로젝트입니다. TDD 방법론을 적용하여 Unit/Integration/E2E 3계층 테스트 전략을 구축하고, Service Layer Pattern 도입으로 비즈니스 로직과 View를 분리했습니다.

#### 주요 구현 사항

**1. Legacy 시스템 Full-Stack 마이그레이션 및 재구현**

- Backend: Django 2.1 → Django 5.2 LTS + DRF, Python 3.7 → Python 3.14
- Frontend: jQuery Template 렌더링 → React 19 + TypeScript SPA
- REST API 기반 Backend/Frontend 분리 아키텍처로 전환

**2. TDD 기반 테스트 전략**

- Unit Test: Service Layer / Repository 개별 로직 검증
- Integration Test: API Endpoint → DB 연동 전체 흐름 검증
- E2E Test: Playwright 기반 학생/교사 시나리오 검증
- CI Pipeline(GitHub Actions)에서 전체 테스트 자동 실행 및 커버리지 리포트 생성

**3. Service Layer Pattern 도입**

- View에 혼재되어 있던 비즈니스 로직을 Service Layer로 분리
- 단일 책임 원칙 적용으로 테스트 용이성 및 코드 재사용성 향상

**4. Database 성능 최적화 (Query & Schema)**

- **복합 인덱스(Composite Index) 전략:** 응시 이력 및 성적 통계 쿼리 분석을 통해 `(exam, student)`, `(exam, user, is_submitted)` 등 복합 인덱스를 설계하여 Full Table Scan 방지 및 조회 속도 개선
- **N+1 쿼리 최적화:** Django ORM의 `select_related` 및 `prefetch_related`를 전략적으로 활용하여 시험 목록 조회 시 Database 접근 횟수를 73% 감소(15회 → 4회)
- **Database Connection Pool 튜닝:** 피크 타임 시 응답 지연을 방지하기 위해 `CONN_MAX_AGE: 600` 설정으로 Connection 재사용을 최적화하고 Connection 생성 오버헤드 절감

**5. 보안 (JWT HttpOnly Cookie + RBAC)**

- Refresh Token을 HttpOnly Cookie로 관리, Access Token은 응답 body로 전달하여 XSS 공격 노출 방지
- Frontend(React) + Backend(DRF) 양측에서 RBAC 이중 검증
- 교사/학생/관리자 권한별 API Endpoint 접근 제어

**6. Database 아키텍처**

- PostgreSQL: 핵심 관계형 데이터 (사용자, 시험, 문제, 응시)
- PostgreSQL + pgvector: AI 교재 청크 임베딩 저장 및 CosineDistance 기반 벡터 검색 (RAG Pipeline)
- Redis: 세션 관리 및 캐싱

**7. 기능 구현**

- 자동 채점(객관식) + 수동 채점(주관식) 이중 채점 시스템
- 시험 응시 중 Auto-Save (답안 유실 방지)
- 학생/교사 대시보드 (성적 추이, 예정 시험, 통계)
- TanStack Query로 Server State 관리, TanStack Router로 Type-safe 라우팅

#### [Fullstack + Platform Synergy]

- **데이터 중심 성능 최적화:** Django ORM의 N+1 쿼리 문제를 해결(Application)함과 동시에, DB 인덱스 전략 수립 및 리소스 할당 최적화(Platform)를 병행하여 시스템 전반의 처리 용량을 확보했습니다.
- **테스트 주도 신뢰성 확보:** 백엔드 95% 커버리지의 TDD(Application)와 GitHub Actions CI 파이프라인(Platform)을 통합하여, 코드 변경이 인프라 배포까지 안전하게 이어지는 'Continuous Quality' 체계를 구축했습니다.

#### 기술 스택

| 영역 | 기술 |
|------|------|
| Backend | Django 5.2 LTS, DRF, Python 3.14 (uv), pytest |
| Frontend | React 19, TypeScript, TanStack Query/Router, Tailwind CSS 4 |
| Database | PostgreSQL, pgvector, Redis |
| Platform | Docker Compose, GitHub Actions CI, Terraform, GCP |
| Testing | Playwright (E2E), Vitest, MSW |

#### 핵심 학습

- **Vertical Optimization:** 애플리케이션 코드 개선(Service Layer 분리)과 데이터베이스 최적화(Query 감소 73%)를 아우르는 수직적 성능 개선 역량 확보
- **현대적 프론트엔드 아키텍처:** React 19와 Type-safe한 상태 관리/라우팅을 적용하여 유지보수성이 높은 대규모 SPA 개발 경험
- **자동화된 품질 보증:** Unit, Integration, E2E 테스트가 통합된 CI 파이프라인을 통해 서비스의 안정성을 정량적으로 보장하는 방법론 습득
- **IaC 기반 DB 운영 일관성:** Terraform으로 Cloud SQL 인스턴스와 GCP Secret Manager 자격증명을 코드로 관리하여 수동 설정 불일치 없는 재현 가능한 데이터베이스 운영 환경 구축

---

### 6. Cloud-Native Microservice Platform v2.0

**기간:** 2025.09.30 ~ 2025.12.19
**역할:** 1인 프로젝트 (Infrastructure 설계 및 구축, Backend 개발)
**GitHub:** https://github.com/DvwN-Lee/Monitoring-v2

#### 프로젝트 개요

Solid Cloud(CloudStack) 환경에서 Terraform 기반 Infrastructure 자동화와 GitOps 배포 파이프라인을 구축한 Cloud-Native 플랫폼입니다. Istio Service Mesh로 서비스 간 보안 통신을 구현하고, Prometheus/Grafana/Loki 통합 관측성 시스템을 구축했습니다. k6 부하 테스트 기반 HPA 튜닝으로 트래픽 부하에 대응하는 안정성을 확보했습니다.

온프레미스 CloudStack 환경의 네트워크 구성 제약과, Terraform으로 배포한 인프라 자체를 코드 수준에서 자동으로 검증하는 체계가 없다는 점을 인식했습니다. 이를 해결하기 위해 v3에서 GCP로 전환하고 Terratest 기반 7단계 인프라 검증 체계를 구축했습니다.

#### 주요 구현 사항

**1. Infrastructure as Code (Terraform + Kustomize)**

- Terraform으로 CloudStack 인프라(VM, 네트워크, 스토리지, Port Forwarding)를 코드로 정의
- Kustomize base/overlay 패턴으로 개발/운영 환경별 Kubernetes Manifest 선언적 관리
- Terraform State를 `.gitignore`로 Git 추적에서 제외하고, Remote Backend(S3) 전환을 설계하여 협업 시 State Lock 충돌 방지 기반 마련

**2. GitOps CI/CD Pipeline**

- CI: GitHub Actions로 Docker 이미지 빌드 → Trivy 보안 스캔(CRITICAL/HIGH 취약점 탐지, 결과 PR 코멘트 자동화) → 레지스트리 Push 자동화
- CD: Argo CD가 Git Repository 변경을 감지하여 Kustomize Build → Kubernetes Apply 수행
- Git Push 후 평균 5분 내 자동 배포 달성

**3. Istio Service Mesh (Zero Trust Network)**

- Istio mTLS STRICT 모드로 모든 서비스 간 통신 상호 인증 및 암호화
- Kiali 대시보드로 MSA 트래픽 흐름 및 서비스 의존성 시각화

**4. Observability System**

- Prometheus + ServiceMonitor/PodMonitor 기반 자동 메트릭 수집
- Grafana Golden Signals 대시보드 구성 (Latency, Traffic, Errors, Saturation)
- Loki + Promtail 중앙 로깅 시스템 구축

**5. 성능 최적화 (Data-driven Tuning)**

- **k6 기반 HPA 임계값 최적화:** k6 부하 테스트(100 VU) 중 발생하는 지연 시간 및 에러율 데이터를 분석하여, CPU 사용량 기반 HPA(`targetCPUUtilization: 70%`) 임계값의 유효성 검증 및 조정
- **성능 개선 결과:** P99 Latency 대폭 개선 및 안정적 에러율 유지 확인
- **Observability 오버헤드 관리:** Prometheus 저장소 부하를 줄이기 위해 High-cardinality 레이블을 정리하고 수집 주기를 튜닝하여 모니터링 스택 자원 점유 최소화

**6. 아키텍처 결정 기록 (ADR)**

- ADR 10건 작성: ArgoCD vs Flux, PostgreSQL vs SQLite, Loki vs EFK, Istio vs Linkerd, Terraform vs Pulumi 등 아키텍처 결정 배경 및 Trade-off 문서화

#### [Fullstack + Platform Synergy]

- **데이터 기반 아키텍처 의사결정:** 부하 테스트(k6)로 수집된 애플리케이션 지연 시간 데이터를 분석하여, HPA 임계값을 튜닝하고 최적의 리소스 가이드라인을 설정하는 'SRE적 접근 방식'을 실천했습니다.
- **문서화를 통한 지식 공유:** 복잡한 기술적 선택의 이유를 ADR로 기록하여, 플랫폼의 유지보수성과 팀 내 기술적 일관성을 높이는 협업 기반을 마련했습니다.

#### 기술 스택

| 영역 | 기술 |
|------|------|
| Infrastructure | Kubernetes, Terraform, Kustomize |
| Platform | Argo CD, GitHub Actions, Istio (mTLS), Trivy |
| Observability | Prometheus, Grafana, Loki, Promtail, Kiali |
| Performance | k6 (부하 테스트) |
| Backend | Go, Python FastAPI, PostgreSQL, Redis |

#### 핵심 학습

- IaC로 재현 가능한 인프라를 구축하고 Terraform State를 Git 추적에서 제외, Remote Backend 전환을 설계하여 State 관리 전략 수립
- ArgoCD + Kustomize 기반 GitOps: 선언적 배포로 환경별 일관성을 선언적으로 보장
- Istio mTLS STRICT로 서비스 간 Zero Trust 네트워크 구현
- k6 부하 테스트 → Grafana Golden Signals 실측 → HPA 임계값 튜닝으로 이어지는 데이터 기반 성능 최적화 사이클 경험

---

### 7. Kubernetes CI/CD Infrastructure

**기간:** 2025.11.27 ~ 2025.11.30
**역할:** 1인 프로젝트 (Infrastructure 설계 및 구축)
**GitHub:** https://github.com/DvwN-Lee/k8s-cicd-automation

#### 프로젝트 개요

CloudStack 환경에서 Terraform과 Ansible을 조합하여 Kubernetes Cluster를 자동으로 구축하고, Jenkins, GitLab, Docker Registry를 배포하여 Git Push to Deploy 파이프라인을 구현한 IaC 프로젝트입니다. 수동 구성 방식의 한계를 극복하기 위해 전체 프로비저닝 과정을 코드로 관리하여 인프라 공급 주기를 단축하고 구성의 일관성을 확보했습니다.

#### 주요 구현 사항

**1. IaC 파이프라인 (Terraform → Ansible)**

- Terraform으로 CloudStack 인프라(VM 3대, Network, Port Forwarding 규칙)를 코드로 정의
- VM 프로비저닝 완료 후 Ansible Inventory 파일을 자동 생성하여 구성 관리 단계로 seamless 전달
- Terraform(인프라 프로비저닝) + Ansible(소프트웨어 구성 관리)의 역할 분리로 각 도구의 강점 활용

**2. Kubernetes Cluster 자동화 (Ansible Playbook)**

- containerd v1.7.2 런타임, Kubernetes v1.28.15, Cilium CNI v1.14.5, MetalLB v0.13.12 순차 설치 자동화
- kubeadm init/join, kubelet 설정, CNI 플러그인 설치 전 과정을 멱등성 있게 구현하여 재현 가능한 클러스터 구축 체계 마련

**3. CI/CD 도구 배포 및 파이프라인 구성**

- Jenkins + GitLab CE + Docker Registry 기반 Git Push to Deploy 파이프라인 구현
- GitLab Push → Jenkins 자동 빌드 → Docker 이미지 생성 및 Registry Push → Kubernetes 자동 배포
- Jenkins Pipeline을 Groovy DSL로 작성하여 빌드/Push/배포 단계 선언적 정의

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
- Cilium eBPF CNI와 MetalLB를 코드 수준에서 통합하여 네트워킹 레이어까지 IaC 범위 확장

---

### 8. 실시간 Microservice Monitoring Platform v1.0

**기간:** 2025.09.02 ~ 2025.09.27
**역할:** 1인 프로젝트 (Architecture 설계, Backend 개발)
**GitHub:** https://github.com/DvwN-Lee/Monitoring

#### 프로젝트 개요

단국대학교 CloudStack(Solid Cloud) 환경에서 Go와 Python(FastAPI)을 활용한 폴리글랏 마이크로서비스 기반 실시간 모니터링 대시보드를 구축했습니다. Go로 API Gateway와 Stats Aggregator를 구현하여 안정적 처리량 100 RPS 목표 하에서 동시성 안정성을 검증하고, Kustomize로 Kubernetes 환경별 배포를 관리합니다.

직접 구현한 Timeout 기반 장애 격리, Stats Aggregator는 기능적으로 동작했으나, 이를 유지보수하는 비용과 프로덕션 수준의 Service Mesh 기능(세밀한 트래픽 제어, 서비스 간 가시성)을 커스텀으로 구현하는 것의 한계를 확인했습니다. 이 경험이 v2에서 Istio Service Mesh를 도입하고 커스텀 컴포넌트를 대체하는 결정의 근거가 되었습니다.

#### 주요 구현 사항

**1. Go 기반 동시성 최적화 컴포넌트**

- **API Gateway (Go `net/http`):** 경로 기반 라우팅으로 User/Auth/Blog 서비스에 역방향 프록시, Go 런타임의 요청당 고루틴 할당으로 비차단 동시 처리
- **Stats Aggregator (Load Balancer):** 서비스 통계 수집 시 **Buffered Channel** 기반 **goroutine fan-out** 패턴으로 다수 서비스에 동시 HTTP 요청 수행
- **Timeout 기반 장애 격리:** 서비스 간 호출에 2초 타임아웃을 적용하여 특정 서비스 장애 시 지연이 전체 시스템으로 전파되는 것을 차단 (백프레셔 패턴)

**2. Python FastAPI 마이크로서비스**

- Auth, Blog, User 3개 서비스를 FastAPI로 구현
- Redis Cache-Aside 패턴 적용: 자주 조회되는 데이터를 Redis에 캐싱하여 응답 속도 개선
- User Service와 Blog Service가 각각 독립적인 SQLite를 사용하여 데이터 격리 (Database per Service 패턴)

**3. Kustomize 환경별 설정 관리**

- base: 공통 Kubernetes 리소스 정의 (Deployment, Service, ConfigMap)
- overlay: 환경별 차이 (Replica 수, Resource Limits, 환경 변수)
- local 환경 Kubernetes Manifest 선언적 관리

**4. 실시간 모니터링 대시보드**

- HTTP 폴링으로 load-balancer의 /stats 엔드포인트를 2초마다 호출하여 RPS, 평균 응답 시간, 서비스 상태를 Vanilla JavaScript + Chart.js로 시각화
- WebSocket 하트비트로 API 트래픽이 없을 때도 모니터링 지표 업데이트 유지 (IDLE 방지)

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

### 9. Dorazy - 도서관 예약 System (Hackathon 동상 수상)

**기간:** 2022.05.30 ~ 2022.08.19
**역할:** Android 개발 및 Firebase Backend
**GitHub:** https://github.com/kimyeonhong00/dorazy
**수상:** 경소톤 Hackathon 동상 (SW융합대학 X 경영경제대학 연합 해커톤)

#### 프로젝트 개요

단국대학교 도산라운지 좌석 예약 및 관리 Android 앱입니다. Firebase BaaS를 활용한 Serverless Architecture를 채택하여 서비스 로직을 빠르게 구성하고, 실시간 데이터 동기화 기능을 구현하여 해커톤 동상을 수상했습니다.

#### 주요 구현 사항

**1. Firebase Serverless 아키텍처 기반 프로토타이핑**

- Firestore NoSQL 데이터베이스로 좌석 정보, 예약 내역, 사용자 데이터 실시간 동기화 체계 구축
- Firebase Authentication으로 사용자 인증 간소화 및 데이터 접근 제어
- Firestore Realtime Listener로 그룹/사용자 상태 변경을 UI에 실시간 반영

**2. 실시간 데이터 무결성 확보**

- `reservation` 컬렉션의 슬롯 배열을 읽어 예약 가능 여부를 확인한 후 예약 처리를 수행하여 중복 예약 차단
- 예약된 좌석은 슬롯 초과 시 즉시 비활성화되어 사용자 간 충돌 방지

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

### AI Agent Development

| 분류 | 기술 |
|------|------|
| Agent Framework | LangGraph, LangChain, Gemini API |
| MCP Protocol | FastMCP v3 (Streamable HTTP) |
| RAG & Vector DB | FAISS, Voyage AI, pgvector |
| Agent Observability | LangFuse v3, RAGAS |
| LLM Serving | Ollama, Prometheus (LLM Metrics) |

### Platform Engineering

| 분류 | 기술 |
|------|------|
| Container & Orchestration | Kubernetes (k8s, k3s), Docker, Helm, Kustomize, containerd |
| IaC & GitOps | Terraform, Ansible, Argo CD, GitHub Actions, Jenkins, GitLab |
| Service Mesh & Networking | Istio, Cilium (eBPF), MetalLB |
| Observability | Prometheus, Grafana, Loki, Promtail, Kiali |
| Testing & Performance | Playwright, Terratest, k6, pytest |
| Zero Trust & Supply Chain | Trivy, NetworkPolicy, mTLS, IAP, Shielded VM, External Secrets Operator |

### Backend Development

| 분류 | 기술 |
|------|------|
| Languages | Go, Python, TypeScript |
| Frameworks | FastAPI, Django, React 19 |
| Database | PostgreSQL, Redis, SQLite |
| API & Protocols | RESTful API, WebSocket |

### Cloud & Tools

| 분류 | 기술 |
|------|------|
| Cloud | GCP (Compute Engine, VPC, MIG, IAP, Secret Manager), CloudStack |
| OS & Tools | Linux (Ubuntu, CentOS), Git, Docker Compose, uv |

---

## 학력 및 수상

**단국대학교 컴퓨터공학과**
2021.03 ~ 2026.02 (졸업)

**자격증**
- 2023.06 - 정보처리기사
- 2022.01 - Azure AI Fundamentals (AZ-900)

**활동**
- 2025.05 ~ 2026.02 - D-Lab Coding Academy Python 프로그래밍 강사

**수상 경력**
2022.08 - 경소톤 Hackathon 동상 (Dorazy - 도서관 예약 System)

---

## 연락처

**Email:** dongju101101@gmail.com
**GitHub:** https://github.com/DvwN-Lee
**Blog:** https://velog.io/@dvwn-lee
**Portfolio Site:** https://dvwn-lee.github.io

---

**최종 수정일:** 2026.03
