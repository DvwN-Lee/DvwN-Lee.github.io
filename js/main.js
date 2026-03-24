// ========================================
// Main Entry Point — AI Agent Developer Portfolio
// Renders Skills, Projects (with filter), Experience
// ========================================

import { skillsData } from './data/skills.js';
import { projectsData } from './data/projects.js';
import { experiencesData } from './data/experiences.js';
import { initChatWidget } from './chat-widget.js';

// ========================================
// Helper
// ========================================
function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
}

// ========================================
// Skills — Stack Card + Category Subcards
// ========================================
function renderSkills() {
    var container = document.getElementById('skillsGrid');
    if (!container) return;
    container.textContent = '';

    skillsData.forEach(function(cat) {
        // 서브카드 (카테고리)
        var subcard = el('div', 'stack-subcard');

        // 카테고리 타이틀
        var titleEl = el('div', 'stack-subcard-title');
        if (cat.icon) {
            var icon = document.createElement('i');
            icon.className = cat.icon;
            titleEl.appendChild(icon);
            titleEl.appendChild(document.createTextNode(' ' + cat.title));
        } else {
            titleEl.textContent = cat.title;
        }
        subcard.appendChild(titleEl);

        // 도구 pill 그리드
        var pills = el('div', 'stack-pills');
        cat.skills.forEach(function(skill) {
            var pill = el('div', 'stack-pill');

            // 아이콘
            if (skill.iconUrl) {
                var img = document.createElement('img');
                img.src = skill.iconUrl;
                img.alt = skill.name;
                img.width = 18;
                img.height = 18;
                img.className = 'stack-pill-icon';
                pill.appendChild(img);
            } else if (skill.iconClass) {
                var icon = document.createElement('i');
                icon.className = skill.iconClass + ' stack-pill-fa';
                pill.appendChild(icon);
            }

            // 이름
            pill.appendChild(el('span', 'stack-pill-name', skill.name));

            pills.appendChild(pill);
        });
        subcard.appendChild(pills);
        container.appendChild(subcard);
    });
}

// ========================================
// Projects — Accordion (Agent Execution Log)
// ========================================
const CATEGORIES = [
    { label: 'All', value: 'all' },
    { label: 'Agent System', value: 'agent' },
    { label: 'LLM Infra', value: 'infra' },
    { label: 'Agent Tooling', value: 'tooling' }
];

function renderFilterTabs(onFilter) {
    const container = document.getElementById('filterTabs');
    if (!container) return;

    CATEGORIES.forEach(function(cat, i) {
        const btn = el('button', 'filter-tab' + (i === 0 ? ' active' : ''), cat.label);
        btn.addEventListener('click', function() {
            container.querySelectorAll('.filter-tab').forEach(function(t) { t.classList.remove('active'); });
            btn.classList.add('active');
            onFilter(cat.value);
        });
        container.appendChild(btn);
    });
}

function renderProjects(category) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.textContent = '';

    projectsData.forEach(function(p) {
        if (category !== 'all' && p.category !== category) return;

        const card = el('div', 'exec-card');

        // Header (always visible)
        const header = el('div', 'exec-header');
        header.appendChild(el('span', 'exec-arrow', '\u25B6'));
        const headerInfo = el('div', 'exec-header-info');
        headerInfo.appendChild(el('span', 'exec-name', p.title));
        const meta = el('div', 'exec-meta');
        meta.appendChild(el('span', 'exec-period', p.badge || ''));
        meta.appendChild(el('span', 'exec-cat', p.category || ''));
        headerInfo.appendChild(meta);
        header.appendChild(headerInfo);
        card.appendChild(header);

        // Body (collapsed)
        const body = el('div', 'exec-body');
        body.style.display = 'none';

        body.appendChild(el('p', 'exec-desc', p.summary));

        body.appendChild(el('div', 'exec-tool-label', 'tool_calls:'));
        const toolTags = el('div', 'exec-tool-tags');
        p.tech.forEach(function(t) { toolTags.appendChild(el('span', 'exec-tool-tag', t)); });
        body.appendChild(toolTags);

        // Metrics
        const metrics = getProjectMetrics(p);
        if (metrics.length > 0) {
            const metricsEl = el('div', 'exec-metrics');
            metrics.forEach(function(m) {
                const pm = el('span', 'pm');
                pm.appendChild(el('b', '', m[0]));
                pm.appendChild(document.createTextNode(' ' + m[1]));
                metricsEl.appendChild(pm);
            });
            body.appendChild(metricsEl);
        }

        // GitHub link
        const ghLink = document.createElement('a');
        ghLink.className = 'exec-gh';
        ghLink.href = p.githubUrl;
        ghLink.target = '_blank';
        ghLink.rel = 'noopener noreferrer';
        ghLink.textContent = 'GitHub \u2197';
        body.appendChild(ghLink);

        card.appendChild(body);

        // Toggle
        header.addEventListener('click', function() {
            var isOpen = body.style.display !== 'none';
            body.style.display = isOpen ? 'none' : 'block';
            header.querySelector('.exec-arrow').textContent = isOpen ? '\u25B6' : '\u25BC';
            card.classList.toggle('exec-open', !isOpen);
        });

        // Featured: expand by default
        if (p.badge === 'Featured') {
            body.style.display = 'block';
            header.querySelector('.exec-arrow').textContent = '\u25BC';
            card.classList.add('exec-open');
        }

        grid.appendChild(card);
    });
}

function getProjectMetrics(p) {
    if (p.id === 'financial') return [['99', 'tests'], ['94', 'commits'], ['1.000', 'RAGAS faith'], ['3', 'Docker services']];
    if (p.id === 'llm-obs') return [['11', 'LLM metrics'], ['5', 'load scenarios'], ['213x', 'TTFT degradation'], ['10', 'Grafana panels']];
    if (p.id === 'ai-exam') return [['957', 'tests'], ['309', 'commits'], ['95%', 'coverage'], ['86', 'PRs']];
    if (p.id === 'token') return [['3-layer', 'architecture'], ['4', 'CLI commands'], ['v1.1.0', 'release']];
    if (p.id === 'saga') return [['9', 'core docs'], ['19', 'research docs'], ['6', 'phases']];
    if (p.id === 'clmux') return [['234', 'lines'], ['iTerm2', 'optimized']];
    return [];
}

// ========================================
// Experience — Vertical Timeline
// ========================================
function renderExperience() {
    const list = document.getElementById('expList');
    if (!list) return;
    list.textContent = '';
    list.className = 'timeline';

    experiencesData.forEach(function(exp) {
        const item = el('div', 'timeline-item');
        const dot = el('div', 'timeline-dot');
        const content = el('div', 'timeline-content');
        content.appendChild(el('div', 'timeline-period', exp.date));
        content.appendChild(el('div', 'timeline-title', exp.title));
        var desc = exp.subtitle || (exp.achievements ? exp.achievements[0] : '');
        if (desc) {
            content.appendChild(el('div', 'timeline-desc', desc));
        }
        item.appendChild(dot);
        item.appendChild(content);
        list.appendChild(item);
    });
}

// ========================================
// Theme
// ========================================
function initTheme() {
    const btn = document.getElementById('themeBtn');
    if (!btn) return;

    const saved = localStorage.getItem('theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) document.documentElement.setAttribute('data-theme', 'dark');
    }

    function updateIcon() {
        const theme = document.documentElement.getAttribute('data-theme');
        btn.textContent = theme === 'dark' ? '\u2606' : '\u263D';
    }
    updateIcon();

    btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateIcon();
    });
}

// ========================================
// Scroll Spy — Side Navigation
// ========================================
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.side-nav-link');

    function updateActiveNav() {
        let current = 'home';
        sections.forEach(function(section) {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
}

// ========================================
// Hero — Neural Network Node Graph
// ========================================
function initNodeGraph() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const hero = canvas.parentElement;

    let nodes = [];
    const NODE_COUNT = 35;
    const CONNECT_DIST = 150;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createNodes() {
        nodes = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                r: 2 + Math.random() * 2,
                opacity: 0.3 + Math.random() * 0.3
            });
        }
    }

    function update() {
        nodes.forEach(function(n) {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
            if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                var dx = nodes[i].x - nodes[j].x;
                var dy = nodes[i].y - nodes[j].y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    var alpha = (1 - dist / CONNECT_DIST) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = 'rgba(34,197,94,' + alpha + ')';
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        nodes.forEach(function(n) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(34,197,94,' + n.opacity + ')';
            ctx.fill();
        });
    }

    function animate() {
        if (!reducedMotion) update();
        draw();
        requestAnimationFrame(animate);
    }

    resize();
    createNodes();
    animate();

    window.addEventListener('resize', function() {
        resize();
        nodes.forEach(function(n) {
            if (n.x > canvas.width) n.x = canvas.width - 10;
            if (n.y > canvas.height) n.y = canvas.height - 10;
        });
    });
}

// ========================================
// Init
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNodeGraph();
    initScrollSpy();
    renderSkills();
    renderFilterTabs((cat) => renderProjects(cat));
    renderProjects('all');
    renderExperience();
    initChatWidget();
});
