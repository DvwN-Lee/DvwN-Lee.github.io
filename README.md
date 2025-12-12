# 이동주 포트폴리오 사이트

Cloud/DevOps 엔지니어 및 백엔드 개발자 이동주의 개인 포트폴리오 웹사이트입니다.

## 주요 특징

- **모던 UI/UX**: 다크/라이트 테마를 지원하는 인터랙티브 디자인
- **100% 반응형**: 모바일, 태블릿, 데스크톱 등 모든 디바이스에 최적화된 레이아웃
- **동적 콘텐츠 렌더링**: JavaScript 모듈을 통해 모든 콘텐츠(프로젝트, 스킬, 경력 등)를 동적으로 관리
- **인터랙티브 요소**: 스크롤 기반 애니메이션, 동적 파티클 효과, 프로젝트 필터링 및 상세 정보 모달

## 기술 스택

### Frontend
- **HTML5**: Semantic HTML 구조
- **CSS3**: Flexbox/Grid 레이아웃, CSS 변수, 반응형 디자인
- **JavaScript**: Vanilla JavaScript (ESM), ES6+ 문법

### Libraries
- **AOS**: 스크롤 애니메이션
- **Particles.js**: 배경 인터랙션 효과
- **Font Awesome**: 아이콘

### Testing
- **Playwright**: E2E 테스트 프레임워크
- **TypeScript**: 테스트 코드 작성
- **serve**: 로컬 개발 서버

### Development
- **Python (Pillow)** 및 **uv**: 이미지 포맷 최적화 (WebP)
- **Git** & **GitHub**: 버전 관리 및 배포

## 주요 개선 사항

### 아키텍처 및 코드 구조 개선

- **데이터 중앙화 및 관심사 분리**
  - 모든 콘텐츠를 `js/data` 디렉토리의 JavaScript 데이터 파일로 분리하여 DRY 원칙 적용
  - `shared-content.js`를 통해 프로젝트와 Problem Solving 섹션 간 중복 데이터 제거
  - 데이터-스타일-로직 분리로 유지보수성 향상

- **모듈화 및 재사용성 향상**
  - 각 섹션의 렌더링 로직을 `js/modules`의 독립적인 UI 모듈로 분리
  - ES6 Module System 기반 구조로 코드 가독성 및 재사용성 향상
  - 유틸리티 함수 모듈화로 중복 코드 제거

### UX 및 애니메이션 개선

- **프로젝트 모달 시스템 개선**
  - 모달 열기/닫기 애니메이션 안정성 강화 (transitionend fallback 메커니즘)
  - 스크롤 위치 복원 및 body 스크롤 잠금 처리
  - 접근성 개선 (Escape 키, 외부 클릭 닫기)
  - 모달 제목 영문화 및 구조 개선 (Overview, Key Features, Technical Implementation, Learning Points)

- **애니메이션 충돌 방지 및 최적화**
  - AnimationQueue 유틸리티 클래스로 필터링 애니메이션 충돌 해결
  - 아코디언 애니메이션 최적화 (CSS Grid 기반 고성능 애니메이션)
  - 프로젝트 카드 애니메이션 일관성 개선

- **인터랙션 UX 개선**
  - 이메일 복사 피드백 중복 제거 및 시각적 피드백 강화
  - 네비게이션 메뉴 토글 로직 개선
  - Scroll-to-top 버튼과 테마 토글 버튼 겹침 해결

### 성능 최적화

- **이미지 최적화**
  - WebP 포맷 전환으로 로딩 속도 개선
  - `loading="lazy"` 속성으로 이미지 지연 로딩 구현
  - SVG 이미지 배경 제거로 시각적 품질 개선

- **렌더링 성능 개선**
  - DOM 쿼리 캐싱 및 이벤트 리스너 최적화
  - Flexbox 레이아웃으로 CSS Grid 한계 보완 (가변 아이템 중앙 정렬)
  - 불필요한 Footer 요소 제거 및 렌더링 로직 간소화

### 개발 경험 개선

- **에러 처리 강화**
  - 필수 DOM 요소 검증 및 에러 핸들링 추가
  - Favicon 404 에러 해결 (SVG 기반 클라우드 아이콘)
  - 콘솔 로그 정리 (의미 있는 로그만 유지)

- **코드 품질 향상**
  - 일관된 코드 스타일 및 명명 규칙 적용
  - 중복 코드 제거 및 함수 분리
  - JSDoc 주석으로 타입 정보 및 문서화 강화

## 프로젝트 구조

```
DvwN-Lee.github.io/
├── index.html                      # 메인 HTML 파일
├── style.css                       # 통합 스타일시트
├── README.md                       # 프로젝트 문서
├── package.json                    # Node.js 의존성 및 스크립트
├── playwright.config.ts            # Playwright 테스트 설정
├── images/                         # 이미지 리소스 (WebP)
│   ├── kiali.webp
│   ├── kustomize.webp
│   └── ...
├── js/
│   ├── main.js                     # 애플리케이션 진입점
│   ├── data/                       # 데이터 모듈
│   │   ├── config.js               # 사이트 설정 (이메일, 소셜 링크)
│   │   ├── experiences.js          # 경력 데이터
│   │   ├── projects.js             # 프로젝트 데이터
│   │   ├── skills.js               # 기술 스택 데이터
│   │   ├── problem-solving.js      # Problem Solving 데이터
│   │   └── shared-content.js       # 공유 콘텐츠 데이터
│   └── modules/                    # UI 모듈
│       ├── animation-utils.js      # 애니메이션 유틸리티
│       ├── animations.js           # AOS 및 Particles 초기화
│       ├── intro-ui.js             # Intro 섹션 렌더링
│       ├── navigation.js           # 네비게이션 로직
│       ├── problem-solving-ui.js   # Problem Solving 섹션 렌더링
│       ├── projects-ui.js          # Projects 섹션 렌더링
│       ├── site-info-ui.js         # Contact 및 Footer 렌더링
│       ├── skills-ui.js            # Skills 섹션 렌더링
│       ├── theme.js                # 테마 전환 로직
│       ├── timeline-ui.js          # Experience Timeline 렌더링
│       └── utils.js                # 공통 유틸리티 함수
└── tests/                          # Playwright E2E 테스트
    ├── fixtures/                   # 테스트 fixture
    │   └── base-fixture.ts
    ├── category-filter-animation.spec.ts
    ├── diagnose-aos-animation.spec.ts
    ├── initial-load-animation.spec.ts
    └── ...
```

## 테스트

### E2E 테스트

Playwright를 사용하여 애니메이션, 레이아웃, 사용자 인터랙션 등을 검증합니다.

**테스트 실행:**

```bash
# 모든 테스트 실행
npm test

# UI 모드로 테스트 실행
npm run test:ui

# 헤드리스 모드 해제 (브라우저 표시)
npm run test:headed

# 디버그 모드
npm run test:debug

# Visual Regression 테스트
npm run test:visual

# Snapshot 업데이트
npm run test:update-snapshots
```

**주요 테스트 시나리오:**
- AOS 애니메이션 동작 검증
- 프로젝트 필터링 애니메이션 검증
- 레이아웃 안정성 검증 (Layout Shift 방지)
- 초기 로드 애니메이션 검증
- 스크롤 위치 복원 검증

### 로컬 개발 서버

```bash
# 포트 8080에서 서버 실행
npm run serve
```

## 배포

GitHub Pages를 통해 자동 배포됩니다. `main` branch에 push하면 자동으로 사이트가 업데이트됩니다.

**사이트 URL**: https://dvwn-lee.github.io

---

**Last Updated**: 2025.12
