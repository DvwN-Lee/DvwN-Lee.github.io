# 이동주 포트폴리오 사이트

Cloud/DevOps 엔지니어 및 백엔드 개발자 이동주의 개인 포트폴리오 웹사이트입니다.

## 주요 특징

- **모던 UI/UX**: 다크/라이트 테마를 지원하는 인터랙티브 디자인
- **100% 반응형**: 모바일, 태블릿, 데스크톱 등 모든 디바이스에 최적화된 레이아웃
- **동적 콘텐츠 렌더링**: JavaScript 모듈을 통해 모든 콘텐츠(프로젝트, 스킬, 경력 등)를 동적으로 관리
- **인터랙티브 요소**: 스크롤 기반 애니메이션, 동적 파티클 효과, 프로젝트 필터링 및 상세 정보 모달

## 기술 스택

- **Frontend**: HTML5 (Semantic), CSS3, Vanilla JavaScript (ESM)
- **Libraries**:
  - `AOS`: 스크롤 애니메이션
  - `Particles.js`: 배경 인터랙션 효과
  - `Font Awesome`: 아이콘
- **Development**:
  - Python (`Pillow`) 및 `uv`: 이미지 포맷 최적화 (WebP)
  - Git & GitHub: 버전 관리 및 배포

## 주요 개선 사항 (Recent Updates)

### 아키텍처 및 코드 구조 개선

- **데이터 중앙화 및 관심사 분리**
  - 모든 콘텐츠를 `js/data` 디렉토리의 JavaScript 데이터 파일로 분리하여 DRY 원칙 적용
  - `shared-content.js`를 통해 프로젝트와 Problem Solving 섹션 간 중복 데이터 제거
  - 데이터-스타일-로직 완전 분리로 유지보수성 극대화

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
  - 콘솔 로그 정리 (이모지 제거, 의미 있는 로그만 유지)

- **코드 품질 향상**
  - 일관된 코드 스타일 및 명명 규칙 적용
  - 중복 코드 제거 및 함수 분리
  - JSDoc 주석으로 타입 정보 및 문서화 강화

## 파일 구조

```
DvwN-Lee.github.io/
├── index.html
├── style.css
├── README.md
├── images/
│   ├── kiali.webp
│   ├── kustomize.webp
│   └── ...
└── js/
    ├── main.js
    ├── data/
    │   ├── config.js
    │   ├── experiences.js
    │   ├── projects.js
    │   ├── skills.js
    │   └── problem-solving.js
    └── modules/
        ├── animation-utils.js
        ├── animations.js
        ├── intro-ui.js
        ├── navigation.js
        ├── problem-solving-ui.js
        ├── projects-ui.js
        ├── site-info-ui.js
        ├── skills-ui.js
        ├── timeline-ui.js
        └── utils.js
```

---

**Last Updated**: 2025.11
