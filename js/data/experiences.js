// ========================================
// Experiences Data Module
// ========================================

/**
 * 경력/타임라인 아이템 데이터 스키마
 * @typedef {Object} Experience
 * @property {string} date - 날짜 또는 기간
 * @property {string} title - 제목
 * @property {string} subtitle - 부제목
 * @property {string[]} achievements - 성과 목록
 */

/**
 * 전체 경력 데이터
 * @type {Experience[]}
 */
export const experiencesData = [
  {
    date: '2026.02',
    title: 'exam-platform - 온라인 시험 플랫폼',
    subtitle: '개인 프로젝트 - Legacy 시스템 Full-Stack 재작성',
    achievements: [
      'Legacy Django 2.1/Python 3.6/jQuery를 Django 5.2 LTS/Python 3.14/React 19로 완전 재작성',
      'TDD 방법론 적용 - pytest + Playwright 기반 Backend 303개 테스트 (92% 커버리지)',
      'Service Layer Pattern 도입으로 비즈니스 로직과 View 분리',
      'N+1 쿼리 최적화로 Database 접근 70% 감소 (10→3회)',
      'JWT HttpOnly Cookie + RBAC Frontend/Backend 이중 검증으로 보안 강화',
      'PostgreSQL, MongoDB, Redis Multi-Database 아키텍처 구성'
    ]
  },
  {
    date: '2026.02',
    title: 'GCP 기반 Cloud-Native 모니터링 플랫폼',
    subtitle: '개인 프로젝트 - GCP 환경 (v2.0 고도화)',
    achievements: [
      'Terraform으로 GCP 리소스 전체(VPC, Firewall, VM, Secret Manager) 코드화',
      'ArgoCD App of Apps 패턴으로 Infrastructure/Application Apps 계층적 관리',
      'External Secrets Operator + GCP Secret Manager 연동으로 Secret 자동 동기화',
      'Istio mTLS + GCP Firewall + NetworkPolicy 조합한 Zero Trust Network 구현',
      'K3s v1.31 경량 Kubernetes 환경에서 Prometheus/Grafana/Loki 관측성 스택 구축'
    ]
  },
  {
    date: '2025.12',
    title: 'Cloud-Native 마이크로서비스 플랫폼 v2.0',
    subtitle: '개인 프로젝트 - Solid Cloud 환경 (v1.0 고도화)',
    achievements: [
      'Terraform으로 Solid Cloud 인프라 코드 기반 관리, Kustomize로 환경별 설정 분리',
      'GitHub Actions + Argo CD 기반 GitOps 파이프라인 (Git Push 후 5분 내 자동 배포)',
      'Istio Service Mesh 도입 및 mTLS STRICT 모드 적용 (Zero Trust Network)',
      'Prometheus/Grafana/Loki 관측성 시스템 구축 (Grafana 실측 P95 9.77ms / P99 19.8ms, k6 P95 74.76ms / 에러율 0.01%)',
      'k6 부하 테스트 기반 Kubernetes HPA 최적화 (P99 Latency 94% 감소: 3.71s → 238ms, 5xx 에러 완전 제거)'
    ]
  },
  {
    date: '2025.09',
    title: 'Cloud-Native 마이크로서비스 모니터링 플랫폼',
    subtitle: 'Go, FastAPI, K8s 기반 MSA 프로젝트',
    achievements: [
      'Go 고루틴 기반 커스텀 로드밸런서 및 Stats Aggregator 개발 (장애 전파 차단)',
      'FastAPI로 Auth/User/Blog 마이크로서비스 구현 (Redis Cache-Aside, SQLite 연동)',
      'Kustomize base/overlay 패턴으로 환경별 K8s 매니페스트 관리',
      'Vanilla JS + Chart.js + WebSocket으로 실시간 모니터링 대시보드 UI 구현',
      '프록시/집계 패턴으로 각 서비스 통계를 병렬 수집하여 관측 가능성 확보'
    ]
  },
  {
    date: '2023.06',
    title: '온라인 시험 관리 시스템 개발',
    subtitle: 'Django 기반 풀스택 웹 애플리케이션 프로젝트',
    achievements: [
      'Django 프레임워크를 활용한 풀스택 웹 애플리케이션 개발 및 MySQL 데이터베이스 연동',
      '관리자, 교사, 학생 3가지 역할을 가진 사용자 모델 설계 및 Django Admin 기반 운영 인터페이스 구현',
      '사용자, 문제, 시험지, 시험 관리 등 4가지 핵심 모듈로 구성된 도메인 로직 처리',
      'Django Admin 커스터마이징을 통한 시스템 운영 및 데이터 관리 효율화'
    ]
  },
  {
    date: '2023.05',
    title: 'SimpleChat 실시간 채팅 앱 개발',
    subtitle: 'Spring Boot, WebSocket 기반 개인 프로젝트',
    achievements: [
      'Spring Boot에서 WebSocket 프로토콜을 활용한 실시간 양방향 메시징 시스템 구축',
      'Spring Data JPA를 통해 채팅 메시지를 MySQL 데이터베이스에 저장 및 관리',
      'Thymeleaf 템플릿 엔진과 JavaScript 연동으로 동적인 채팅 UI 구현',
      '사용자 입력 유효성 검사 및 서버 측 예외 처리로 시스템 안정성 확보'
    ]
  },
  {
    date: '2022.08',
    title: '경소톤 해커톤 동상 수상',
    subtitle: 'SW융합대학 X 경영경제대학 연합 해커톤',
    achievements: [
      'Firebase(BaaS)를 활용한 서버리스 아키텍처 경험 및 실시간 데이터 처리 능력',
      'Android/Kotlin 개발 경험을 통해 모바일 애플리케이션의 빌드 및 배포 파이프라인에 대한 이해 보유',
      '해커톤 환경에서의 빠른 프로토타이핑 및 팀 협업 역량 검증',
      'Figma 기반 UI/UX 설계를 통한 개발-디자인 협업 프로세스 경험'
    ]
  },
  {
    date: '2021.03 ~ 현재',
    title: '단국대학교 컴퓨터공학과',
    subtitle: '학부 재학 중',
    achievements: [
      '클라우드 컴퓨팅 집중 학습',
      '컴퓨터공학과 2022년도 부회장',
      '다수 프로젝트 리더 경험',
      '아키텍처 설계 경험',
      '체계적 문서화 진행'
    ]
  }
];
