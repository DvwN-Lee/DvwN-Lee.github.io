// ========================================
// Problem Solving Data Module
// ========================================

import { fAInancialAgentContent, llmObservabilityContent } from './shared-content.js';

export const problemSolvingData = [
    {
        id: 'financial-agent',
        title: 'LangGraph + MCP 기반 금융 분석 AI Agent 설계',
        subtitle: 'fAInancial-agent: while loop → LangGraph StateGraph 진화, MCP Protocol 기반 도구 분리',
        tags: ['LangGraph', 'MCP', 'RAG', 'FAISS', 'LangFuse', 'FastAPI'],
        ...fAInancialAgentContent
    },
    {
        id: 'llm-observability',
        title: 'LLM Serving 전용 Observability Stack 구축',
        subtitle: 'obLLMa: LLM 전용 메트릭 설계, TTFT canary metric 발굴',
        tags: ['Prometheus', 'Grafana', 'FastAPI', 'Ollama', 'Docker'],
        ...llmObservabilityContent
    },
    {
        id: 'ai-exam-platform',
        title: 'Multi-Agent 시험 플랫폼 구축',
        subtitle: 'exam-platform: Full-Stack 재작성, TDD 3계층 테스트 전략, Service Layer Pattern',
        tags: ['Django', 'React', 'TypeScript', 'PostgreSQL', 'pytest', 'TDD'],
        situation: 'Legacy 온라인 시험 시스템의 구조적 한계(테스트 부재, View에 혼재된 비즈니스 로직, N+1 쿼리)를 해결하기 위해 Full-Stack 재작성이 필요했습니다.',
        tasks: [
            '<strong>Full-Stack 재작성</strong>: Legacy Django → Django LTS + React Full-Stack으로 완전 전환.',
            '<strong>TDD 3계층 테스트 전략</strong>: Unit/Integration/E2E 테스트로 안정적인 변경 안전망 구축.',
            '<strong>Service Layer Pattern</strong>: 비즈니스 로직과 View를 분리하여 테스트 용이성 및 재사용성 향상.'
        ],
        actions: [
            '<strong>Service Layer Pattern 도입</strong>: View에 혼재되어 있던 비즈니스 로직을 Service Layer로 분리하여 단일 책임 원칙을 적용하고, 테스트 가능한 구조로 전환했습니다.',
            '<strong>TDD Red-Green-Refactor 사이클 적용</strong>: pytest + Playwright 기반 Unit/Integration/E2E 3계층 테스트 전략을 구축하여 코드 변경 시 안전망을 확보했습니다.',
            '<strong>DB 최적화</strong>: N+1 쿼리 해결(select_related/prefetch_related), 복합 인덱스 전략 수립, Connection Pool 튜닝으로 DB 접근 횟수를 대폭 감소시켰습니다.'
        ],
        results: [
            '<strong>아키텍처 현대화 완료</strong>: Django LTS + React Full-Stack으로 완전 전환하여 유지보수성과 확장성을 확보했습니다.',
            '<strong>TDD 기반 품질 보증 체계 확립</strong>: Unit/Integration/E2E 3계층 테스트로 코드 변경 시 안전망을 확보하고 리팩토링 자신감을 확보했습니다.',
            '<strong>DB 성능 최적화</strong>: N+1 쿼리 해결과 복합 인덱스로 DB 접근 횟수를 대폭 감소시켜 응답 속도를 개선했습니다.'
        ]
    }
];
