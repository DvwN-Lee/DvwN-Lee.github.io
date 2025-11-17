// ========================================
// Skills Data Module
// ========================================

/**
 * 스킬 아이템 데이터 스키마
 * @typedef {Object} Skill
 * @property {string} name - 스킬 이름
 * @property {string} iconUrl - 아이콘 이미지 URL
 * @property {number} level - 숙련도 (0-100)
 * @property {string} [iconStyle] - 선택적 아이콘 스타일
 */

/**
 * 스킬 카테고리 데이터 스키마
 * @typedef {Object} SkillCategory
 * @property {string} icon - Font Awesome 아이콘 클래스
 * @property {string} title - 카테고리 제목
 * @property {Skill[]} skills - 스킬 목록
 */

/**
 * 전체 스킬 데이터
 * @type {SkillCategory[]}
 */
export const skillsData = [
  {
    icon: 'fas fa-ship',
    title: 'Container & Orchestration',
    skills: [
      { name: 'Kubernetes', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', level: 90 },
      { name: 'Docker', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', level: 90 },
      { name: 'Helm', iconUrl: 'https://www.vectorlogo.zone/logos/helmsh/helmsh-icon.svg', level: 85, iconStyle: 'filter: invert(0.2);' },
      { name: 'Kustomize', iconUrl: 'images/kustomize.png', level: 80 },
      { name: 'Skaffold', iconUrl: 'images/skaffold.svg', level: 75 }
    ]
  },
  {
    icon: 'fas fa-code',
    title: 'IaC & GitOps',
    skills: [
      { name: 'Terraform', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg', level: 85 },
      { name: 'ArgoCD', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/argocd/argocd-original.svg', level: 85 },
      { name: 'GitHub Actions', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', level: 90 }
    ]
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Service Mesh & Security',
    skills: [
      { name: 'Istio', iconUrl: 'https://www.vectorlogo.zone/logos/istioio/istioio-icon.svg', level: 75 },
      { name: 'Kiali', iconUrl: 'images/kiali.png', level: 70 },
      { name: 'Trivy', iconUrl: 'https://raw.githubusercontent.com/aquasecurity/trivy/main/docs/imgs/logo.png', level: 80 }
    ]
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Monitoring & Observability',
    skills: [
      { name: 'Prometheus', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg', level: 85 },
      { name: 'Grafana', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg', level: 85 },
      { name: 'Loki', iconUrl: 'https://raw.githubusercontent.com/grafana/loki/main/docs/sources/logo.png', level: 80 },
      { name: 'k6', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/K6-logo.svg', level: 75 }
    ]
  },
  {
    icon: 'fas fa-server',
    title: 'Backend Development',
    skills: [
      { name: 'Go', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg', level: 85 },
      { name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 90 },
      { name: 'FastAPI', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', level: 85 },
      { name: 'Django', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', level: 80 },
      { name: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', level: 85 },
      { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', level: 80 }
    ]
  },
  {
    icon: 'fas fa-database',
    title: 'Database & Storage',
    skills: [
      { name: 'PostgreSQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', level: 85 },
      { name: 'Redis', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', level: 80 },
      { name: 'MySQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', level: 75 },
      { name: 'SQLite', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg', level: 75 }
    ]
  },
  {
    icon: 'fas fa-tools',
    title: 'Tools & Platform',
    skills: [
      { name: 'Git', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', level: 85 },
      { name: 'Linux', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', level: 80 }
    ]
  }
];
