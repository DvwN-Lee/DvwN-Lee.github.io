// ========================================
// Projects Data Module
// ========================================

import { fAInancialAgentContent, llmObservabilityContent } from './shared-content.js';

export const projectsData = [
    {
        id: 'financial',
        category: 'agent',
        badge: 'Featured',
        heading: '금융 데이터 AI 분석 에이전트',
        title: 'fAInancial-agent',
        summary: 'LangGraph StateGraph + MCP Protocol 기반 한국 금융 데이터 분석 AI Agent. DART/KRX 데이터를 자연어로 질의하고, Voyage AI 임베딩 + FAISS 벡터 검색으로 공시 문서 RAG를 수행합니다.',
        imageUrl: 'https://opengraph.githubassets.com/1/DvwN-Lee/fAInancial-agent',
        imageAlt: 'fAInancial-agent - LangGraph + MCP 기반 금융 데이터 분석 AI Agent',
        tech: ['LangGraph', 'MCP', 'RAG', 'FAISS', 'FastAPI', 'LangFuse'],
        highlights: [
            'LangGraph StateGraph로 Agent 상태 전이와 도구 호출을 <strong>선언적으로 관리</strong>',
            'FastMCP Streamable HTTP로 DART/KRX/RAG 도구를 <strong>독립 MCP 서버로 분리</strong>',
            'Voyage AI 임베딩 + FAISS 벡터 검색으로 <strong>DART 공시 문서 RAG</strong> 구현',
            '<strong>RAGAS faithfulness 1.000</strong> 달성으로 생성 응답 품질 검증',
            'LangFuse v3 self-hosted tracing으로 <strong>Agent Observability</strong> 확보'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/fAInancial-agent',
        modalDetails: [
            {
                title: 'Overview',
                content: fAInancialAgentContent.modal.overview
            },
            {
                title: 'Key Features',
                items: fAInancialAgentContent.modal.keyFeatures
            },
            {
                title: 'Technical Details',
                items: fAInancialAgentContent.modal.technicalImplementation
            },
            {
                title: 'Learning Points',
                items: fAInancialAgentContent.modal.learningPoints
            }
        ]
    },
    {
        id: 'llm-obs',
        category: 'infra',
        badge: 'Featured',
        heading: 'LLM 서빙 모니터링 플랫폼',
        title: 'llm-serving-observability',
        summary: 'LLM Serving 전용 Observability Stack. TTFT, TPS, TPOT, Queue Depth 등 11개 커스텀 Prometheus 메트릭을 설계하고, 5개 부하 테스트 시나리오로 성능을 정량 분석했습니다.',
        imageUrl: 'https://opengraph.githubassets.com/1/DvwN-Lee/llm-serving-observability',
        imageAlt: 'llm-serving-observability - LLM Serving 전용 Observability Stack',
        tech: ['Prometheus', 'Grafana', 'FastAPI', 'Ollama', 'Docker'],
        highlights: [
            '<strong>11개 LLM 전용 Prometheus 메트릭</strong> 설계 (TTFT, TPS, TPOT, Queue Depth)',
            'MonitoredSemaphore로 <strong>active_requests/queue_depth 실시간 추적</strong>',
            '<strong>5개 부하 테스트 시나리오</strong>로 LLM 서빙 성능 정량 분석',
            '<strong>TTFT 213x 열화 발견</strong> — throughput만으로는 보이지 않는 queuing bottleneck 가시화',
            '<strong>10개 Grafana 패널</strong>로 LLM 서빙 성능 실시간 대시보드 구축'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/llm-serving-observability',
        modalDetails: [
            {
                title: 'Overview',
                content: llmObservabilityContent.modal.overview
            },
            {
                title: 'Key Features',
                items: llmObservabilityContent.modal.keyFeatures
            },
            {
                title: 'Technical Details',
                items: llmObservabilityContent.modal.technicalImplementation
            },
            {
                title: 'Learning Points',
                items: llmObservabilityContent.modal.learningPoints
            }
        ]
    },
    {
        id: 'ai-exam',
        category: 'agent',
        badge: 'Featured',
        heading: 'AI 기반 온라인 시험 플랫폼',
        title: 'AI-exam-platform',
        summary: 'Django 5.2 + React 19 Full-Stack 시험 플랫폼. 5개 MCP 서버 통합, Multi-Agent consensus/VETO 프로토콜 적용.',
        imageUrl: 'https://opengraph.githubassets.com/1/DvwN-Lee/AI-exam-platform',
        imageAlt: 'AI-exam-platform - Multi-Agent 시험 플랫폼',
        tech: ['MCP x5', 'Multi-Agent', 'Django 5.2', 'React 19', 'GKE', 'Terraform'],
        highlights: [
            '<strong>5개 MCP 서버 통합</strong>으로 Agent 도구 생태계 구축',
            'Multi-Agent <strong>consensus/VETO 프로토콜</strong> 적용',
            'TDD 기반 Backend <strong>957 tests (95% coverage)</strong>',
            'AI Exam Agent BRD: <strong>Generator → Critic → Refiner</strong> 파이프라인 설계'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/AI-exam-platform',
        modalDetails: [
            {
                title: 'Overview',
                content: 'Django 5.2 + React 19 Full-Stack 시험 플랫폼입니다. 5개 MCP 서버를 통합하고, Multi-Agent consensus/VETO 프로토콜을 적용하여 AI 기반 시험 출제/평가 시스템을 구축했습니다.'
            },
            {
                title: 'Key Features',
                items: [
                    '<strong>5 MCP Servers</strong>: 시험 출제, 채점, 분석 등 도메인별 MCP 서버 통합',
                    '<strong>Multi-Agent Protocol</strong>: consensus/VETO 기반 Agent 합의 메커니즘',
                    '<strong>AI Exam Agent BRD</strong>: Generator → Critic → Refiner 3단계 파이프라인',
                    '<strong>TDD Backend</strong>: 957 tests, 95% coverage (pytest + Playwright)',
                    '<strong>Full-Stack</strong>: Django 5.2 + DRF + React 19 + TypeScript'
                ]
            },
            {
                title: 'Technical Details',
                items: [
                    '<strong>Backend</strong>: Django 5.2, DRF, pytest',
                    '<strong>Frontend</strong>: React 19, TypeScript',
                    '<strong>Agent</strong>: Multi-Agent, MCP Protocol x5',
                    '<strong>Infra</strong>: GKE, Terraform',
                    '<strong>Testing</strong>: pytest (957 tests), Playwright (E2E)'
                ]
            },
            {
                title: 'Learning Points',
                items: [
                    'Multi-Agent consensus/VETO 프로토콜 설계 및 구현 경험',
                    '5개 MCP 서버 통합으로 대규모 Agent 도구 생태계 운영 역량 확보',
                    'TDD 방법론 기반 대규모 테스트 스위트 구축 및 유지보수'
                ]
            }
        ]
    },
    {
        id: 'token',
        category: 'tooling',
        badge: 'Featured',
        heading: 'AI Agent 비용 분석 CLI',
        title: 'Token Monitor',
        summary: 'AI Agent 토큰 소비를 추적하고 코드 품질 메트릭을 정량화하는 CLI 도구. 모델 교체 시뮬레이션으로 비용 최적화를 지원합니다.',
        imageUrl: 'https://opengraph.githubassets.com/1/DvwN-Lee/Token_monitoring',
        imageAlt: 'Token Monitor - AI Agent 토큰 소비 추적 CLI',
        tech: ['TypeScript', 'SQLite', 'commander.js', 'Vitest'],
        highlights: [
            '<strong>Collector → Core Engine → Reporter</strong> 3계층 플러그 구조',
            '<strong>4개 CLI 명령어</strong>로 토큰 소비 분석 및 리포팅',
            '<strong>simulate 명령</strong>으로 모델 교체 비용 예측',
            'Session-Commit matching으로 코드 품질 메트릭 정량화'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/Token_monitoring',
        modalDetails: [
            {
                title: 'Overview',
                content: 'AI Agent 토큰 소비를 추적하고 코드 품질 메트릭을 정량화하는 CLI 도구입니다. Collector → Core Engine → Reporter 3계층 플러그 구조로 설계되었으며, simulate 명령으로 모델 교체 비용 예측을 지원합니다.'
            },
            {
                title: 'Key Features',
                items: [
                    '<strong>3-Layer Architecture</strong>: Collector → Core Engine → Reporter 플러그 구조',
                    '<strong>4 CLI Commands</strong>: analyze, report, simulate, compare',
                    '<strong>Model Simulation</strong>: 모델 교체 시 비용 변화 예측',
                    '<strong>Session-Commit Matching</strong>: 코드 품질 메트릭과 토큰 소비 상관 분석'
                ]
            },
            {
                title: 'Technical Details',
                items: [
                    '<strong>Language</strong>: TypeScript',
                    '<strong>Database</strong>: SQLite',
                    '<strong>CLI</strong>: commander.js',
                    '<strong>Testing</strong>: Vitest'
                ]
            },
            {
                title: 'Learning Points',
                items: [
                    '3계층 플러그 아키텍처 설계 및 구현',
                    'CLI 도구 개발 경험 (commander.js)',
                    'AI Agent 토큰 경제성 분석 역량 확보'
                ]
            }
        ]
    },
    {
        id: 'saga',
        category: 'tooling',
        badge: '',
        heading: 'AI Agent 협업 개발 방법론',
        title: 'SAGA Methodology',
        summary: 'AI Agent 협업 개발 방법론. 6-Phase 워크플로우, VETO bilateral rejection 프로토콜.',
        imageUrl: 'https://opengraph.githubassets.com/1/DvwN-Lee/SAGA-Methodology',
        imageAlt: 'SAGA Methodology - AI Agent 협업 개발 방법론',
        tech: ['Methodology', 'VETO', 'TDAID', 'Multi-Agent'],
        highlights: [
            '<strong>6단계 워크플로우</strong>로 Agent 협업 개발 프로세스 체계화',
            '<strong>VETO bilateral rejection</strong> 프로토콜로 품질 게이트 구현',
            '<strong>3-Track 라우팅</strong>으로 작업 유형별 최적 경로 분기',
            '<strong>TDAID</strong>: TDD를 Agent 개발에 확장한 테스트 주도 방법론'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/SAGA-Methodology',
        modalDetails: [
            {
                title: 'Overview',
                content: 'AI Agent 협업 개발 방법론입니다. 6-Phase 워크플로우, 3-Track 라우팅, VETO bilateral rejection 프로토콜, TDAID TDD 확장 방법론을 포함합니다.'
            },
            {
                title: 'Key Features',
                items: [
                    '<strong>6-Phase Workflow</strong>: Intent → Plan → Implement → Review → Integrate → Deploy',
                    '<strong>VETO Protocol</strong>: bilateral rejection 기반 품질 게이트',
                    '<strong>3-Track Routing</strong>: 작업 유형별 최적 경로 분기',
                    '<strong>TDAID</strong>: Test-Driven AI Development'
                ]
            },
            {
                title: 'Technical Details',
                items: [
                    '<strong>Core Docs</strong>: 9개 핵심 문서',
                    '<strong>Research Docs</strong>: 19개 연구 문서',
                    '<strong>Phases</strong>: 6단계 워크플로우'
                ]
            },
            {
                title: 'Learning Points',
                items: [
                    'AI Agent 협업 개발 방법론 설계 역량',
                    'VETO 프로토콜을 통한 품질 보증 메커니즘 구현',
                    'Multi-Agent 환경에서의 워크플로우 최적화'
                ]
            }
        ]
    },
    {
        id: 'clmux',
        category: 'tooling',
        badge: '',
        heading: 'Claude Code 멀티세션 관리 도구',
        title: 'clmux',
        summary: 'Claude Code multi-session 격리를 위한 tmux wrapper.',
        imageUrl: 'https://opengraph.githubassets.com/1/DvwN-Lee/clmux',
        imageAlt: 'clmux - Claude Code multi-session tmux wrapper',
        tech: ['zsh', 'tmux', 'Claude Code'],
        highlights: [
            'ITERM_SESSION_ID 기반 <strong>세션 네이밍</strong>으로 충돌 방지',
            '위험한 tmux 바인딩 <strong>비활성화</strong>로 안전성 확보',
            '<strong>HUP trap</strong>으로 detached session 방지',
            '<strong>iTerm2 최적화</strong>된 234 lines 경량 구현'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/clmux',
        modalDetails: [
            {
                title: 'Overview',
                content: 'Claude Code multi-session 격리를 위한 tmux wrapper입니다. ITERM_SESSION_ID 기반 세션 네이밍, 위험한 tmux 바인딩 비활성화, HUP trap으로 detached session을 방지합니다.'
            },
            {
                title: 'Key Features',
                items: [
                    '<strong>Session Isolation</strong>: ITERM_SESSION_ID 기반 세션 네이밍',
                    '<strong>Safety</strong>: 위험한 tmux 바인딩 비활성화',
                    '<strong>HUP Trap</strong>: detached session 방지',
                    '<strong>iTerm2 Optimized</strong>: 234 lines 경량 구현'
                ]
            },
            {
                title: 'Technical Details',
                items: [
                    '<strong>Shell</strong>: zsh',
                    '<strong>Multiplexer</strong>: tmux',
                    '<strong>Integration</strong>: Claude Code, iTerm2'
                ]
            },
            {
                title: 'Learning Points',
                items: [
                    'tmux session 관리 및 안전한 wrapper 설계',
                    'Claude Code multi-session 운영 환경 구축'
                ]
            }
        ]
    }
];
