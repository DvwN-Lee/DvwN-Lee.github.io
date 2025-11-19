// ========================================
// Projects Data Module
// ========================================

/**
 * 프로젝트 데이터 스키마
 * @typedef {Object} Project
 * @property {string} id - 프로젝트 고유 ID
 * @property {string} category - 카테고리 ('all', 'cloud', 'backend', 'fullstack')
 * @property {boolean} featured - Featured 프로젝트 여부
 * @property {string} badge - 뱃지 텍스트
 * @property {string} title - 프로젝트 제목
 * @property {string} summary - 프로젝트 요약
 * @property {string} imageUrl - 프로젝트 이미지 URL
 * @property {string} imageAlt - 이미지 alt 텍스트
 * @property {string[]} tech - 사용 기술 스택 배열
 * @property {string[]} highlights - 프로젝트 하이라이트 목록
 * @property {string} githubUrl - GitHub 저장소 URL
 * @property {string} modalContent - 모달 상세 내용 (HTML)
 */

/**
 * 전체 프로젝트 데이터
 * @type {Project[]}
 */
export const projectsData = [
    {
        id: 'cloudnative_v2',
        category: 'cloud',
        featured: true,
        badge: 'Featured',
        title: 'Cloud-Native 마이크로서비스 플랫폼 v2.0',
        summary: 'Solid Cloud(단국대학교) 환경에서 Terraform을 활용한 인프라 자동화 및 GitOps 기반 완전 자동화된 마이크로서비스 플랫폼 구축',
        imageUrl: 'https://github.com/DvwN-Lee/Monitoring-v2/raw/main/docs/04-operations/screenshots/grafana-golden-signals.png',
        imageAlt: 'Kubernetes 기반 Cloud-Native 마이크로서비스 플랫폼 v2.0 아키텍처',
        tech: ['Kubernetes', 'Terraform', 'Istio', 'Prometheus', 'ArgoCD', 'GitHub Actions'],
        highlights: [
            'Terraform으로 Solid Cloud 인프라를 코드 기반 관리, Kustomize로 환경별(local/cloud) 설정 분리하여 재현 가능한 개발/운영 환경 구축',
            'GitHub Actions + Argo CD 기반 GitOps 파이프라인 구축으로 Git Push 후 5분 내 Kubernetes 클러스터 자동 배포 달성',
            'Istio Service Mesh 도입 및 mTLS STRICT 모드 적용으로 Zero Trust Network 기반 보안 환경 구축',
            'Prometheus/Grafana 기반 관측성 시스템 구축, Golden Signals 대시보드로 정량적 분석 (P95 Latency 19.2ms, Error Rate 0%)',
            'k6 부하 테스트 기반 성능 분석 및 Kubernetes HPA 최적화로 응답 시간 11.6% 개선, 안정적인 트래픽 처리 역량 확보'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/Monitoring-v2',
        modalDetails: [
            {
                title: 'Situation (문제 상황)',
                content: `단독으로 진행한 'Monitoring-v2' 프로젝트는 기존 시스템(v1)의 수동적이고 비효율적인 운영 방식을 개선해야 하는 과제가 있었습니다. 인프라 변경은 수작업으로 이루어져 휴먼 에러 가능성이 높았고, 배포 프로세스는 복잡하고 느렸습니다. 또한, 서비스 간 통신 보안이 확보되지 않았으며, 시스템 장애나 성능 저하 발생 시 원인을 빠르게 파악할 수 있는 관측 가능성이 부재한 상태였습니다.`
            },
            {
                title: 'Task (과업 목표)',
                listType: 'ol',
                items: [
                    '<strong>인프라 프로비저닝 자동화</strong>: 수작업을 최소화하고 일관된 인프라 환경을 구축.',
                    '<strong>배포 파이프라인 자동화</strong>: Git Push만으로 5분 내에 안전하게 애플리케이션을 배포.',
                    '<strong>강력한 서비스 보안 체계 구축</strong>: Zero Trust Network 원칙에 기반한 서비스 간 통신 암호화.',
                    '<strong>관측 가능성 시스템 구축 및 성능 최적화</strong>: 실시간 모니터링 및 부하 테스트를 통해 병목 현상을 찾아내고, 시스템 성능을 10% 이상 개선.'
                ]
            },
            {
                title: 'Action (구체적인 해결 과정)',
                items: [
                    '<strong>Terraform 도입으로 인프라 코드화(IaC)</strong>: Solid Cloud(OpenStack) 환경의 모든 인프라(네트워크, 스토리지, VM 등)를 코드로 정의하여, 명령어 하나로 전체 인프라를 일관되게 생성하고 관리할 수 있는 기반을 마련했습니다.',
                    '<strong>GitOps 파이프라인 구축</strong>: GitHub Actions로 CI(Docker Image 빌드 및 푸시)를 자동화하고, ArgoCD를 이용해 Git Repository의 Manifest 파일을 기준으로 Kubernetes 클러스터 상태를 동기화하는 CD 파이프라인을 구축했습니다. 이를 통해 <strong>Git Push 후 5분 내 배포</strong>라는 목표를 달성했습니다.',
                    '<strong>Istio Service Mesh 도입</strong>: 모든 서비스 Pod에 Envoy Proxy를 Sidecar로 주입하고, mTLS STRICT 모드를 적용하여 클러스터 내 모든 통신을 상호 인증 및 암호화했습니다. 이를 통해 코드 수정 없이 Zero Trust Network를 구현했습니다.',
                    '<strong>통합 관측 가능성 시스템 구축</strong>: Prometheus로 실시간 메트릭을 수집하고, Loki로 로그를 중앙화했으며, Grafana를 통해 이를 시각화했습니다. 이를 통해 시스템의 모든 상태를 한눈에 파악할 수 있게 되었습니다.',
                    '<strong>k6 부하 테스트 기반 HPA 튜닝</strong>: k6 스크립트로 실제와 유사한 트래픽 시나리오를 작성하여 부하 테스트를 진행했습니다. 테스트 결과 드러난 CPU 병목 현상을 기반으로 Horizontal Pod Autoscaler(HPA)의 임계값을 정밀하게 튜닝하여 불필요한 리소스 낭비를 줄이고 안정적인 응답성을 확보했습니다.'
                ]
            },
            {
                title: 'Result (결과 및 성과)',
                items: [
                    '<strong>배포 시간 단축</strong>: 수동으로 수십 분 걸리던 배포가 <strong>Git Push 후 평균 5분</strong>으로 단축되었습니다.',
                    '<strong>성능 개선</strong>: HPA 최적화를 통해 부하 테스트 시 <strong>평균 응답 시간이 11.6% 개선</strong>되었습니다.',
                    '<strong>시스템 안정성 확보</strong>: <strong>P95 Latency 19.2ms, Error Rate 0%</strong>라는 높은 수준의 안정성을 달성했습니다.',
                    '<strong>운영 효율성 및 보안 강화</strong>: 인프라 및 배포 자동화로 운영 부담이 크게 줄었으며, mTLS 적용으로 높은 수준의 서비스 보안을 확보했습니다.'
                ]
            }
        ]
    },
    {
        id: 'dorazy',
        category: 'fullstack',
        featured: false,
        badge: '🥉 경소톤 동상',
        title: 'Dorazy - 도서관 예약 시스템',
        summary: '단국대학교 도산라운지 좌석 예약 및 관리 앱',
        imageUrl: 'https://user-images.githubusercontent.com/87077859/215061094-6b72ec52-0713-4ebf-81a5-744469bb7fd1.jpg',
        imageAlt: 'Dorazy 도서관 예약 시스템 모바일 앱 스크린샷',
        tech: ['Android', 'Kotlin', 'Firebase', 'Figma'],
        highlights: [
            'Firebase(BaaS) 활용 서버리스 아키텍처 및 실시간 데이터 처리 구현',
            'Android/Kotlin 개발 경험으로 모바일 애플리케이션 빌드 및 배포 파이프라인 이해',
            '해커톤 환경에서 빠른 프로토타이핑 및 팀 협업 역량 검증',
            'Figma 기반 UI/UX 설계를 통한 개발-디자인 협업 프로세스 경험'
        ],
        githubUrl: 'https://github.com/kimyeonhong00/dorazy.git',
        modalDetails: [
            {
                title: '프로젝트 개요',
                content: '단국대학교 도산라운지 활성화를 위한 좌석 예약 및 관리 안드로이드 애플리케이션입니다. 경소톤(SW융합대학 X 경영경제대학 연합 해커톤)에서 <strong>동상을 수상</strong>했습니다.'
            },
            {
                title: '주요 기능',
                items: [
                    '도산라운지 위치 및 이용 안내',
                    '실시간 좌석 현황 확인 및 회의실 예약',
                    '공부 시간 측정 타이머 기능',
                    '공부 시간 기반 랭킹 시스템'
                ]
            },
            {
                title: '기술적 구현',
                isArchitecture: true,
                items: [
                    'Firebase Realtime Database로 실시간 좌석 정보 동기화',
                    'Firebase Authentication으로 사용자 인증',
                    'Material Design 가이드라인 적용',
                    'Figma를 활용한 UI/UX 디자인'
                ]
            },
            {
                title: '팀 구성 및 역할',
                isArchitecture: true,
                items: [
                    'Android 앱 개발 담당',
                    'Firebase, 백엔드 구축'
                ]
            }
        ]
    },
    {
        id: 'cloudnative_v1',
        category: 'cloud',
        featured: false,
        badge: '',
        title: '실시간 마이크로서비스 모니터링 플랫폼',
        summary: 'Go, FastAPI, K8s 기반 실시간 모니터링 대시보드',
        imageUrl: 'https://github.com/user-attachments/assets/9a7b890b-1d7c-4c96-826f-e019df475dfb',
        imageAlt: 'Go와 FastAPI 기반 실시간 마이크로서비스 모니터링 대시보드',
        tech: ['Go (Golang)', 'Python (FastAPI)', 'Kubernetes', 'Kustomize', 'JavaScript', 'Redis'],
        highlights: [
            'Go 언어와 고루틴을 활용한 커스텀 로드밸런서 및 Stats Aggregator 개발 (타임아웃 2초로 장애 전파 차단)',
            'Kustomize base/overlay 패턴으로 개발/운영 환경별 Kubernetes 매니페스트 선언적 관리',
            'Go + Python FastAPI 마이크로서비스 아키텍처 설계 (100 RPS 성능 목표 검증)',
            'Vanilla JS + WebSocket 통신 기반 실시간 모니터링 대시보드 구축 (RPS, 응답시간, 서비스 상태 시각화)',
            '각 서비스의 통계를 병렬 수집하는 프록시/집계 패턴으로 관측 가능성 확보'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/Monitoring',
        modalDetails: [
            {
                title: '프로젝트 개요',
                content: 'Go와 Python FastAPI를 사용한 마이크로서비스 아키텍처 기반 실시간 모니터링 플랫폼입니다. 커스텀 로드밸런서와 통계 집계 시스템을 구축하여 100 RPS 이상의 트래픽을 안정적으로 처리합니다.'
            },
            {
                title: '핵심 성과',
                items: [
                    '<strong>고성능 로드밸런서</strong>: Go 고루틴 기반 비동기 처리로 100 RPS 이상 안정적 처리',
                    '<strong>장애 격리</strong>: 타임아웃 2초 설정으로 서비스 간 장애 전파 차단',
                    '<strong>실시간 대시보드</strong>: WebSocket을 통한 실시간 RPS, 응답시간, 서비스 상태 시각화',
                    '<strong>환경별 배포</strong>: Kustomize로 개발/운영 환경 매니페스트 분리 관리'
                ]
            },
            {
                title: '기술 스택',
                type: 'techStack',
                items: ['Go (Golang)', 'Python FastAPI', 'Kubernetes', 'Kustomize', 'JavaScript', 'WebSocket', 'Redis']
            },
            {
                title: '아키텍처',
                isArchitecture: true,
                items: [
                    'Go 기반 커스텀 로드밸런서 및 Stats Aggregator',
                    'Python FastAPI 마이크로서비스 (여러 백엔드 서비스)',
                    'Vanilla JavaScript + WebSocket 실시간 대시보드',
                    'Redis 기반 통계 데이터 캐싱',
                    'Kubernetes 오케스트레이션 및 Kustomize 기반 배포 관리'
                ]
            }
        ]
    },
    {
        id: 'exam',
        category: 'backend',
        featured: false,
        badge: '',
        title: '온라인 시험 관리 시스템',
        summary: 'Django 기반 온라인 시험 출제 및 채점 시스템',
        imageUrl: 'https://github.com/DvwN-Lee/OnlineExam/raw/main/images/Main.png',
        imageAlt: 'Django 기반 온라인 시험 출제 및 채점 관리 시스템',
        tech: ['Django', 'MySQL', 'jQuery', 'Bootstrap'],
        highlights: [
            'Django 프레임워크를 활용한 풀스택 웹 애플리케이션 개발 및 MySQL 데이터베이스 연동',
            '관리자, 교사, 학생 3가지 역할에 따른 역할 기반 접근 제어(RBAC) 시스템 설계 및 구현',
            '사용자, 문제, 시험지, 시험 관리 등 4가지 핵심 모듈로 구성된 복잡한 도메인 로직 처리',
            'Django Admin 커스터마이징으로 시스템 운영 및 데이터 관리 효율성 증대'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/onlineexam',
        modalDetails: [
            {
                title: '프로젝트 개요',
                content: 'Django 프레임워크를 기반으로 구축한 온라인 시험 출제 및 채점 시스템입니다.'
            },
            {
                title: '주요 기능',
                items: [
                    '시험 문제 출제 및 관리 (문제 은행)',
                    '역할 기반 사용자 관리 (학생, 교사, 관리자)',
                    '실시간 시험 진행 및 자동 채점',
                    '성적 조회 및 통계'
                ]
            },
            {
                title: '기술적 구현',
                isArchitecture: true,
                items: [
                    'Django MTV 패턴 이해 및 적용',
                    'Django ORM을 활용한 데이터베이스 설계',
                    'Django Admin을 활용한 백엔드 관리 시스템 구축',
                    'jQuery, Bootstrap을 활용한 클라이언트 UI',
                    'MySQL 데이터베이스 활용'
                ]
            },
            {
                title: '학습 포인트',
                isArchitecture: true,
                items: [
                    'Django MTV 패턴 이해 및 적용',
                    '관계형 데이터베이스(MySQL) 모델링',
                    '기본적인 웹 프론트엔드(jQuery)와 백엔드(Django) 연동'
                ]
            }
        ]
    },
    {
        id: 'demochat',
        category: 'backend',
        featured: false,
        badge: '',
        title: 'SimpleChat - 실시간 채팅 앱',
        summary: 'Spring Boot와 WebSocket 기반 실시간 채팅 프로젝트',
        imageUrl: 'https://github.com/DvwN-Lee/DemoChat/raw/main/images/chat_2.png',
        imageAlt: 'Spring Boot와 WebSocket 기반 실시간 채팅 애플리케이션',
        tech: ['Spring Boot', 'WebSocket', 'JPA', 'Thymeleaf', 'MySQL'],
        highlights: [
            'Spring Boot 환경에서 WebSocket 프로토콜을 활용한 실시간 양방향 메시징 시스템 구축',
            'Spring Data JPA를 통해 실시간 채팅 메시지를 MySQL 데이터베이스에 안정적으로 저장 및 관리',
            'Thymeleaf 템플릿 엔진과 JavaScript를 연동하여 동적인 실시간 채팅 UI 구현',
            '사용자 이름 및 메시지 내용 유효성 검사 등 서버 측 예외 처리로 시스템 안정성 확보'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/demochat',
        modalDetails: [
            {
                title: '프로젝트 개요',
                content: 'Spring Boot, Thymeleaf, WebSocket(STOMP)을 사용하여 구축한 간단한 실시간 채팅 애플리케이션입니다.'
            },
            {
                title: '주요 기능',
                items: [
                    'WebSocket/STOMP 기반 실시간 메시지 전송 및 수신',
                    '사용자 이름 입력으로 채팅방 접속',
                    'Spring Data JPA를 통한 메시지 및 사용자 정보 데이터베이스 영속화',
                    'Thymeleaf와 JavaScript(SockJS, STOMP.js)를 활용한 동적 채팅 UI 구현',
                    '채팅 메시지 전송 시간 표시'
                ]
            },
            {
                title: '기술 스택',
                type: 'techStack',
                items: ['Spring Boot', 'Spring WebSocket', 'JPA', 'Thymeleaf', 'JavaScript', 'STOMP', 'MySQL', 'Gradle']
            },
            {
                title: '학습 포인트',
                isArchitecture: true,
                items: [
                    'Spring Boot 환경에서 WebSocket 연동 및 STOMP 메시지 브로커 설정',
                    'JPA를 활용한 엔티티(User, Message) 설계 및 리포지토리 구현',
                    'Thymeleaf를 이용한 서버 사이드 렌더링과 JavaScript(SockJS, STOMP.js)를 통한 클라이언트-서버 비동기 통신'
                ]
            }
        ]
    }
];