// ========================================
// Projects Data Module
// ========================================

import { cloudNativeV2Content } from './shared-content.js';

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
        featured: false,
        badge: 'Featured',
        title: 'Cloud-Native 마이크로서비스 플랫폼 v2.0',
        summary: 'Solid Cloud(단국대학교) 환경에서 Terraform을 활용한 인프라 자동화 및 GitOps 기반 완전 자동화된 마이크로서비스 플랫폼 구축',
        imageUrl: 'https://github.com/DvwN-Lee/Monitoring-v2/raw/main/docs/04-operations/screenshots/grafana-golden-signals.png',
        imageAlt: 'Kubernetes 기반 Cloud-Native 마이크로서비스 플랫폼 v2.0 아키텍처',
        tech: ['Kubernetes', 'Terraform', 'Istio', 'ArgoCD', 'GitHub Actions', 'Prometheus', 'Grafana', 'Loki', 'Trivy', 'Go', 'Python (FastAPI)'],
        highlights: [
            'Terraform(IaC)으로 Solid Cloud 인프라를 코드화하고, Kustomize로 환경별 설정을 분리하여 재현 가능한 운영 환경 구축',
            'GitHub Actions, Argo CD 기반 GitOps 파이프라인으로 <strong>Git Push 후 5분 내 자동 배포</strong> 달성',
            'CI 파이프라인에 <strong>Trivy 보안 스캔을 통합</strong>하여 빌드 단계에서 컨테이너 취약점을 자동으로 탐지 및 차단',
            'Istio Service Mesh의 <strong>mTLS STRICT 모드</strong>와 <strong>NetworkPolicy</strong>를 적용하여 Zero Trust Network 보안 아키텍처 구현',
            'Prometheus, Grafana, Loki 기반 통합 관측성 시스템을 구축하고, Golden Signals 대시보드로 <strong>P95 Latency 19.2ms, 에러율 0%</strong> 달성'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/Monitoring-v2',
        modalDetails: [
            {
                title: 'Overview',
                content: cloudNativeV2Content.modal.overview
            },
            {
                title: 'Key Features',
                items: cloudNativeV2Content.modal.keyFeatures
            },
            {
                title: 'Technical Implementation',
                items: cloudNativeV2Content.modal.technicalImplementation
            },
            {
                title: 'Learning Points',
                items: cloudNativeV2Content.modal.learningPoints
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
                title: 'Overview',
                content: '단국대학교 도산라운지 활성화를 위한 좌석 예약 및 관리 안드로이드 애플리케이션입니다. 경소톤(SW융합대학 X 경영경제대학 연합 해커톤)에서 <strong>동상을 수상</strong>했습니다.'
            },
            {
                title: 'Key Features',
                items: [
                    '도산라운지 위치 및 이용 안내',
                    '실시간 좌석 현황 확인 및 회의실 예약',
                    '공부 시간 측정 타이머 기능',
                    '공부 시간 기반 랭킹 시스템'
                ]
            },
            {
                title: 'Technical Implementation',
                items: [
                    'Firebase Realtime Database로 실시간 좌석 정보 동기화',
                    'Firebase Authentication으로 사용자 인증',
                    'Material Design 가이드라인 적용',
                    'Figma를 활용한 UI/UX 디자인'
                ]
            },
            {
                title: 'Team & Role',
                items: [
                    'Android 앱 개발 담당',
                    'Firebase, 백엔드 구축'
                ]
            }
        ]
    },
    {
        id: 'k8s_cicd',
        category: 'cloud',
        featured: false,
        badge: 'Featured',
        title: 'Kubernetes CI/CD Infrastructure',
        summary: 'CloudStack 환경에서 Terraform/Ansible 기반 Kubernetes 클러스터를 구축하고, Jenkins, GitLab, Docker Registry를 배포하여 완전한 CI/CD 파이프라인을 구현한 IaC 프로젝트',
        imageUrl: 'https://raw.githubusercontent.com/DvwN-Lee/k8s-cicd-automation/main/screenshots/testapp.png',
        imageAlt: 'Kubernetes CI/CD Infrastructure - Terraform과 Ansible 기반 자동화된 클러스터 구축',
        tech: ['Terraform', 'Ansible', 'Kubernetes', 'CloudStack', 'containerd', 'Cilium', 'MetalLB', 'Jenkins', 'GitLab', 'Docker Registry'],
        highlights: [
            'Terraform으로 CloudStack 인프라(VM 3대, Network, Port Forwarding)를 코드화하고 Ansible Inventory 자동 생성',
            'Ansible Playbook으로 <strong>containerd, Kubernetes v1.28.15, Cilium CNI, MetalLB</strong> 구성 자동화',
            'Jenkins + GitLab + Docker Registry 기반 <strong>Git Push to Deploy</strong> CI/CD 파이프라인 구축',
            'DevOps Node(GitLab/Jenkins/Registry)와 App Node를 분리하여 워크로드 격리 및 리소스 최적화'
        ],
        githubUrl: 'https://github.com/DvwN-Lee/k8s-cicd-automation',
        modalDetails: [
            {
                title: 'Overview',
                content: 'CloudStack 환경에서 Kubernetes 클러스터를 구축하고, Jenkins, GitLab, Docker Registry를 배포하여 완전한 CI/CD 파이프라인을 구현한 Infrastructure as Code 프로젝트입니다. Terraform으로 인프라를 프로비저닝하고, Ansible로 Kubernetes 클러스터 및 DevOps 도구를 자동 구성합니다.'
            },
            {
                title: 'Key Features',
                items: [
                    '<strong>Infrastructure as Code</strong>: Terraform으로 CloudStack VM, Network, Port Forwarding 규칙을 선언적으로 관리',
                    '<strong>Configuration Automation</strong>: Ansible Roles로 containerd, Kubernetes, CNI, Load Balancer 설치 자동화',
                    '<strong>Complete CI/CD Stack</strong>: Jenkins Pipeline + GitLab SCM + Docker Registry로 빌드/푸시/배포 자동화',
                    '<strong>Production-Ready Networking</strong>: Cilium CNI(kube-proxy 대체 모드) + MetalLB L2 모드로 클러스터 네트워킹 구성'
                ]
            },
            {
                title: 'Infrastructure Architecture',
                items: [
                    '<strong>k8s-m (Control Plane)</strong>: 2 CPU, 4GB RAM - Kubernetes API Server, etcd, Scheduler',
                    '<strong>k8s-w1 (DevOps Node)</strong>: 4 CPU, 8GB RAM - GitLab, Jenkins, Docker Registry 배치',
                    '<strong>k8s-w2 (App Node)</strong>: 2 CPU, 4GB RAM - Application 워크로드 전용'
                ]
            },
            {
                title: 'Technical Stack',
                items: [
                    'Terraform (CloudStack Provider) - 인프라 프로비저닝',
                    'Ansible (Roles 기반) - 구성 관리 자동화',
                    'Kubernetes v1.28.15 + containerd v1.7.2',
                    'Cilium v1.14.5 (CNI) + MetalLB v0.13.12 (LB)',
                    'Jenkins + GitLab CE + Docker Registry'
                ]
            },
            {
                title: 'Learning Points',
                items: [
                    'Terraform과 Ansible을 연계한 Infrastructure as Code 파이프라인 설계',
                    'kubeadm 기반 Kubernetes 클러스터 수동 구축 및 트러블슈팅',
                    'Cilium eBPF 기반 CNI와 MetalLB LoadBalancer 구성',
                    'Jenkins Pipeline을 통한 컨테이너 빌드/배포 자동화'
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
                title: 'Overview',
                content: 'Go와 Python FastAPI를 사용한 마이크로서비스 아키텍처 기반 실시간 모니터링 플랫폼입니다. 커스텀 로드밸런서와 통계 집계 시스템을 구축하여 100 RPS 이상의 트래픽을 안정적으로 처리합니다.'
            },
            {
                title: 'Key Achievements',
                items: [
                    '<strong>고성능 로드밸런서</strong>: Go 고루틴 기반 비동기 처리로 100 RPS 이상 안정적 처리',
                    '<strong>장애 격리</strong>: 타임아웃 2초 설정으로 서비스 간 장애 전파 차단',
                    '<strong>실시간 대시보드</strong>: WebSocket을 통한 실시간 RPS, 응답시간, 서비스 상태 시각화',
                    '<strong>환경별 배포</strong>: Kustomize로 개발/운영 환경 매니페스트 분리 관리'
                ]
            },
            {
                title: 'Tech Stack',
                items: ['Go (Golang)', 'Python FastAPI', 'Kubernetes', 'Kustomize', 'JavaScript', 'WebSocket', 'Redis']
            },
            {
                title: 'Architecture',
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
                title: 'Overview',
                content: 'Django 프레임워크를 기반으로 구축한 온라인 시험 출제 및 채점 시스템입니다.'
            },
            {
                title: 'Key Features',
                items: [
                    '시험 문제 출제 및 관리 (문제 은행)',
                    '역할 기반 사용자 관리 (학생, 교사, 관리자)',
                    '실시간 시험 진행 및 자동 채점',
                    '성적 조회 및 통계'
                ]
            },
            {
                title: 'Technical Implementation',
                items: [
                    'Django MTV 패턴 이해 및 적용',
                    'Django ORM을 활용한 데이터베이스 설계',
                    'Django Admin을 활용한 백엔드 관리 시스템 구축',
                    'jQuery, Bootstrap을 활용한 클라이언트 UI',
                    'MySQL 데이터베이스 활용'
                ]
            },
            {
                title: 'Learning Points',
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
                title: 'Overview',
                content: 'Spring Boot, Thymeleaf, WebSocket(STOMP)을 사용하여 구축한 간단한 실시간 채팅 애플리케이션입니다.'
            },
            {
                title: 'Key Features',
                items: [
                    'WebSocket/STOMP 기반 실시간 메시지 전송 및 수신',
                    '사용자 이름 입력으로 채팅방 접속',
                    'Spring Data JPA를 통한 메시지 및 사용자 정보 데이터베이스 영속화',
                    'Thymeleaf와 JavaScript(SockJS, STOMP.js)를 활용한 동적 채팅 UI 구현',
                    '채팅 메시지 전송 시간 표시'
                ]
            },
            {
                title: 'Tech Stack',
                items: ['Spring Boot', 'Spring WebSocket', 'JPA', 'Thymeleaf', 'JavaScript', 'STOMP', 'MySQL', 'Gradle']
            },
            {
                title: 'Learning Points',
                items: [
                    'Spring Boot 환경에서 WebSocket 연동 및 STOMP 메시지 브로커 설정',
                    'JPA를 활용한 엔티티(User, Message) 설계 및 리포지토리 구현',
                    'Thymeleaf를 이용한 서버 사이드 렌더링과 JavaScript(SockJS, STOMP.js)를 통한 클라이언트-서버 비동기 통신'
                ]
            }
        ]
    }
];