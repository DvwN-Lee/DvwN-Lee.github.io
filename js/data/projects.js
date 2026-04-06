// ========================================
// Projects Data Module
// ========================================

import { fAInancialAgentContent, llmObservabilityContent, clauMuxContent } from './shared-content.js';

export const projectsData = [
    // === Featured ===
    {
        id: 'llm-obs',
        category: 'platform',
        badge: 'Featured',
        heading: 'LLM 서빙 모니터링 플랫폼',
        title: 'obLLMa',
        summary: 'LLM(대규모 언어모델) 서빙 성능을 전용 메트릭으로 모니터링하는 Observability 플랫폼. 첫 토큰 응답 시간(TTFT), 초당 토큰 처리량(TPS), 대기열 깊이(Queue Depth) 등 LLM 특화 Prometheus 메트릭을 설계하고, 단계별 부하 테스트로 성능 병목을 정량 분석했습니다.',
        widgetDesc: 'LLM 서빙 환경에서 기존 웹 서버 메트릭(RPS, Latency)으로는 파악할 수 없는 성능 병목을 발견하기 위해 시작한 프로젝트입니다. 토큰 생성 속도나 요청 대기열 같은 LLM 고유의 지표가 부재했기 때문에, TTFT(첫 토큰 응답 시간), TPS(초당 토큰 처리량), Queue Depth(대기열 깊이) 등 전용 메트릭을 직접 설계했습니다. 5단계 부하 테스트를 통해 실제 병목 지점을 정량적으로 분석했으며, 특히 TTFT가 처리량보다 먼저 성능 저하를 보인다는 점을 발견한 것이 핵심 성과입니다.',
        imageUrl: 'https://opengraph.githubassets.com/1/DvwN-Lee/obLLMa',
        imageAlt: 'obLLMa - LLM Serving 전용 Observability Stack',
        tech: ['Prometheus', 'Grafana', 'FastAPI', 'Ollama', 'Docker Compose'],
        highlights: [
            '첫 토큰 응답 시간(TTFT), 초당 처리량(TPS) 등 <strong>LLM 전용 Prometheus 메트릭</strong> 설계',
            '동시 요청 수와 대기열 깊이를 실시간 추적하는 <strong>MonitoredSemaphore 동시성 제어</strong>',
            'Baseline → Concurrency Sweep → Sustained Load 등 <strong>단계별 부하 테스트 시나리오</strong>',
            '<strong>TTFT를 canary 지표로 활용</strong>하여 처리량만으로는 드러나지 않는 queuing 병목 탐지'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/obLLMa',
        modalDetails: [
            { title: 'Overview', content: llmObservabilityContent.modal.overview },
            { title: 'Key Features', items: llmObservabilityContent.modal.keyFeatures },
            { title: 'Technical Details', items: llmObservabilityContent.modal.technicalImplementation },
            { title: 'Learning Points', items: llmObservabilityContent.modal.learningPoints }
        ]
    },
    {
        id: 'clau-mux',
        category: 'agent',
        badge: 'Featured',
        heading: 'Claude Code AI Teammate Bridge',
        title: 'clau-mux',
        summary: 'Claude Code의 tmux 세션 관리와 Gemini/Codex CLI를 AI teammate로 연결하는 MCP 브리지. SendMessage로 inbox.json에 메시지를 기록하면 bridge가 폴링하여 tmux pane에 전달하고, teammate는 write_to_lead MCP 도구로 outbox.json에 응답을 돌려보냅니다.',
        widgetDesc: 'Claude Code에서 Gemini와 Codex를 teammate로 활용하고 싶다는 필요에서 출발했습니다. Lead와 teammate 간 비동기 메시지 흐름을 inbox/outbox JSON + zsh bridge + stdio MCP server의 세 계층으로 분리했고, 어떤 MCP 지원 CLI도 teammate로 연결할 수 있는 범용 구조를 설계했습니다.',
        imageUrl: 'https://opengraph.githubassets.com/1/DvwN-Lee/clau-mux',
        imageAlt: 'clau-mux - Claude Code AI Teammate Bridge',
        tech: ['Claude Code', 'tmux', 'MCP', 'Node.js', 'zsh', 'Gemini CLI'],
        highlights: [
            'inbox.json 폴링 + tmux send-keys/paste-buffer로 <strong>Lead → Teammate 비동기 메시지 전달</strong>',
            'bridge-mcp-server.js(stdio MCP)로 <strong>Teammate → Lead write_to_lead 응답 채널</strong> 구현',
            '<strong>세션 격리·중복 방지</strong>: 동일 세션 재진입 차단, orphaned 세션 자동 정리',
            'Gemini CLI · Codex CLI · 임의 MCP 지원 CLI를 <strong>teammate로 범용 연결</strong>'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/clau-mux',
        modalDetails: [
            { title: 'Overview', content: clauMuxContent.modal.overview },
            { title: 'Key Features', items: clauMuxContent.modal.keyFeatures },
            { title: 'Live Demo', type: 'chat', messages: clauMuxContent.modal.chatDemo },
            { title: 'Technical Details', items: clauMuxContent.modal.technicalImplementation },
            { title: 'Learning Points', items: clauMuxContent.modal.learningPoints }
        ]
    },
    {
        id: 'financial',
        category: 'agent',
        badge: 'Featured',
        heading: '금융 데이터 AI 분석 에이전트',
        title: 'fAInancial-agent',
        summary: '한국 금융 데이터(DART 공시, KRX 주가)를 자연어로 질의하는 AI 분석 에이전트. LangGraph 상태 그래프로 에이전트 흐름을 선언적으로 관리하고, MCP 프로토콜로 분리된 도구 서버를 통해 벡터 검색 기반 문서 분석(RAG)을 수행합니다.',
        widgetDesc: '한국 금융 데이터(DART 공시, KRX 주가)를 자연어로 분석하기 위한 AI 에이전트입니다. 단순 API 호출로는 비정형 공시 문서를 다루기 어려워, LangGraph 상태 그래프로 에이전트 흐름을 관리하고 MCP 프로토콜로 도구 서버를 분리하여 유지보수성을 확보했습니다. Voyage AI 임베딩과 FAISS 벡터 검색으로 RAG 파이프라인을 구축했으며, RAGAS 평가를 통해 생성 응답의 문서 충실도를 정량적으로 검증할 수 있도록 설계했습니다.',
        imageUrl: 'https://opengraph.githubassets.com/1/DvwN-Lee/fAInancial-agent',
        imageAlt: 'fAInancial-agent - LangGraph + MCP 기반 금융 데이터 분석 AI Agent',
        tech: ['LangGraph', 'MCP', 'RAG', 'FAISS', 'FastAPI', 'LangFuse'],
        highlights: [
            'LangGraph 상태 그래프(StateGraph)로 에이전트의 <strong>상태 전이와 도구 호출을 선언적 관리</strong>',
            'DART/KRX/RAG 도구를 <strong>독립 MCP 서버로 분리</strong>하여 에이전트-도구 간 결합도 제거',
            'Voyage AI 임베딩 + FAISS 벡터 검색으로 <strong>DART 공시 문서 RAG(검색 증강 생성)</strong> 구현',
            'RAGAS faithfulness 평가로 <strong>생성 응답의 문서 충실도 정량 검증</strong>'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/fAInancial-agent',
        modalDetails: [
            { title: 'Overview', content: fAInancialAgentContent.modal.overview },
            { title: 'Key Features', items: fAInancialAgentContent.modal.keyFeatures },
            { title: 'Technical Details', items: fAInancialAgentContent.modal.technicalImplementation },
            { title: 'Learning Points', items: fAInancialAgentContent.modal.learningPoints }
        ]
    },
    {
        id: 'gemini-mcp',
        category: 'agent',
        badge: '',
        heading: 'Gemini CLI MCP Server',
        title: 'gemini-mcp',
        summary: 'Gemini CLI를 Subprocess로 호출하는 MCP Server. OAuth 인증 기반으로 API Key 없이 Gemini를 사용하며, npm 패키지로 배포하여 npx로 즉시 사용 가능합니다.',
        widgetDesc: 'Claude Code에서 Gemini를 활용하기 위해 개발한 MCP Server입니다. Gemini CLI를 subprocess로 호출하고 JSONL 스트림을 파싱하여 실시간 응답을 전달합니다. Multi-Session Workspace 격리, Quota 초과 시 자동 모델 Fallback, change_mode 코드 수정 파서 등을 구현했으며, npm 패키지로 배포하여 설치 없이 npx로 바로 사용할 수 있습니다.',
        imageUrl: 'https://opengraph.githubassets.com/1/DvwN-Lee/gemini_mcp',
        imageAlt: 'gemini-mcp - Gemini CLI MCP Server',
        tech: ['FastMCP', 'TypeScript', 'Node.js', 'Zod', 'Vitest'],
        highlights: [
            'FastMCP 기반 <strong>3 Tool / 3 Prompt / 2 Resource</strong> MCP Server 구현',
            'Gemini CLI subprocess <strong>JSONL 스트림 실시간 파싱</strong> + Quota 자동 Fallback',
            'Session별 <strong>독립 Workspace 격리</strong> + OAuth 인증 symlink 동기화',
            '<strong>npm 패키지 배포</strong>로 npx 기반 zero-install 사용'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/gemini_mcp',
        modalDetails: [
            {
                title: 'Overview',
                content: 'Gemini CLI를 Subprocess로 호출하는 MCP Server입니다. Google AI Pro 구독의 OAuth 인증으로 API Key 없이 Gemini를 사용할 수 있으며, npm 패키지(@dongju101/gemini-mcp)로 배포하여 npx로 즉시 사용 가능합니다.'
            },
            {
                title: 'Key Features',
                items: [
                    '<strong>FastMCP MCP Server</strong>: 3 Tool(gemini_chat/reset/fetch_chunk), 3 Prompt, 2 Resource',
                    '<strong>JSONL 스트림 파싱</strong>: child_process.spawn + readline AsyncIterator 실시간 파싱',
                    '<strong>Quota Fallback Chain</strong>: gemini-3-flash → gemini-2.5-flash 자동 전환',
                    '<strong>Multi-Session</strong>: Session별 독립 Workspace + OAuth symlink 동기화',
                    '<strong>change_mode 파서</strong>: OLD/NEW 블록 2단계 파싱 + multi-chunk 분할',
                    '<strong>보안</strong>: subprocess 환경변수 allowlist 필터링'
                ]
            },
            {
                title: 'Technical Details',
                items: [
                    '<strong>MCP</strong>: FastMCP v3',
                    '<strong>Language</strong>: TypeScript, Node.js 18+',
                    '<strong>Schema</strong>: Zod',
                    '<strong>Testing</strong>: Vitest',
                    '<strong>Distribution</strong>: npm (@dongju101/gemini-mcp)'
                ]
            },
            {
                title: 'Learning Points',
                items: [
                    'MCP Protocol 기반 Tool/Prompt/Resource 설계 및 FastMCP Server 구현',
                    'Subprocess JSONL 스트림 파싱과 동시성 제어(Promise 직렬화)',
                    'npm 패키지 배포 및 npx 기반 zero-install 배포 전략'
                ]
            }
        ]
    },
    {
        id: 'exam',
        category: 'backend',
        badge: '',
        heading: '온라인 시험 플랫폼',
        title: 'exam-platform',
        summary: '기존 Django 온라인 시험 시스템을 Django + React Full-Stack으로 완전 재작성한 프로젝트. TDD 3계층 테스트(Unit→Integration→E2E), Service Layer 패턴 분리, DB 쿼리 최적화를 적용했습니다.',
        widgetDesc: '기존 시험 시스템의 View와 비즈니스 로직이 혼재되어 유지보수에 어려움이 있었습니다. Django + React Full-Stack으로 완전 재작성하면서 Service Layer 패턴을 도입하여 관심사를 분리하고, TDD로 Unit → Integration → E2E 3계층 테스트를 처음부터 적용했습니다. N+1 쿼리 최적화도 이 과정에서 수행했으며, 테스트 안전망 덕분에 구조 변경 시에도 안정적으로 리팩토링할 수 있는 환경을 구축했습니다.',
        imageUrl: 'https://opengraph.githubassets.com/1/DvwN-Lee/exam-platform',
        imageAlt: 'exam-platform - Django + React 온라인 시험 플랫폼',
        tech: ['Django', 'DRF', 'React', 'TypeScript', 'PostgreSQL', 'pytest'],
        highlights: [
            '<strong>TDD 3계층 테스트 전략</strong>: Unit → Integration → E2E (pytest + Playwright)',
            '<strong>Service Layer Pattern</strong> 도입으로 비즈니스 로직과 View 분리',
            'N+1 쿼리 + 복합 인덱스 최적화로 <strong>DB 접근 횟수 대폭 감소</strong>',
            'JWT HttpOnly Cookie + 역할 기반 접근 제어(RBAC) <strong>이중 보안 검증</strong>'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/exam-platform',
        modalDetails: [
            {
                title: 'Overview',
                content: 'Legacy 온라인 시험 시스템을 Django LTS + React Full-Stack으로 재구현한 프로젝트입니다. TDD 방법론을 적용하여 Unit/Integration/E2E 3계층 테스트 전략을 구축했습니다.'
            },
            {
                title: 'Key Features',
                items: [
                    '<strong>Full-Stack 재작성</strong>: Django LTS + DRF, React + TypeScript SPA로 전면 전환',
                    '<strong>TDD 3계층</strong>: Unit (Service/Repository) → Integration (API→DB) → E2E (Playwright)',
                    '<strong>Service Layer Pattern</strong>: 비즈니스 로직과 View 분리로 테스트 용이성 향상',
                    '<strong>DB 최적화</strong>: 복합 인덱스 전략, N+1 쿼리 해결, Connection Pool 튜닝',
                    '<strong>보안</strong>: JWT HttpOnly Cookie + RBAC 이중 검증',
                    '<strong>Database</strong>: PostgreSQL + Redis'
                ]
            },
            {
                title: 'Technical Details',
                items: [
                    '<strong>Backend</strong>: Django LTS, DRF, pytest',
                    '<strong>Frontend</strong>: React, TypeScript, TanStack Query/Router, Tailwind CSS',
                    '<strong>Database</strong>: PostgreSQL, Redis',
                    '<strong>Testing</strong>: pytest, Playwright (E2E), Vitest, MSW',
                    '<strong>Infra</strong>: Docker Compose, GitHub Actions CI'
                ]
            },
            {
                title: 'Learning Points',
                items: [
                    'Service Layer 분리와 DB 쿼리 최적화를 아우르는 수직적 성능 개선 역량',
                    'React + Type-safe 상태 관리/라우팅을 적용한 대규모 SPA 개발 경험',
                    'Unit/Integration/E2E 테스트가 통합된 CI 파이프라인으로 품질 보장'
                ]
            }
        ]
    },
    {
        id: 'mon-v3',
        category: 'platform',
        badge: '',
        heading: 'Blog Monitoring v3 · GCP',
        title: 'Monitoring-v3',
        summary: 'GCP 환경의 전체 인프라를 Terraform 코드로 관리하고, Terratest로 인프라를 소프트웨어처럼 자동 검증하는 Cloud-Native 플랫폼. ArgoCD 계층적 앱 관리와 Istio 상호 TLS 기반 Zero Trust 네트워크를 구축했습니다.',
        widgetDesc: 'v2(CloudStack) 환경의 한계를 극복하기 위해 GCP로 전환하면서, 인프라를 소프트웨어처럼 자동 검증하는 체계를 구축한 프로젝트입니다. Terraform으로 전체 인프라를 코드로 정의하고, Terratest로 Static → Plan → Network → Compute → Integration까지 다단계 자동 검증을 수행합니다. 단일 명령으로 전체 인프라 프로비저닝이 완료되며, 코드 변경 시 인프라가 자동으로 검증되는 흐름을 완성했습니다.',
        imageUrl: 'https://opengraph.githubassets.com/1/DvwN-Lee/Monitoring-v3',
        imageAlt: 'Monitoring-v3 - GCP Cloud-Native Monitoring Platform',
        tech: ['GCP', 'Terraform', 'Terratest', 'K3s', 'ArgoCD', 'Istio'],
        highlights: [
            'Terraform으로 GCP 인프라 전체를 코드로 관리, <strong>단일 명령으로 완전 자동 프로비저닝</strong>',
            '<strong>Terratest 다단계 검증</strong>: Static → Plan → Network → Compute → Integration → Monitoring',
            'ArgoCD <strong>App of Apps 패턴</strong>으로 Infrastructure/Application 계층적 관리',
            'Istio 상호 TLS + GCP 방화벽 + NetworkPolicy <strong>다층 Zero Trust 보안</strong>'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/Monitoring-v3',
        modalDetails: [
            {
                title: 'Overview',
                content: 'GCP 환경에서 Terraform으로 K3s 클러스터를 완전 자동화하고, ArgoCD App of Apps 패턴과 External Secrets를 활용한 End-to-End GitOps 플랫폼입니다. Terratest 다단계 검증 체계로 인프라를 소프트웨어처럼 테스트합니다.'
            },
            {
                title: 'Key Features',
                items: [
                    '<strong>Terraform IaC</strong>: VPC, Subnet, Firewall, Compute Engine, Secret Manager 전체 코드로 관리',
                    '<strong>Terratest 다단계 검증</strong>: Static → Plan Unit → Plan Deep → Network → Compute → Integration → Monitoring',
                    '<strong>App of Apps</strong>: ArgoCD Root Application이 하위 Apps를 계층적으로 관리',
                    '<strong>External Secrets</strong>: GCP Secret Manager 연동으로 민감 정보 자동 동기화',
                    '<strong>Zero Trust</strong>: Istio mTLS STRICT + GCP Firewall + NetworkPolicy 다층 방어',
                    '<strong>CI/CD</strong>: GitHub Actions paths-filter 기반 선택적 빌드, 멀티 아키텍처 Docker 이미지'
                ]
            },
            {
                title: 'Technical Details',
                items: [
                    '<strong>Cloud</strong>: GCP (Compute Engine, VPC, MIG, IAP, Secret Manager)',
                    '<strong>IaC</strong>: Terraform, Terratest (Go)',
                    '<strong>Orchestration</strong>: K3s, Helm',
                    '<strong>GitOps</strong>: ArgoCD (App of Apps), External Secrets Operator',
                    '<strong>Service Mesh</strong>: Istio (mTLS STRICT)',
                    '<strong>Observability</strong>: Prometheus, Grafana, Loki, Kiali',
                    '<strong>E2E Testing</strong>: Playwright',
                    '<strong>Backend</strong>: Go (API Gateway), Python FastAPI'
                ]
            },
            {
                title: 'Learning Points',
                items: [
                    'Terratest 다단계 파이프라인으로 인프라를 코드 수준에서 자동 검증하는 Platform Reliability 체계 구축',
                    'App of Apps 패턴으로 다수 ArgoCD Application을 계층적으로 관리하는 선언적 플랫폼 구조 설계',
                    '단일 명령으로 전체 인프라를 완성하는 재현 가능한 배포 체계 달성'
                ]
            }
        ]
    },
    {
        id: 'mon-v2',
        category: 'platform',
        badge: '',
        heading: 'Blog Monitoring v2 · CloudStack',
        title: 'Monitoring-v2',
        summary: 'CloudStack 환경에서 Terraform IaC + ArgoCD GitOps 자동 배포 기반 마이크로서비스 플랫폼. Istio 상호 TLS Zero Trust 보안과 k6 부하 테스트를 통한 자동 스케일링(HPA) 최적화를 수행했습니다.',
        widgetDesc: 'v1에서 Go로 직접 구현한 Gateway의 한계를 경험한 후, 표준 도구로 전환하여 구축한 플랫폼입니다. Istio Service Mesh로 트래픽 관리와 상호 TLS 보안을 적용하고, ArgoCD로 GitOps 기반 자동 배포를 구현했습니다. k6 부하 테스트 → Grafana 실측 → HPA 임계값 튜닝 사이클을 통해 데이터 기반으로 스케일링 정책을 수립했으며, P99 응답 시간이 크게 개선되는 성과를 달성했습니다.',
        imageUrl: 'https://opengraph.githubassets.com/1/DvwN-Lee/Monitoring-v2',
        imageAlt: 'Monitoring-v2 - Cloud-Native 마이크로서비스 플랫폼',
        tech: ['Kubernetes', 'Terraform', 'ArgoCD', 'Istio', 'Prometheus', 'k6'],
        highlights: [
            'GitHub Actions + ArgoCD로 <strong>코드 Push만으로 자동 배포(GitOps)</strong>',
            'Istio 상호 TLS + Trivy 보안 스캔으로 <strong>Zero Trust 네트워크 + CI 보안 통합</strong>',
            'k6 부하 테스트 기반 <strong>자동 스케일링 임계값 튜닝으로 P99 응답 시간 대폭 개선</strong>',
            '주요 아키텍처 결정 배경을 <strong>ADR(Architecture Decision Record)로 문서화</strong>'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/Monitoring-v2',
        modalDetails: [
            {
                title: 'Overview',
                content: 'CloudStack 환경에서 Terraform 기반 IaC와 GitOps 배포 파이프라인을 구축한 Cloud-Native 플랫폼입니다. Istio Service Mesh, Prometheus/Grafana/Loki Observability, k6 부하 테스트 기반 성능 최적화를 수행했습니다.'
            },
            {
                title: 'Key Features',
                items: [
                    '<strong>Terraform IaC</strong>: CloudStack 인프라(VM, 네트워크, 스토리지) 코드로 관리',
                    '<strong>GitOps CI/CD</strong>: GitHub Actions CI + ArgoCD CD, Push-to-Deploy 자동 배포',
                    '<strong>Istio mTLS</strong>: STRICT 모드 Zero Trust Network, Kiali 트래픽 시각화',
                    '<strong>Observability</strong>: Prometheus ServiceMonitor + Grafana Golden Signals + Loki 중앙 로깅',
                    '<strong>Performance</strong>: k6 부하 테스트 → Grafana 실측 → HPA 임계값 튜닝 사이클',
                    '<strong>ADR</strong>: ArgoCD vs Flux, PostgreSQL vs SQLite, Istio vs Linkerd 등 아키텍처 결정 문서화'
                ]
            },
            {
                title: 'Technical Details',
                items: [
                    '<strong>Infrastructure</strong>: Kubernetes, Terraform, Kustomize',
                    '<strong>Platform</strong>: ArgoCD, GitHub Actions, Istio (mTLS), Trivy',
                    '<strong>Observability</strong>: Prometheus, Grafana, Loki, Kiali',
                    '<strong>Performance</strong>: k6',
                    '<strong>Backend</strong>: Go, Python FastAPI, PostgreSQL, Redis'
                ]
            },
            {
                title: 'Learning Points',
                items: [
                    'IaC로 재현 가능한 인프라 구축 및 Terraform State 관리 전략 수립',
                    'ArgoCD + Kustomize 기반 GitOps: 선언적 배포로 환경별 일관성 보장',
                    'k6 → Grafana Golden Signals → HPA 튜닝으로 이어지는 데이터 기반 성능 최적화 사이클'
                ]
            }
        ]
    },
    // === Other ===
    {
        id: 'mon-v1',
        category: 'platform',
        badge: '',
        heading: 'Blog Monitoring v1 · Custom',
        title: 'Monitoring',
        summary: 'Go 언어의 고루틴(경량 스레드)으로 API Gateway와 통계 수집기를 직접 구현한 마이크로서비스 모니터링 시스템. 커스텀 구현의 한계를 경험하고 v2에서 Istio Service Mesh로 전환했습니다.',
        widgetDesc: 'Service Mesh의 내부 동작 원리를 이해하기 위해 핵심 구성요소를 직접 구현한 프로젝트입니다. Go 고루틴(경량 스레드)으로 Reverse Proxy와 실시간 통계 수집기를 구축했으며, 이 과정에서 장애 격리, 재시도 등의 기능을 커스텀으로 유지하는 비용이 크다는 것을 확인했습니다. 이 경험이 v2에서 Istio를 도입하는 근거가 되었으며, 직접 구현해본 덕분에 표준 도구의 동작 방식을 깊이 이해하는 계기가 되었습니다.',
        imageUrl: 'https://opengraph.githubassets.com/1/DvwN-Lee/Monitoring',
        imageAlt: 'Monitoring - 실시간 마이크로서비스 모니터링 v1',
        tech: ['Go', 'FastAPI', 'Kubernetes', 'Kustomize', 'Redis'],
        highlights: [
            'Go 고루틴 기반 <strong>커스텀 Reverse Proxy + 실시간 통계 수집기</strong> 직접 구현',
            '커스텀 구현의 한계를 데이터 기반으로 분석 → <strong>v2에서 Istio Service Mesh로 전환 결정</strong>'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/Monitoring',
        modalDetails: [
            {
                title: 'Overview',
                content: 'Go와 Python(FastAPI)을 활용한 폴리글랏 마이크로서비스 기반 실시간 모니터링 대시보드입니다. Go로 커스텀 API Gateway와 Stats Aggregator를 구현하여 안정적인 트래픽 처리를 검증했습니다.'
            },
            {
                title: 'Key Features',
                items: [
                    '<strong>Go API Gateway</strong>: 고루틴 기반 비차단 I/O, 경로 기반 라우팅',
                    '<strong>Stats Aggregator</strong>: Buffered Channel + goroutine fan-out 패턴',
                    '<strong>Timeout 장애 격리</strong>: 타임아웃으로 장애 전파 차단',
                    '<strong>Kustomize</strong>: base/overlay 패턴으로 환경별 K8s Manifest 관리'
                ]
            },
            {
                title: 'Technical Details',
                items: [
                    '<strong>Backend</strong>: Go (Gateway/Proxy), Python FastAPI',
                    '<strong>Orchestration</strong>: Kubernetes, Kustomize',
                    '<strong>Database</strong>: SQLite, Redis (Cache-Aside)',
                    '<strong>Frontend</strong>: Vanilla JS, Chart.js, WebSocket'
                ]
            },
            {
                title: 'Learning Points',
                items: [
                    'Go 고루틴으로 Service Mesh 핵심 역할을 직접 구현하여 이해',
                    '커스텀 구현의 한계를 경험하고 표준 도구(Istio) 도입 필요성을 데이터 기반 판단'
                ]
            }
        ]
    },
    {
        id: 'k8s-cicd',
        category: 'platform',
        badge: '',
        heading: 'Kubernetes CI/CD Infrastructure',
        title: 'k8s-cicd-automation',
        summary: 'CloudStack 환경에서 Terraform + Ansible로 Kubernetes 클러스터를 자동 구축하는 인프라 자동화 프로젝트. Jenkins/GitLab/Docker Registry 기반 Git Push → 자동 배포 파이프라인을 구현했습니다.',
        widgetDesc: 'Kubernetes 클러스터의 반복적인 수동 구축 과정을 자동화하기 위한 프로젝트입니다. Terraform으로 VM을 프로비저닝하면 Ansible Inventory가 자동 생성되고, Playbook이 Kubernetes + Cilium 네트워크 + MetalLB 로드밸런서까지 한 번에 구성합니다. Jenkins + GitLab을 연동하여 코드 Push만으로 빌드부터 배포까지 자동으로 진행되는 파이프라인을 함께 구축했습니다.',
        imageUrl: 'https://opengraph.githubassets.com/1/DvwN-Lee/k8s-cicd-automation',
        imageAlt: 'k8s-cicd-automation - Kubernetes CI/CD Infrastructure',
        tech: ['Terraform', 'Ansible', 'Kubernetes', 'Cilium', 'MetalLB', 'Jenkins'],
        highlights: [
            'Terraform으로 CloudStack 인프라를 코드로 관리, <strong>Ansible Inventory 자동 생성</strong>',
            'Ansible Playbook으로 <strong>Kubernetes + Cilium 네트워크 + MetalLB 로드밸런서</strong> 자동 구성',
            'Jenkins + GitLab + Docker Registry <strong>코드 Push → 빌드 → 배포 자동화 파이프라인</strong>'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/k8s-cicd-automation',
        modalDetails: [
            {
                title: 'Overview',
                content: 'CloudStack 환경에서 Terraform과 Ansible을 조합하여 Kubernetes Cluster를 자동 구축하고, Jenkins/GitLab/Docker Registry 기반 Git Push to Deploy 파이프라인을 구현한 IaC 프로젝트입니다.'
            },
            {
                title: 'Key Features',
                items: [
                    '<strong>Terraform + Ansible</strong>: VM 프로비저닝 → Ansible Inventory 자동 생성 → K8s 설치',
                    '<strong>Kubernetes 자동화</strong>: containerd, Kubernetes, Cilium CNI, MetalLB 멱등성 Playbook',
                    '<strong>CI/CD Pipeline</strong>: GitLab Push → Jenkins 빌드 → Docker Registry → K8s 배포',
                    '<strong>Workload 격리</strong>: Node Selector로 DevOps/App 워크로드 분리'
                ]
            },
            {
                title: 'Technical Details',
                items: [
                    '<strong>IaC</strong>: Terraform, Ansible',
                    '<strong>Platform</strong>: Kubernetes, containerd, Cilium (eBPF), MetalLB',
                    '<strong>CI/CD</strong>: Jenkins (Groovy Pipeline), GitLab CE, Docker Registry'
                ]
            },
            {
                title: 'Learning Points',
                items: [
                    'Terraform + Ansible 역할 분리로 반복 가능한 플랫폼 부트스트랩 자동화',
                    'Ansible 멱등성 Playbook으로 kubeadm 기반 K8s Cluster 재현 가능 구성',
                    'Cilium eBPF CNI와 MetalLB를 IaC로 통합하여 네트워킹까지 자동화 범위 확장'
                ]
            }
        ]
    },
    {
        id: 'dorazy',
        category: 'backend',
        badge: 'Award',
        awardLabel: 'BRONZE AWARD',
        heading: 'Dorazy - 도서관 예약 시스템',
        title: 'Dorazy',
        summary: '단국대학교 도산라운지 좌석 예약 Android 앱. Firebase 서버리스 아키텍처로 실시간 좌석 상태 동기화를 구현했습니다. 해커톤 동상 수상.',
        widgetDesc: '단국대학교 도서관 좌석 예약이 수기로 관리되는 문제를 해결하기 위해 해커톤에서 개발한 프로젝트입니다. Firebase Firestore의 실시간 동기화를 활용하여 좌석 상태가 즉시 반영되는 시스템을 구축했습니다. 제한된 시간 내에 동작하는 프로토타입이 필요했기 때문에 서버리스 아키텍처를 핵심 전략으로 선택했고, 결과적으로 동상을 수상했습니다.',
        imageUrl: 'https://opengraph.githubassets.com/1/kimyeonhong00/dorazy',
        imageAlt: 'Dorazy - 도서관 좌석 예약 시스템',
        tech: ['Android', 'Kotlin', 'Firebase', 'Figma'],
        highlights: [
            'Firebase Firestore <strong>실시간 데이터 동기화</strong> + 중복 예약 방지 로직',
            '기획-디자인-개발 총괄, 해커톤 동상 수상'
        ],
        githubUrl: 'https://github.com/kimyeonhong00/dorazy',
        modalDetails: [
            {
                title: 'Overview',
                content: '단국대학교 도산라운지 좌석 예약 및 관리 Android 앱입니다. Firebase BaaS를 활용한 Serverless Architecture로 해커톤 동상을 수상했습니다.'
            },
            {
                title: 'Key Features',
                items: [
                    '<strong>Firebase Serverless</strong>: Firestore + Authentication 기반 실시간 동기화',
                    '<strong>중복 예약 방지</strong>: Firestore Realtime Listener로 좌석 상태 즉시 반영',
                    '<strong>게이미피케이션</strong>: 학습 시간 측정 + 실시간 랭킹 시스템',
                    '<strong>팀 협업</strong>: Figma UI/UX → Android XML/Kotlin 구현, Feature Branch 전략'
                ]
            },
            {
                title: 'Technical Details',
                items: [
                    '<strong>Mobile</strong>: Android, Kotlin',
                    '<strong>Backend</strong>: Firebase (Firestore, Authentication)',
                    '<strong>Design</strong>: Figma'
                ]
            },
            {
                title: 'Learning Points',
                items: [
                    'Firebase BaaS 기반 빠른 프로토타이핑 및 실시간 데이터 동기화',
                    '해커톤에서 기획-디자인-개발 총괄'
                ]
            }
        ]
    },
];
