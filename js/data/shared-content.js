// ========================================
// Shared Content Module
// ========================================

/**
 * fAInancial-agent 프로젝트 공유 콘텐츠
 */
export const fAInancialAgentContent = {
    situation: `한국 금융 데이터(DART 공시, KRX 주가)를 자연어로 질의할 수 있는 AI Agent 시스템이 필요했습니다. 초기 while loop 기반 프로토타입은 상태 관리가 복잡하고, 도구 호출 흐름을 제어하기 어려웠으며, 대규모 공시 문서에서 정확한 정보를 추출하기 위한 RAG 파이프라인이 부재했습니다.`,

    tasks: [
        '<strong>Agent Architecture 고도화</strong>: while loop 프로토타입에서 LangGraph StateGraph 기반으로 전환하여 상태 관리와 도구 호출 흐름을 선언적으로 제어.',
        '<strong>MCP Protocol 기반 도구 분리</strong>: DART/KRX/RAG 도구를 FastMCP Streamable HTTP 서버로 분리하여 Agent와 도구 간 결합도를 최소화.',
        '<strong>RAG 파이프라인 구축</strong>: Voyage AI 임베딩 + FAISS 벡터 검색으로 DART 공시 문서 RAG를 구현하고, RAGAS 평가 프레임워크로 품질 검증.',
        '<strong>Observability 통합</strong>: LangFuse v3 self-hosted tracing을 통합하여 Agent 실행 경로, 토큰 소비, 도구 호출 패턴을 추적.'
    ],

    actions: [
        '<strong>LangGraph StateGraph 기반 Agent 재설계</strong>: Phase 0(while loop) → Phase 2-B(LangGraph StateGraph) 진화 과정을 코드로 보존하며, 상태 전이와 도구 호출을 선언적으로 관리하는 Agent를 구현했습니다.',
        '<strong>MCP Server 아키텍처 구현</strong>: FastMCP Streamable HTTP로 DART/KRX/RAG 도구를 독립 MCP 서버로 분리하여, Agent가 MCP Protocol을 통해 도구를 발견하고 호출하는 구조를 구축했습니다.',
        '<strong>Voyage AI + FAISS RAG 파이프라인</strong>: Voyage AI 임베딩으로 DART 공시 문서를 벡터화하고, FAISS 인덱스로 유사도 검색을 수행하는 RAG 파이프라인을 구축했습니다.',
        '<strong>RAGAS 기반 RAG 품질 검증</strong>: RAGAS faithfulness 1.000을 달성하여 생성된 응답이 검색된 문서에 충실함을 정량적으로 검증했습니다.',
        '<strong>LangFuse v3 Tracing 통합</strong>: Docker Compose로 LangFuse v3 self-hosted 환경을 구축하고, Agent 실행 경로와 토큰 소비를 실시간으로 추적했습니다.'
    ],

    results: [
        '<strong>선언적 Agent 아키텍처 확립</strong>: LangGraph StateGraph로 Agent의 상태 전이와 도구 호출 흐름을 명시적으로 관리하여, 복잡한 금융 질의 시나리오에서도 안정적으로 동작하는 Agent를 구현했습니다.',
        '<strong>MCP Protocol 기반 도구 분리</strong>: DART/KRX/RAG 도구를 독립 MCP 서버로 분리하여 Agent-도구 간 결합도를 제거하고, 도구 추가/변경 시 Agent 코드 수정 없이 대응할 수 있는 구조를 확보했습니다.',
        '<strong>RAG 품질 검증 달성</strong>: RAGAS faithfulness 1.000으로 생성 응답의 문서 충실도를 정량 검증하고, 99개 테스트로 전체 파이프라인의 안정성을 확보했습니다.',
        '<strong>End-to-End Observability</strong>: LangFuse v3 tracing으로 Agent 실행 경로, 토큰 소비, 도구 호출 패턴을 실시간 추적하여 디버깅 효율을 향상시켰습니다.'
    ],

    modal: {
        overview: 'LangGraph StateGraph + MCP Protocol 기반 한국 금융 데이터 분석 AI Agent입니다. DART/KRX 데이터를 자연어로 질의하고, Voyage AI 임베딩 + FAISS 벡터 검색으로 공시 문서 RAG를 수행합니다. Phase 0(while loop) → Phase 2-B(LangGraph StateGraph) 진화 과정을 코드로 보존했습니다.',

        keyFeatures: [
            '<strong>LangGraph StateGraph Agent</strong>: 상태 전이와 도구 호출을 선언적으로 관리하는 금융 분석 Agent',
            '<strong>MCP Protocol 기반 도구 분리</strong>: FastMCP Streamable HTTP로 DART/KRX/RAG 도구를 독립 서버로 분리',
            '<strong>Voyage AI + FAISS RAG</strong>: DART 공시 문서 벡터 검색 기반 RAG 파이프라인',
            '<strong>RAGAS faithfulness 1.000</strong>: 생성 응답의 문서 충실도 정량 검증',
            '<strong>LangFuse v3 Tracing</strong>: self-hosted Agent 실행 경로 추적 및 토큰 소비 분석',
            '<strong>Streamlit Bloomberg Terminal UI</strong>: 금융 데이터 분석 전용 인터페이스'
        ],

        technicalImplementation: [
            '<strong>Agent</strong>: LangGraph StateGraph, MCP Protocol',
            '<strong>RAG</strong>: Voyage AI (Embedding), FAISS (Vector Search)',
            '<strong>MCP Server</strong>: FastMCP (Streamable HTTP)',
            '<strong>Observability</strong>: LangFuse v3 (self-hosted)',
            '<strong>Backend</strong>: Python, FastAPI',
            '<strong>Infra</strong>: Docker Compose (3 services)',
            '<strong>Testing</strong>: pytest (99 tests), RAGAS',
            '<strong>UI</strong>: Streamlit (Bloomberg Terminal theme)'
        ],

        learningPoints: [
            'LangGraph StateGraph를 활용한 선언적 Agent 아키텍처 설계 경험',
            'MCP Protocol 기반 도구 분리로 Agent-도구 간 결합도 제거',
            'Voyage AI + FAISS RAG 파이프라인 구축 및 RAGAS 기반 품질 검증',
            'LangFuse v3 self-hosted 환경에서 Agent Observability 확보'
        ]
    }
};

/**
 * llm-serving-observability 프로젝트 공유 콘텐츠
 */
export const llmObservabilityContent = {
    situation: `LLM Serving 환경에서 기존 웹 서버 메트릭(RPS, Latency)만으로는 LLM 특유의 성능 병목을 파악할 수 없었습니다. 특히 TTFT(Time To First Token), TPS(Tokens Per Second), Queue Depth 등 LLM 전용 메트릭이 부재하여 throughput만으로는 보이지 않는 queuing bottleneck을 발견할 수 없는 상황이었습니다.`,

    tasks: [
        '<strong>LLM 전용 메트릭 설계</strong>: TTFT, TPS, TPOT, Queue Depth 등 11개 커스텀 Prometheus 메트릭을 설계하여 LLM Serving 성능을 다각도로 관측.',
        '<strong>부하 테스트 시나리오 설계</strong>: 5개 시나리오(baseline, ramp-up, burst, sustained, stress)로 LLM 서빙 성능을 정량 분석.',
        '<strong>Canary Metric 발굴</strong>: Throughput만으로는 드러나지 않는 성능 병목을 TTFT와 Queue Depth로 가시화.'
    ],

    actions: [
        '<strong>11개 커스텀 Prometheus 메트릭 설계</strong>: TTFT, TPS, TPOT, Queue Depth, Active Requests 등 LLM Serving 전용 메트릭을 Prometheus Histogram/Gauge로 구현했습니다.',
        '<strong>MonitoredSemaphore 구현</strong>: active_requests와 queue_depth를 실시간 추적하는 세마포어를 구현하여 동시 요청 수와 대기열 깊이를 가시화했습니다.',
        '<strong>5개 부하 테스트 시나리오 실행</strong>: baseline(1 req), ramp-up, burst, sustained, stress 시나리오로 LLM 서빙 성능을 체계적으로 분석했습니다.',
        '<strong>10개 Grafana 패널 구축</strong>: TTFT 분포, TPS 추이, Queue Depth, Active Requests 등을 실시간 시각화하는 대시보드를 구축했습니다.'
    ],

    results: [
        '<strong>TTFT 213x 열화 발견</strong>: 동시 요청 증가 시 TTFT가 213배 열화되는 queuing bottleneck을 발견하여, throughput만으로는 보이지 않는 성능 병목을 canary metric으로 가시화했습니다.',
        '<strong>LLM Serving Observability Stack 확립</strong>: 11개 커스텀 메트릭 + 10개 Grafana 패널로 LLM 서빙 성능을 다각도로 관측할 수 있는 체계를 구축했습니다.',
        '<strong>정량적 부하 분석 체계</strong>: 5개 시나리오 기반 부하 테스트로 LLM 서빙 환경의 성능 한계와 병목 지점을 정량적으로 파악할 수 있는 분석 프레임워크를 확립했습니다.'
    ],

    modal: {
        overview: 'LLM Serving 전용 Observability Stack입니다. TTFT, TPS, TPOT, Queue Depth 등 11개 커스텀 Prometheus 메트릭을 설계하고, 5개 부하 테스트 시나리오로 성능을 정량 분석했습니다. TTFT 213x 열화 발견으로 throughput만으로는 보이지 않는 queuing bottleneck을 canary metric으로 가시화했습니다.',

        keyFeatures: [
            '<strong>11개 LLM 전용 메트릭</strong>: TTFT, TPS, TPOT, Queue Depth, Active Requests 등',
            '<strong>MonitoredSemaphore</strong>: active_requests/queue_depth 실시간 추적',
            '<strong>5개 부하 테스트 시나리오</strong>: baseline, ramp-up, burst, sustained, stress',
            '<strong>10개 Grafana 패널</strong>: LLM 서빙 성능 실시간 시각화 대시보드',
            '<strong>TTFT 213x 열화 발견</strong>: canary metric으로 queuing bottleneck 가시화'
        ],

        technicalImplementation: [
            '<strong>Metrics</strong>: Prometheus (Histogram, Gauge, Counter)',
            '<strong>Visualization</strong>: Grafana (10 panels)',
            '<strong>Backend</strong>: FastAPI, Python',
            '<strong>LLM Runtime</strong>: Ollama',
            '<strong>Infra</strong>: Docker Compose',
            '<strong>Concurrency</strong>: MonitoredSemaphore (asyncio)'
        ],

        learningPoints: [
            'LLM Serving 환경에 특화된 Prometheus 메트릭 설계 역량 확보',
            'TTFT, TPS 등 LLM 전용 지표로 기존 웹 서버 메트릭과 차별화된 관측성 확보',
            'MonitoredSemaphore를 활용한 동시성 추적 패턴 학습',
            'Canary metric 개념을 통한 사전적 성능 병목 탐지 경험'
        ]
    }
};
