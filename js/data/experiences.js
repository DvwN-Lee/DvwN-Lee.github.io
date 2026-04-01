// ========================================
// Experiences Data Module
// ========================================

export const experiencesData = [
  {
    date: '2025.12 ~ 2026.03',
    title: 'fAInancial-agent + LLM Observability',
    subtitle: 'AI Agent 시스템 설계 및 LLM Infra 구축',
    category: 'AI Agent',
    achievements: [
      'LangGraph StateGraph + MCP Protocol 기반 한국 금융 데이터 분석 AI Agent 설계/구현',
      'Voyage AI 임베딩 + FAISS 벡터 검색으로 DART 공시 문서 RAG 파이프라인 구축',
      'LangFuse v3 self-hosted tracing 통합, RAGAS faithfulness 평가 달성',
      'LLM Serving 전용 Prometheus 메트릭 설계 (TTFT, TPS, TPOT, Queue Depth 등)',
      '단계별 부하 테스트 시나리오로 LLM 서빙 성능 정량 분석, TTFT canary metric 발굴'
    ]
  },
  {
    date: '2025.09 ~ 2026.02',
    title: 'Monitoring Platform v1 → v2 → v3',
    subtitle: 'Cloud-Native Platform 진화 시리즈',
    category: 'Platform Engineering',
    achievements: [
      'v1: Go 커스텀 Gateway → v2: Istio Service Mesh → v3: GCP + Terratest 다단계',
      'Terraform IaC + ArgoCD GitOps Pipeline 구축',
      'k6 부하 테스트 기반 HPA 튜닝으로 P99 Latency 대폭 개선',
      'Terratest 다단계 검증 체계로 인프라 자동 검증'
    ]
  },
  {
    date: '2025.12 ~ 2026.02',
    title: 'exam-platform Full-Stack 재구현',
    subtitle: 'Django LTS + React Full-Stack 재작성, TDD 전략',
    category: 'Full-Stack Development',
    achievements: [
      'Legacy Django → Django LTS + React Full-Stack 완전 재작성',
      'TDD 기반 Unit/Integration/E2E 3계층 테스트 전략 구축',
      'Service Layer Pattern 도입, N+1 쿼리 최적화로 DB 접근 대폭 감소'
    ]
  },
  {
    date: '2025.05 ~ 2026.02',
    title: 'D-Lab Coding Academy',
    subtitle: 'Python 프로그래밍 강사',
    category: 'Teaching',
    achievements: [
      'Python 기초/응용 프로그래밍 강의',
      '학생 개별 프로젝트 멘토링'
    ]
  }
];
