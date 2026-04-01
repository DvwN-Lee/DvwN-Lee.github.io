# resume.html 투 컬럼 재설계 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** `portfolio/resume.html`을 투 컬럼(사이드바 32% + 메인 68%) 레이아웃의 한국 스타트업 DevOps Engineer 이력서로 완전 재작성

**Architecture:**
좌측 사이드바에 증명사진·연락처·Skills(기능별 그룹핑)·Certifications을 배치하고, 우측 메인 컬럼에 Professional Summary → Projects(exam-platform → Monitoring v3 → Monitoring v2 → k8s-cicd-automation) → Other Projects → Activities & Leadership → Education 순으로 배치한다. 프로젝트 제목은 짧은 프로젝트명(예: "Monitoring v3")을 메인 타이틀로, 설명형 이름(예: "GCP 기반 Cloud-Native 모니터링 플랫폼")을 서브타이틀로 분리한다. exam-platform이 Full-stack 역량을 먼저 보여주고, Monitoring v3→v2 순서가 자연스러운 인프라 진화 맥락을 형성한다.

**Tech Stack:** HTML · CSS (투 컬럼 Flexbox) · Google Fonts (Outfit, IBM Plex Sans) · Print CSS (A4)

---

## 콘텐츠 결정 사항 (구현 전 참조)

### Projects 순서 및 명칭 포맷

| 순서 | 타이틀 (짧은 프로젝트명) | 서브타이틀 | 기간 | 핵심 강조 |
|------|------------------------|----------|------|-----------|
| 1 | exam-platform | 온라인 시험 플랫폼 | 2025.12~ | Full-stack 재작성 + CI/CD 통합, 커버리지 92% |
| 2 | Monitoring v3 | GCP 기반 Cloud-Native 모니터링 플랫폼 | 2025.12~ | Terratest 6단계, App of Apps, mTLS |
| 3 | Monitoring v2 | Cloud-Native 마이크로서비스 플랫폼 | 2025.10~12 | P99 94% 감소, HPA 튜닝, ADR |
| 4 | k8s-cicd-automation | Kubernetes CI/CD Infrastructure | 2025.11 | 87.5% 단축, Ansible 자동 연계 |

**타이틀/서브타이틀 HTML 구조:**
```html
<div class="project-head">
  <div class="project-title">Monitoring v3</div>          <!-- 짧은 프로젝트명 -->
  <div class="project-period">2025.12 ~ 2026.02</div>
</div>
<div class="project-subtitle">GCP 기반 Cloud-Native 모니터링 플랫폼</div>  <!-- 설명형 서브타이틀 -->
```

### Skills 그룹핑 (트랙 분리 없음)
```
Orchestration    Kubernetes · Docker · Helm
IaC              Terraform · Ansible
GitOps / CI·CD   ArgoCD · GitHub Actions · Jenkins · GitLab
Mesh & Security  Istio · Trivy
Observability    Prometheus · Grafana · Loki
─────────────────────────────────
Languages        Go · Python · JavaScript
Frameworks       FastAPI · Django · React · TypeScript
Database         PostgreSQL · Redis · MongoDB
Testing          Terratest · pytest · Playwright
Cloud            GCP · AWS(학습) · CloudStack
```

### 제거 항목
- `portfolio-link` 배너 블록 (GitHub 링크는 Projects meta에 유지)
- Tools 카테고리 (Git, Linux)
- SQLite
- keyword 배지 (Summary 문장으로 흡수)

### 유지 항목
- 증명사진 (`photo.jpg`, 사이드바 상단)
- 모든 성과 수치 (P99 94%, 87.5% 단축, 커버리지 92% 등)
- 하이퍼링크 연락처 (mailto, GitHub, Blog)
- `evolution-context` 표시 (v2 GCP 전환 고도화 / v1 고도화)
- Activities & Leadership 3개 항목
- Education & Certifications 4개 항목

---

## Task 1: 파일 초기화 및 CSS 기반 구조 설정

**Files:**
- Modify: `portfolio/resume.html` (전체 재작성)

**Step 1: 현재 파일 내용 확인 후 새 구조로 교체**

아래 HTML 골격으로 `portfolio/resume.html`을 교체한다.
`<style>` 블록에 투 컬럼 레이아웃의 전체 CSS를 포함한다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>이동주 - Cloud/DevOps Engineer 이력서</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* CSS 변수 */
    :root {
      --primary: #2563eb;
      --secondary: #7c3aed;
      --accent: #06b6d4;
      --bg: #ffffff;
      --bg-alt: #f8fafc;
      --sidebar-bg: #f1f5f9;
      --text: #0f172a;
      --text-sub: #475569;
      --border: #e2e8f0;
      --primary-10: rgba(37, 99, 235, 0.10);
      --font-display: 'Outfit', sans-serif;
      --font-body: 'IBM Plex Sans', sans-serif;
    }

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: var(--font-body), sans-serif;
      color: var(--text);
      background: #dde1e7;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    a { color: var(--primary); text-decoration: none; }

    /* ===== 페이지 래퍼 ===== */
    .page {
      max-width: 210mm;
      margin: 0 auto;
      background: var(--bg);
      display: flex;
      min-height: 297mm;
    }

    /* ===== 사이드바 ===== */
    .sidebar {
      width: 32%;
      flex-shrink: 0;
      background: var(--sidebar-bg);
      padding: 32px 22px 32px 28px;
      border-right: 1px solid var(--border);
    }

    /* ===== 메인 컬럼 ===== */
    .main {
      flex: 1;
      padding: 32px 32px 24px 30px;
      overflow: hidden;
    }

    /* 화면 전용 */
    @media screen {
      .page {
        box-shadow: 0 4px 40px rgba(0,0,0,0.14);
        margin: 24px auto;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <aside class="sidebar">
      <!-- Task 2: 사이드바 콘텐츠 -->
    </aside>
    <main class="main">
      <!-- Task 3~7: 메인 콘텐츠 -->
    </main>
  </div>
</body>
</html>
```

**Step 2: 브라우저에서 파일 열어 투 컬럼 골격 확인**

`open portfolio/resume.html` 실행 후:
- 좌측 사이드바(연한 배경)와 우측 메인 영역이 분리되어 있는지 확인
- 빈 내용이어도 레이아웃 구조가 보이면 통과

---

## Task 2: 사이드바 CSS 및 콘텐츠 구현

**Files:**
- Modify: `portfolio/resume.html` — `<style>` 사이드바 관련 CSS 추가, `<aside class="sidebar">` 내부 채우기

**Step 1: 사이드바 CSS를 `<style>` 블록에 추가**

```css
/* ===== 사이드바: 프로필 ===== */
.profile-photo {
  width: 88px;
  height: 116px;
  border-radius: 6px;
  border: 1px solid var(--border);
  object-fit: cover;
  display: block;
  margin-bottom: 14px;
}

.profile-name {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.profile-role {
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--primary);
  margin-top: 3px;
  margin-bottom: 14px;
}

/* ===== 사이드바: 연락처 ===== */
.contact-list {
  list-style: none;
  margin-bottom: 20px;
}

.contact-list li {
  font-size: 0.72rem;
  color: var(--text-sub);
  line-height: 1.9;
  display: flex;
  align-items: center;
  gap: 6px;
}

.contact-list a {
  color: var(--text-sub);
  font-size: 0.72rem;
  word-break: break-all;
}

.contact-list a:hover {
  color: var(--primary);
}

.contact-label {
  font-weight: 600;
  color: var(--text);
  min-width: 14px;
  font-size: 0.68rem;
}

/* ===== 사이드바: 섹션 구분선 ===== */
.side-section {
  margin-bottom: 20px;
}

.side-section-title {
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--primary);
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--border);
}

/* ===== 사이드바: Skills ===== */
.skill-group {
  margin-bottom: 8px;
}

.skill-group-name {
  font-family: var(--font-display);
  font-size: 0.66rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 2px;
}

.skill-tags {
  font-size: 0.68rem;
  color: var(--text-sub);
  line-height: 1.65;
}

.skill-tags .learning {
  font-size: 0.58rem;
  color: var(--text-sub);
  font-weight: 400;
}

/* ===== 사이드바: Certifications ===== */
.cert-item {
  font-size: 0.7rem;
  color: var(--text-sub);
  line-height: 1.7;
  padding: 3px 0;
}

.cert-item strong {
  display: block;
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text);
}

.cert-item span {
  font-size: 0.64rem;
}
```

**Step 2: `<aside class="sidebar">` 내부를 채운다**

```html
<aside class="sidebar">
  <!-- 프로필 -->
  <img class="profile-photo" src="photo.jpg" alt="증명사진">
  <div class="profile-name">이동주</div>
  <div class="profile-role">Cloud/DevOps Engineer</div>

  <!-- 연락처 -->
  <div class="side-section">
    <div class="side-section-title">Contact</div>
    <ul class="contact-list">
      <li>010-8328-7743</li>
      <li><a href="mailto:dongju101101@gmail.com">dongju101101@gmail.com</a></li>
      <li><a href="https://github.com/DvwN-Lee">github.com/DvwN-Lee</a></li>
      <li><a href="https://velog.io/@dvwn-lee">velog.io/@dvwn-lee</a></li>
      <li>경기도 안양시</li>
    </ul>
  </div>

  <!-- Skills -->
  <div class="side-section">
    <div class="side-section-title">Technical Skills</div>

    <div class="skill-group">
      <div class="skill-group-name">Orchestration</div>
      <div class="skill-tags">Kubernetes · Docker · Helm · Cilium · MetalLB</div>
    </div>
    <div class="skill-group">
      <div class="skill-group-name">IaC</div>
      <div class="skill-tags">Terraform · Ansible</div>
    </div>
    <div class="skill-group">
      <div class="skill-group-name">GitOps / CI·CD</div>
      <div class="skill-tags">ArgoCD · GitHub Actions · Jenkins · GitLab</div>
    </div>
    <div class="skill-group">
      <div class="skill-group-name">Mesh &amp; Security</div>
      <div class="skill-tags">Istio · Trivy</div>
    </div>
    <div class="skill-group">
      <div class="skill-group-name">Observability</div>
      <div class="skill-tags">Prometheus · Grafana · Loki</div>
    </div>
    <div class="skill-group">
      <div class="skill-group-name">Languages</div>
      <div class="skill-tags">Go · Python · JavaScript</div>
    </div>
    <div class="skill-group">
      <div class="skill-group-name">Frameworks</div>
      <div class="skill-tags">FastAPI · Django · React · TypeScript</div>
    </div>
    <div class="skill-group">
      <div class="skill-group-name">Database</div>
      <div class="skill-tags">PostgreSQL · Redis · MySQL · MongoDB</div>
    </div>
    <div class="skill-group">
      <div class="skill-group-name">Testing</div>
      <div class="skill-tags">Terratest · pytest · Playwright</div>
    </div>
    <div class="skill-group">
      <div class="skill-group-name">Cloud</div>
      <div class="skill-tags">GCP · AWS <span class="learning">(학습)</span> · CloudStack</div>
    </div>
  </div>

  <!-- Certifications -->
  <div class="side-section">
    <div class="side-section-title">Certifications</div>
    <div class="cert-item">
      <strong>정보처리기사</strong>
      <span>한국산업인력공단 · 2023.06</span>
    </div>
    <div class="cert-item">
      <strong>Azure AI Fundamentals</strong>
      <span>Microsoft · 2022.01</span>
    </div>
  </div>
</aside>
```

**Step 3: 브라우저에서 사이드바 시각 확인**

- 프로필 영역(사진, 이름, 직함)이 상단에 있는지 확인
- Skills 그룹이 순서대로 보이는지 확인

---

## Task 3: 메인 컬럼 CSS 및 공통 컴포넌트

**Files:**
- Modify: `portfolio/resume.html` — `<style>` 메인 관련 CSS 추가

**Step 1: 메인 컬럼 공통 CSS를 `<style>` 블록에 추가**

```css
/* ===== 메인: 섹션 공통 ===== */
.section {
  margin-bottom: 20px;
}

.section-title {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--primary);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

/* ===== 메인: Summary ===== */
.summary-text {
  font-size: 0.82rem;
  color: var(--text-sub);
  line-height: 1.75;
}

/* ===== 메인: Projects ===== */
.project {
  padding-bottom: 14px;
  margin-bottom: 14px;
  border-bottom: 1px solid var(--border);
}

.project:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}

.project-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 1px;
}

.project-title {
  font-family: var(--font-display);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text);
}

.project-period {
  font-size: 0.68rem;
  color: var(--text-sub);
  white-space: nowrap;
  flex-shrink: 0;
}

.project-meta {
  font-size: 0.68rem;
  color: var(--text-sub);
  margin-bottom: 7px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.project-meta a {
  color: var(--text-sub);
  font-weight: 500;
}

.project-meta a:hover {
  color: var(--primary);
}

.evolution-tag {
  font-size: 0.62rem;
  font-weight: 600;
  color: var(--secondary);
  background: rgba(124, 58, 237, 0.07);
  padding: 1px 7px;
  border-radius: 3px;
}

.meta-sep {
  color: var(--border);
}

.project-bullets {
  list-style: none;
  margin: 0;
  padding: 0;
}

.project-bullets li {
  position: relative;
  padding-left: 13px;
  font-size: 0.76rem;
  color: var(--text-sub);
  line-height: 1.6;
  margin-bottom: 3px;
}

.project-bullets li::before {
  content: '▸';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--accent);
  font-size: 0.65rem;
}

.project-bullets strong {
  color: var(--primary);
  font-weight: 600;
}

.project-tech {
  margin-top: 7px;
  font-size: 0.68rem;
  color: var(--text-sub);
  line-height: 1.55;
}

.tech-label {
  font-weight: 600;
  color: var(--text);
  margin-right: 4px;
}

.project-subtitle {
  font-size: 0.74rem;
  font-weight: 500;
  color: var(--text-sub);
  margin-bottom: 5px;
}

/* ===== 메인: Other Projects ===== */
.other-project {
  padding: 6px 0;
}

.other-project-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 2px;
}

.other-project-title {
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text);
}

.other-project-period {
  font-size: 0.65rem;
  color: var(--text-sub);
  white-space: nowrap;
}

.other-project-desc {
  font-size: 0.74rem;
  color: var(--text-sub);
  line-height: 1.55;
}

.other-project-tech {
  font-size: 0.66rem;
  color: var(--text-sub);
  margin-top: 2px;
}

.award-tag {
  font-size: 0.62rem;
  font-weight: 600;
  color: #b45309;
  margin-left: 5px;
}

/* ===== 메인: Activities & Education ===== */
.row-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 4px 0;
  gap: 12px;
}

.row-main {
  font-size: 0.80rem;
}

.row-main strong {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--text);
}

.row-main span {
  color: var(--text-sub);
  font-size: 0.74rem;
  margin-left: 5px;
}

.row-date {
  font-size: 0.70rem;
  color: var(--text-sub);
  white-space: nowrap;
}

.row-sub {
  font-size: 0.72rem;
  color: var(--text-sub);
  padding-bottom: 3px;
}

/* ===== Print ===== */
@media print {
  @page { size: A4; margin: 12mm 14mm; }
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  body { background: #fff; }
  .page {
    max-width: none;
    box-shadow: none;
    min-height: unset;
  }
  .project, .other-project, .row-item, .row-sub {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .section-title { page-break-after: avoid; break-after: avoid; }
  a[href]::after { content: none !important; }
}
```

---

## Task 4: 메인 — Professional Summary + Projects (v3, exam-platform)

**Files:**
- Modify: `portfolio/resume.html` — `<main class="main">` 내부 채우기 (Summary + 첫 두 프로젝트)

**Step 1: `<main class="main">` 내부에 아래 HTML 삽입**

```html
<main class="main">

  <!-- Professional Summary -->
  <section class="section">
    <div class="section-title">Professional Summary</div>
    <p class="summary-text">
      Backend 개발에서 출발해 Kubernetes 인프라 전 영역을 직접 설계하고 운영하는 DevOps Engineer입니다.
      IaC 기반 재현 가능한 Infrastructure 구축, GitOps Pipeline 자동화, Observability 시스템 설계를 경험했으며,
      애플리케이션 레이어에 대한 직접적인 이해를 바탕으로 서비스 성능 개선 성과를 도출한 경험을 보유하고 있습니다.
    </p>
  </section>

  <!-- Projects -->
  <section class="section">
    <div class="section-title">Projects</div>

    <!-- exam-platform -->
    <div class="project">
      <div class="project-head">
        <div class="project-title">exam-platform</div>
        <div class="project-period">2025.12 ~ 2026.02</div>
      </div>
      <div class="project-subtitle">온라인 시험 플랫폼</div>
      <div class="project-meta">
        <span>1인 프로젝트</span>
        <span class="meta-sep">·</span>
        <a href="https://github.com/DvwN-Lee/exam-platform">github.com/DvwN-Lee/exam-platform</a>
      </div>
      <ul class="project-bullets">
        <li>Legacy Django 2.1/jQuery를 <strong>Django 5.2 LTS / React 19 Full-Stack으로 완전 재작성</strong></li>
        <li>pytest + Playwright 기반 Unit/Integration/E2E <strong>3계층 테스트 전략 수립,
          Backend 커버리지 92% 달성 및 GitHub Actions CI Pipeline 통합</strong></li>
        <li>N+1 쿼리 최적화로 시험 목록 조회 시 <strong>DB Query 10회 &rarr; 3회 감소</strong></li>
        <li>JWT HttpOnly Cookie + RBAC <strong>Frontend/Backend 이중 검증</strong>으로 보안 강화</li>
      </ul>
      <div class="project-tech">
        <span class="tech-label">Tech</span>
        Django 5.2 LTS · DRF · React 19 · TypeScript · TanStack Query · TanStack Router ·
        PostgreSQL · MongoDB · Redis · GCP · pytest · Playwright · Docker Compose · GitHub Actions
      </div>
    </div>

    <!-- Monitoring v3 -->
    <div class="project">
      <div class="project-head">
        <div class="project-title">Monitoring v3</div>
        <div class="project-period">2025.12 ~ 2026.02</div>
      </div>
      <div class="project-subtitle">GCP 기반 Cloud-Native 모니터링 플랫폼</div>
      <div class="project-meta">
        <span>1인 프로젝트</span>
        <span class="evolution-tag">v2 GCP 전환 고도화</span>
        <span class="meta-sep">·</span>
        <a href="https://github.com/DvwN-Lee/Monitoring-v3">github.com/DvwN-Lee/Monitoring-v3</a>
      </div>
      <ul class="project-bullets">
        <li>Terraform Module 기반 GCP 인프라 전체(VPC, Firewall, VM, Secret Manager) 코드화,
          <strong>Terratest 6단계 검증 Pipeline으로 배포 전 Infrastructure 오류 사전 차단</strong></li>
        <li>ArgoCD App of Apps 패턴으로 Infrastructure/Application Apps 계층적 관리,
          <strong>Sync Wave로 의존성 배포 순서 보장</strong></li>
        <li>External Secrets Operator + GCP Secret Manager 연동으로 <strong>민감 정보 자동 동기화</strong></li>
        <li>Istio mTLS STRICT + GCP Firewall + NetworkPolicy 조합으로
          <strong>Pod 간 통신 암호화 및 Namespace 단위 트래픽 격리</strong></li>
      </ul>
      <div class="project-tech">
        <span class="tech-label">Tech</span>
        GCP · K3s · Terraform · ArgoCD · Istio · Prometheus · Grafana · Loki · External Secrets · Go · Python (FastAPI)
      </div>
    </div>

  </section>
```

**Step 2: 브라우저에서 확인**

- Summary 문단이 메인 상단에 보이는지 확인
- v3, exam-platform 두 프로젝트가 올바른 순서로 렌더링되는지 확인
- `evolution-tag`(보라색 배지)가 v3 meta에 표시되는지 확인

---

## Task 5: 메인 — Projects (v2, k8s-cicd) + Other Projects

**Files:**
- Modify: `portfolio/resume.html` — Projects 섹션에 v2, k8s-cicd 추가 / Other Projects 섹션 추가

**Step 1: Task 4에서 닫히지 않은 `<section class="section">` 내부에 v2, k8s-cicd 추가**

```html
    <!-- Monitoring v2 -->
    <div class="project">
      <div class="project-head">
        <div class="project-title">Monitoring v2</div>
        <div class="project-period">2025.10 ~ 2025.12</div>
      </div>
      <div class="project-subtitle">Cloud-Native 마이크로서비스 플랫폼</div>
      <div class="project-meta">
        <span>1인 프로젝트</span>
        <span class="evolution-tag">v1 고도화</span>
        <span class="meta-sep">·</span>
        <a href="https://github.com/DvwN-Lee/Monitoring-v2">github.com/DvwN-Lee/Monitoring-v2</a>
      </div>
      <ul class="project-bullets">
        <li>GitHub Actions CI + ArgoCD CD Pipeline 구축
          <strong>(Lint &rarr; Build &rarr; Trivy Scan &rarr; Image Push &rarr; GitOps Sync)</strong>,
          Git Push 후 5분 내 자동 배포</li>
        <li>k6 부하 테스트 기반 HPA 튜닝으로
          <strong>P99 Latency 94% 감소 (3.71s &rarr; 238ms), 5xx 에러율 0.460% &rarr; 0.004%</strong>.
          Grafana 실측: P95 9.77ms / P99 19.8ms, k6 100VU P95 74.76ms / 에러율 0.01%</li>
        <li>Istio mTLS STRICT + NetworkPolicy로 <strong>Namespace 수준 네트워크 격리</strong></li>
        <li>기술 선택 Trade-off를 <strong>ADR로 문서화 (Istio vs Linkerd, Helm vs Kustomize 등)</strong></li>
      </ul>
      <div class="project-tech">
        <span class="tech-label">Tech</span>
        Kubernetes · Terraform · Istio · ArgoCD · GitHub Actions · Prometheus · Grafana · Loki · Trivy · Go · Python (FastAPI)
      </div>
    </div>

    <!-- k8s-cicd-automation -->
    <div class="project">
      <div class="project-head">
        <div class="project-title">k8s-cicd-automation</div>
        <div class="project-period">2025.11</div>
      </div>
      <div class="project-subtitle">Kubernetes CI/CD Infrastructure</div>
      <div class="project-meta">
        <span>1인 프로젝트</span>
        <span class="meta-sep">·</span>
        <a href="https://github.com/DvwN-Lee/k8s-cicd-automation">github.com/DvwN-Lee/k8s-cicd-automation</a>
      </div>
      <ul class="project-bullets">
        <li>Terraform으로 CloudStack Infrastructure 코드화,
          <strong>Ansible Inventory 자동 생성으로 Provisioning &rarr; Configuration 자동 연계</strong></li>
        <li>Ansible Playbook으로 containerd, Kubernetes v1.28, Cilium CNI, MetalLB 구성 자동화,
          <strong>Cluster 구축 시간 87.5% 단축 (2시간 &rarr; 15분)</strong></li>
        <li>Jenkins + GitLab + Docker Registry 기반 <strong>Git Push to Deploy</strong> Pipeline 구축</li>
      </ul>
      <div class="project-tech">
        <span class="tech-label">Tech</span>
        Terraform · Ansible · Kubernetes · CloudStack · containerd · Cilium · MetalLB · Jenkins · GitLab · Docker Registry
      </div>
    </div>

  </section><!-- /Projects -->

  <!-- Other Projects -->
  <section class="section">
    <div class="section-title">Other Projects</div>

    <div class="other-project">
      <div class="other-project-head">
        <div class="other-project-title">실시간 마이크로서비스 모니터링 플랫폼</div>
        <div class="other-project-period">2025.09</div>
      </div>
      <div class="other-project-desc">
        Go 고루틴 기반 커스텀 Load Balancer와 FastAPI 마이크로서비스로 구성한 실시간 Monitoring Dashboard.
        Kustomize base/overlay 패턴으로 환경별 K8s Manifest 관리. (v2 고도화의 출발점)
      </div>
      <div class="other-project-tech">Go · Python (FastAPI) · Kubernetes · Kustomize · Redis</div>
    </div>

    <div class="other-project">
      <div class="other-project-head">
        <div class="other-project-title">
          Dorazy — 도서관 예약 시스템
          <span class="award-tag">경소톤 동상</span>
        </div>
        <div class="other-project-period">2022.05 ~ 2022.08</div>
      </div>
      <div class="other-project-desc">
        Firebase(BaaS) 기반 Serverless Architecture 단국대학교 도산라운지 좌석 예약 앱.
        기획부터 개발까지 총괄.
        SW융합대학 X 경영경제대학 연합 Hackathon 동상 수상.
      </div>
      <div class="other-project-tech">Android · Kotlin · Firebase · Figma</div>
    </div>

  </section><!-- /Other Projects -->
```

---

## Task 6: 메인 — Activities & Leadership + Education

**Files:**
- Modify: `portfolio/resume.html` — 나머지 섹션 추가 후 `</main>` 닫기

**Step 1: Other Projects 섹션 다음에 Activities, Education 추가**

```html
  <!-- Activities & Leadership -->
  <section class="section">
    <div class="section-title">Activities &amp; Leadership</div>

    <div class="row-item">
      <div class="row-main"><strong>코딩 교육 강사</strong></div>
      <div class="row-date">2022 ~ 2023</div>
    </div>
    <div class="row-sub">D-Lab, 로보그램 · C, Python, Web 교육 (1.5년)</div>

    <div class="row-item">
      <div class="row-main"><strong>UMC (University MakeUs Challenge)</strong></div>
      <div class="row-date">2024</div>
    </div>
    <div class="row-sub">Server 파트 · 코드 리뷰 및 기술 성장 지원</div>

    <div class="row-item">
      <div class="row-main"><strong>컴퓨터공학과 부회장</strong> <span>단국대학교</span></div>
      <div class="row-date">2022</div>
    </div>
    <div class="row-sub">학과 행사 기획 및 운영</div>

  </section>

  <!-- Education -->
  <section class="section">
    <div class="section-title">Education</div>

    <div class="row-item">
      <div class="row-main"><strong>단국대학교 컴퓨터공학과</strong> <span>졸업 예정</span></div>
      <div class="row-date">2021.03 ~ 2026.02</div>
    </div>
    <div class="row-item">
      <div class="row-main">
        <strong>경소톤(Hackathon) 동상</strong>
        <span>SW융합대학 X 경영경제대학 연합 — Dorazy</span>
      </div>
      <div class="row-date">2022.08</div>
    </div>

  </section>

</main>
```

---

## Task 7: Print CSS 검증 및 최종 조정

**Files:**
- Modify: `portfolio/resume.html` — 필요시 여백·폰트 크기 소폭 조정

**Step 1: 브라우저 인쇄 미리보기 열기**

Chrome 기준: `Cmd+P` → "저장 대상: PDF" → 미리보기에서 3페이지 이내인지 확인

체크리스트:
- [ ] 사이드바와 메인 컬럼이 동일 높이로 정렬되는지
- [ ] 페이지 경계에서 프로젝트 항목이 잘리지 않는지 (`page-break-inside: avoid` 작동)
- [ ] 링크 텍스트 옆에 URL이 중복 출력되지 않는지 (`a[href]::after { content: none }`)
- [ ] 사이드바 배경색이 인쇄에서도 유지되는지 (`print-color-adjust: exact`)

**Step 2: 3페이지 초과 시 조정 옵션**

분량이 넘치면 아래 순서대로 조정:
1. `body` font-size를 `14.5px`로 줄임 (기본 15px 기준)
2. `.section` `margin-bottom`을 `16px`로 줄임
3. `.project` `padding-bottom` / `margin-bottom`을 `12px`로 줄임
4. Professional Summary를 2문장으로 단축

**Step 3: 완료 확인 후 기존 resume.html 백업 삭제**

이전 버전이 git history에 남아 있으므로 별도 백업 파일 불필요.

---

## 완료 기준

- [ ] 투 컬럼 레이아웃 (사이드바 32% + 메인 68%) 브라우저 정상 렌더링
- [ ] Skills가 기능별 그룹으로 사이드바에 배치됨
- [ ] Projects가 exam-platform → Monitoring v3 → Monitoring v2 → k8s-cicd-automation 순으로 배치됨
- [ ] 각 프로젝트가 짧은 타이틀(프로젝트명) + 서브타이틀(설명형 이름) 구조로 표시됨
- [ ] evolution-tag (v2 GCP 전환 고도화 / v1 고도화) 표시됨
- [ ] 모든 성과 수치 유지 (P99 94%, 87.5%, 커버리지 92% 등)
- [ ] 연락처 하이퍼링크 (mailto, GitHub, Blog) 작동
- [ ] PDF 인쇄 기준 3페이지 이내
- [ ] 인쇄 시 링크 URL 중복 출력 없음
