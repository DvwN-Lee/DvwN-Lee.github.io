# 이동주 엔지니어 포트폴리오 사이트

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

## 주요 개선 사항 (Recent Refactoring)

- **데이터 중앙화**: 하드코딩되었던 프로젝트, 경력, 스킬, 자기소개 등의 모든 텍스트 콘텐츠를 `js/data` 디렉토리의 JavaScript 데이터 파일로 분리하여 유지보수성 극대화.
- **UI 모듈화**: 각 섹션(프로젝트, 스킬, 타임라인 등)의 렌더링 로직을 `js/modules` 디렉토리의 독립적인 UI 모듈로 분리하여 코드의 재사용성과 가독성 향상.
- **레이아웃 로직 개선**: CSS Grid의 한계를 보완하기 위해 Flexbox 레이아웃을 도입하여, 프로젝트 아이템 수가 가변적일 때도 항상 안정적인 중앙 정렬을 유지하도록 수정.
- **성능 최적화**:
  - 이미지 포맷을 WebP로 전환하여 로딩 속도 개선.
  - `loading="lazy"` 속성을 사용하여 이미지 지연 로딩 구현.

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
        ├── animations.js
        ├── intro-ui.js
        ├── navigation.js
        ├── projects-ui.js
        ├── site-info-ui.js
        ├── skills-ui.js
        ├── timeline-ui.js
        └── utils.js
```

---

**Last Updated**: 2025.11
