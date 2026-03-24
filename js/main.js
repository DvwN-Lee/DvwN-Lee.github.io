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
// Skills — Card Style
// ========================================
function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    if (!grid) return;

    skillsData.forEach((cat) => {
        const card = el('div', 'skill-card');
        card.appendChild(el('div', 'skill-card-title', cat.title));

        const tags = el('div', 'skill-tags');
        cat.skills.forEach((sk) => {
            tags.appendChild(el('span', 'skill-tag', sk.name));
        });
        card.appendChild(tags);
        grid.appendChild(card);
    });
}

// ========================================
// Projects — Card Style
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

    CATEGORIES.forEach((cat, i) => {
        const btn = el('button', 'filter-tab' + (i === 0 ? ' active' : ''), cat.label);
        btn.addEventListener('click', () => {
            container.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('active'));
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

    projectsData.forEach((p) => {
        if (category !== 'all' && p.category !== category) return;

        const card = el('div', 'proj-card');

        // Badge
        if (p.badge) {
            card.appendChild(el('span', 'proj-badge', p.badge));
        }

        // Name + summary
        card.appendChild(el('div', 'proj-name', p.title));
        card.appendChild(el('div', 'proj-desc', p.summary));

        // Tool calls label + tags
        card.appendChild(el('div', 'proj-tools-label', 'tool_calls'));
        const toolTags = el('div', 'proj-tool-tags');
        p.tech.forEach((t) => {
            toolTags.appendChild(el('span', 'proj-tool-tag', t));
        });
        card.appendChild(toolTags);

        // Metrics
        const metrics = getProjectMetrics(p);
        if (metrics.length > 0) {
            const metricsDiv = el('div', 'proj-metrics');
            metrics.forEach((m) => {
                const pm = el('span', 'pm');
                const b = el('b', '', m[0]);
                pm.appendChild(b);
                pm.appendChild(document.createTextNode(' ' + m[1]));
                metricsDiv.appendChild(pm);
            });
            card.appendChild(metricsDiv);
        }

        // Actions
        const ac = el('div', 'proj-actions');
        const gh = document.createElement('a');
        gh.className = 'btn btn-outline';
        gh.href = p.githubUrl;
        gh.target = '_blank';
        gh.rel = 'noopener noreferrer';
        gh.textContent = 'GitHub \u2197';
        ac.appendChild(gh);
        card.appendChild(ac);

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
// Experience — Timeline Style
// ========================================
function renderExperience() {
    const list = document.getElementById('expList');
    if (!list) return;

    experiencesData.forEach((e) => {
        const item = el('div', 'exp-item');
        item.appendChild(el('div', 'exp-period', e.date));
        item.appendChild(el('div', 'exp-title', e.title));

        const desc = e.subtitle || (e.achievements ? e.achievements[0] : '');
        if (desc) {
            item.appendChild(el('div', 'exp-desc', desc));
        }
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
