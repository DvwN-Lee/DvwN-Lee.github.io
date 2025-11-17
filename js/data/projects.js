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
        imageUrl: 'https://raw.githubusercontent.com/DvwN-Lee/Monitoring-v2/main/docs/04-operations/screenshots/grafana-golden-signals.png',
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
        modalContent: `
            <h2>프로젝트 개요</h2>
            <p>로컬 환경에서 운영되던 마이크로서비스를 클라우드 네이티브 아키텍처로 완전히 재구축한 프로젝트입니다.
            5주간의 개발 기간 동안 Must-Have 100%, Should-Have 100%를 달성했습니다.</p>

            <h3>핵심 성과</h3>
            <ul>
                <li><strong>완전 자동화된 CI/CD</strong>: Git Push부터 프로덕션 배포까지 5분 이내 완료</li>
                <li><strong>실시간 모니터링</strong>: Prometheus + Grafana로 Golden Signals 대시보드 구축</li>
                <li><strong>보안 강화</strong>: Istio mTLS STRICT 모드로 서비스 간 암호화 통신</li>
                <li><strong>성능 최적화</strong>: k6 부하 테스트 기반 HPA 튜닝으로 11.6% 성능 개선</li>
            </ul>

            <h3>기술 스택</h3>
            <div class="modal-tech-stack">
                <span>Kubernetes</span>
                <span>Terraform</span>
                <span>Istio</span>
                <span>Prometheus</span>
                <span>Grafana</span>
                <span>ArgoCD</span>
                <span>GitHub Actions</span>
                <span>PostgreSQL</span>
            </div>

            <h3>아키텍처</h3>
            <ul>
                <li>4개의 마이크로서비스 (API Gateway, Auth, User, Blog)</li>
                <li>Terraform IaC로 인프라 자동 프로비저닝</li>
                <li>GitOps 방식의 배포 (ArgoCD)</li>
                <li>Istio 서비스 메시로 트래픽 관리</li>
                <li>중앙 집중식 로깅 (Loki + Promtail)</li>
            </ul>

            <div class="modal-links">
                <a href="https://github.com/DvwN-Lee/Monitoring-v2" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> GitHub Repository
                </a>
            </div>
        `
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
        modalContent: `
            <h2>프로젝트 개요</h2>
            <p>단국대학교 도산라운지 활성화를 위한 좌석 예약 및 관리 안드로이드 애플리케이션입니다.
            경소톤(SW융합대학 X 경영경제대학 연합 해커톤)에서 <strong>동상을 수상</strong>했습니다.</p>

            <h3>주요 기능</h3>
            <ul>
                <li>도산라운지 위치 및 이용 안내</li>
                <li>실시간 좌석 현황 확인 및 회의실 예약</li>
                <li>공부 시간 측정 타이머 기능</li>
                <li>공부 시간 기반 랭킹 시스템</li>
            </ul>

            <h3>기술적 구현</h3>
            <ul>
                <li>Firebase Realtime Database로 실시간 좌석 정보 동기화</li>
                <li>Firebase Authentication으로 사용자 인증</li>
                <li>Material Design 가이드라인 적용</li>
                <li>Figma를 활용한 UI/UX 디자인</li>
            </ul>

            <h3>팀 구성 및 역할</h3>
            <ul>
                <li><strong>팀 리더</strong>로서 프로젝트 총괄</li>
                <li>Android 앱 개발 담당</li>
                <li>Firebase 백엔드 구축</li>
                <li>4명의 팀원과 협업</li>
            </ul>

            <div class="modal-links">
                <a href="https://github.com/kimyeonhong00/dorazy.git" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> GitHub Repository
                </a>
            </div>
        `
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
        modalContent: `
            <h2>프로젝트 개요</h2>
            <p>Go와 Python FastAPI를 사용한 마이크로서비스 아키텍처 기반 실시간 모니터링 플랫폼입니다.
            커스텀 로드밸런서와 통계 집계 시스템을 구축하여 100 RPS 이상의 트래픽을 안정적으로 처리합니다.</p>

            <h3>핵심 성과</h3>
            <ul>
                <li><strong>고성능 로드밸런서</strong>: Go 고루틴 기반 비동기 처리로 100 RPS 이상 안정적 처리</li>
                <li><strong>장애 격리</strong>: 타임아웃 2초 설정으로 서비스 간 장애 전파 차단</li>
                <li><strong>실시간 대시보드</strong>: WebSocket을 통한 실시간 RPS, 응답시간, 서비스 상태 시각화</li>
                <li><strong>환경별 배포</strong>: Kustomize로 개발/운영 환경 매니페스트 분리 관리</li>
            </ul>

            <h3>기술 스택</h3>
            <div class="modal-tech-stack">
                <span>Go (Golang)</span>
                <span>Python FastAPI</span>
                <span>Kubernetes</span>
                <span>Kustomize</span>
                <span>JavaScript</span>
                <span>WebSocket</span>
                <span>Redis</span>
            </div>

            <h3>아키텍처</h3>
            <ul>
                <li>Go 기반 커스텀 로드밸런서 및 Stats Aggregator</li>
                <li>Python FastAPI 마이크로서비스 (여러 백엔드 서비스)</li>
                <li>Vanilla JavaScript + WebSocket 실시간 대시보드</li>
                <li>Redis 기반 통계 데이터 캐싱</li>
                <li>Kubernetes 오케스트레이션 및 Kustomize 기반 배포 관리</li>
            </ul>

            <div class="modal-links">
                <a href="https://github.com/DvwN-Lee/Monitoring" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> GitHub Repository
                </a>
            </div>
        `
    },
    {
        id: 'forum',
        category: 'backend',
        featured: false,
        badge: '',
        title: 'Spring Boot 게시판 시스템',
        summary: 'RESTful API 기반 CRUD 게시판 웹 애플리케이션',
        imageUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKICAgIHN1YmdyYXBoICJDbGllbnQgVGllciIKICAgICAgICBBW+ybuSDruIzrnbzsmrDsoIBdCiAgICBlbmQKCiAgICBzdWJncmFwaCAiQXBwbGljYXRpb24gVGllciAoU3ByaW5nIEJvb3QpIgogICAgICAgIEJbPGI+Q29udHJvbGxlciBMYXllcjwvYj48YnI+PGk+UkVTVCBBUEkgRW5kcG9pbnRzPC9pPjxicj7smpTssq0v7J2R64u1IOyymOumrF0KICAgICAgICBDWzxiPlNlcnZpY2UgTGF5ZXI8L2I+PGJyPjxpPkJ1c2luZXNzIExvZ2ljPC9pPjxicj7tirjrnpzsnq3shZgg7LKY66asXQogICAgICAgIERbPGI+UmVwb3NpdG9yeSBMYXllcjwvYj48YnI+PGk+RGF0YSBBY2Nlc3M8L2k+PGJyPkRCIOyXsOuPmSDsnbjthLDtjpjsnbTsiqRdCiAgICBlbmQKCiAgICBzdWJncmFwaCAiUGVyc2lzdGVuY2UgVGllciIKICAgICAgICBFWzxiPkpQQSAvIEhpYmVybmF0ZTwvYj48YnI+PGk+T1JNIEZyYW1ld29yazwvaT5dCiAgICBlbmQKCiAgICBzdWJncmFwaCAiRGF0YSBUaWVyIgogICAgICAgIEZbPGI+UG9zdGdyZVNRTDwvYj48YnI+KOyatOyYgSBEQildCiAgICAgICAgR1s8Yj5IMjwvYj48YnI+KOqwnOuwnC/thYzsiqTtirggREIpXQogICAgZW5kCgogICAgQSAtLSAiMS4gSFRUUCBSZXF1ZXN0IChHRVQsIFBPU1QsIGV0Yy4pIiAtLT4gQgogICAgQiAtLSAiMi4gRFRP66W8IO2Tte2VnCDrqZTshozrk5wg7Zi47LacIiAtLT4gQwogICAgQyAtLSAiMy4gRW50aXR566W8IO2Tte2VnCDrqZTshozrk5wg7Zi47LacIiAtLT4gRAogICAgRCAtLSAiNC4gSlBBIOuplOyGjOuTnCDtmLjstpwgKGUuZy4sIHNhdmUsIGZpbmRCeUlkKSIgLS0+IEUKICAgIEUgLS0gIjUuIFNRTCDsv7zrpqwg7IOd7ISxIOuwjSDsi6TtlokiIC0tPiBGCiAgICBFIC0tICI1LiBTUUwg7L+866asIOyDneyEsSDrsI8g7Iuk7ZaJIiAtLT4gRwogICAgRyAtLSAiNi4g642w7J207YSwIOuwmO2ZmCIgLS0+IEUKICAgIEYgLS0gIjYuIOuNsOydtO2EsCDrsJjtmZgiIC0tPiBFCiAgICBFIC0tICI3LiBFbnRpdHkg6rCd7LK0IOunpO2VkSIgLS0+IEQKICAgIEQgLS0gIjguIEVudGl0eSDqsJ3ssrQg67CY7ZmYIiAtLT4gQwogICAgQyAtLSAiOS4gRFRP66GcIOuzgO2ZmCDtm4Qg67CY7ZmYIiAtLT4gQgogICAgQiAtLSAiMTAuIEhUTUwgKE11c3RhY2hlKSDrmJDripQgSlNPTiDsnZHri7UiIC0tPiBBCg==',
        imageAlt: 'Spring Boot와 JPA 기반 RESTful 게시판 시스템 아키텍처',
        tech: ['Spring Boot', 'JPA', 'Mustache', 'PostgreSQL', 'H2'],
        highlights: [
            'Spring Boot 프레임워크 기반 독립 실행형 웹 애플리케이션 아키텍처 설계 및 구축',
            'Spring Data JPA를 활용한 PostgreSQL/H2 데이터베이스 연동 및 데이터 영속성 관리',
            'RESTful API 원칙에 따른 게시글 및 댓글 CRUD 기능 구현',
            'Mustache 템플릿 엔진을 사용한 서버 사이드 렌더링(SSR) 방식의 UI 개발'
        ],
        githubUrl: 'https://github.com/Lee-Coderrr/forum.git',
        modalContent: `
            <h2>프로젝트 개요</h2>
            <p>Spring Boot를 활용한 RESTful API 기반의 CRUD 게시판 웹 애플리케이션입니다.</p>

            <h3>주요 기능</h3>
            <ul>
                <li>게시글 CRUD (생성, 읽기, 수정, 삭제)</li>
                <li>댓글 시스템</li>
                <li>페이징 및 검색 기능</li>
                <li>사용자 인증 및 권한 관리</li>
            </ul>

            <h3>기술적 특징</h3>
            <ul>
                <li>RESTful API 설계 원칙 준수</li>
                <li>JPA/Hibernate를 활용한 ORM</li>
                <li>Spring Security를 통한 보안 구현</li>
                <li>Docker 컨테이너화로 배포 환경 통일</li>
                <li>JUnit을 활용한 단위 테스트</li>
            </ul>

            <h3>학습 포인트</h3>
            <ul>
                <li>Spring Boot 프레임워크의 핵심 개념</li>
                <li>RESTful API 설계 및 구현</li>
                <li>데이터베이스 연동 및 트랜잭션 관리</li>
                <li>컨테이너 기반 배포 프로세스</li>
            </ul>

            <div class="modal-links">
                <a href="https://github.com/Lee-Coderrr/forum.git" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> GitHub Repository
                </a>
            </div>
        `
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
        modalContent: `
            <h2>프로젝트 개요</h2>
            <p>Django 프레임워크를 기반으로 구축한 온라인 시험 출제 및 채점 시스템입니다.</p>

            <h3>주요 기능</h3>
            <ul>
                <li>시험 문제 출제 및 관리 (문제 은행)</li>
                <li>역할 기반 사용자 관리 (학생, 교사, 관리자)</li>
                <li>실시간 시험 진행 및 자동 채점</li>
                <li>성적 조회 및 통계</li>
            </ul>

            <h3>기술적 구현</h3>
            <ul>
                <li>Django MTV 패턴 이해 및 적용</li>
                <li>Django ORM을 활용한 데이터베이스 설계</li>
                <li>Django Admin을 활용한 백엔드 관리 시스템 구축</li>
                <li>jQuery, Bootstrap을 활용한 클라이언트 UI</li>
                <li>MySQL 데이터베이스 활용</li>
            </ul>

            <h3>학습 포인트</h3>
            <ul>
                <li>Django MTV 패턴 이해 및 적용</li>
                <li>관계형 데이터베이스(MySQL) 모델링</li>
                <li>기본적인 웹 프론트엔드(jQuery)와 백엔드(Django) 연동</li>
            </ul>

            <div class="modal-links">
                <a href="https://github.com/Lee-Coderrr/OnlineExam.git" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> GitHub Repository
                </a>
            </div>
        `
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
        modalContent: `
            <h2>프로젝트 개요</h2>
            <p>Spring Boot, Thymeleaf, WebSocket(STOMP)을 사용하여 구축한 간단한 실시간 채팅 애플리케이션입니다.</p>

            <h3>주요 기능</h3>
            <ul>
                <li>WebSocket/STOMP 기반 실시간 메시지 전송 및 수신</li>
                <li>사용자 이름 입력으로 채팅방 접속</li>
                <li>Spring Data JPA를 통한 메시지 및 사용자 정보 데이터베이스 영속화</li>
                <li>Thymeleaf와 JavaScript(SockJS, STOMP.js)를 활용한 동적 채팅 UI 구현</li>
                <li>채팅 메시지 전송 시간 표시</li>
            </ul>

            <h3>기술 스택</h3>
            <div class="modal-tech-stack">
                <span>Spring Boot</span>
                <span>Spring WebSocket</span>
                <span>JPA</span>
                <span>Thymeleaf</span>
                <span>JavaScript</span>
                <span>STOMP</span>
                <span>MySQL</span>
                <span>Gradle</span>
            </div>

            <h3>학습 포인트</h3>
            <ul>
                <li>Spring Boot 환경에서 WebSocket 연동 및 STOMP 메시지 브로커 설정</li>
                <li>JPA를 활용한 엔티티(User, Message) 설계 및 리포지토리 구현</li>
                <li>Thymeleaf를 이용한 서버 사이드 렌더링과 JavaScript(SockJS, STOMP.js)를 통한 클라이언트-서버 비동기 통신</li>
            </ul>

            <div class="modal-links">
                <a href="https://github.com/Lee-Coderrr/DemoChat.git" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> GitHub Repository
                </a>
            </div>
        `
    }
];
