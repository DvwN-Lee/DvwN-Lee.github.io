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
        subtitle: 'llm-serving-observability: 11개 LLM 메트릭 설계, TTFT 213x 열화 발견',
        tags: ['Prometheus', 'Grafana', 'FastAPI', 'Ollama', 'Docker'],
        ...llmObservabilityContent
    },
    {
        id: 'ai-exam-platform',
        title: 'Multi-Agent 시험 플랫폼 구축',
        subtitle: 'AI-exam-platform: 5 MCP 서버 통합, Multi-Agent consensus/VETO 프로토콜',
        tags: ['MCP', 'Multi-Agent', 'Django 5.2', 'React 19', 'TDD'],
        situation: 'Legacy 온라인 시험 시스템을 AI Agent 기반으로 전환해야 했습니다. 5개 도메인별 도구를 Agent에 통합하고, 복수 Agent 간 합의 메커니즘이 필요했으며, 957개 테스트로 검증된 안정적인 Full-Stack 시스템이 요구되었습니다.',
        tasks: [
            '<strong>5 MCP 서버 통합</strong>: 시험 출제, 채점, 분석 등 도메인별 MCP 서버를 Agent 생태계에 통합.',
            '<strong>Multi-Agent 합의 메커니즘</strong>: consensus/VETO 프로토콜로 Agent 간 품질 게이트 구현.',
            '<strong>TDD 기반 Full-Stack 마이그레이션</strong>: Django 5.2 + React 19로 완전 재작성, 957 tests (95% coverage).'
        ],
        actions: [
            '<strong>5 MCP 서버 아키텍처 설계</strong>: 시험 출제, 채점, 분석, 피드백, 관리 도메인별 MCP 서버를 구축하고, Agent가 MCP Protocol을 통해 도구를 발견/호출하는 구조를 구현했습니다.',
            '<strong>Multi-Agent consensus/VETO 프로토콜 구현</strong>: Generator → Critic → Refiner 파이프라인에서 각 Agent가 결과를 검토하고, VETO 권한을 행사할 수 있는 합의 메커니즘을 구축했습니다.',
            '<strong>TDD Red-Green-Refactor 사이클 적용</strong>: pytest + Playwright 기반 Unit/Integration/E2E 3계층 테스트 전략으로 957개 테스트, 95% 커버리지를 달성했습니다.'
        ],
        results: [
            '<strong>5 MCP 서버 통합 완료</strong>: 도메인별 도구를 독립 MCP 서버로 분리하여 Agent 도구 생태계를 구축했습니다.',
            '<strong>Multi-Agent 품질 게이트 확립</strong>: VETO 프로토콜로 Agent 간 합의 기반 품질 보증 메커니즘을 구현했습니다.',
            '<strong>957 tests, 95% coverage 달성</strong>: TDD 기반으로 코드 변경 시 안전망을 확보하고, 리팩토링 자신감을 확보했습니다.'
        ]
    }
];
