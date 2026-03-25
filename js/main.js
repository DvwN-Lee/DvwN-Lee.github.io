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
// Projects — Mission Brief Cards
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

function renderProjects(cat) {
    var grid = document.getElementById('projectsGrid');
    grid.textContent = '';

    projectsData.forEach(function(p) {
        if (cat !== 'all' && p.category !== cat) return;

        var card = el('div', 'mission-card' + (p.badge === 'Featured' ? ' featured' : ''));

        // 상태 + 기간 행
        var statusRow = el('div', 'mission-status-row');
        if (p.badge === 'Featured') {
            var badge = el('span', 'featured-pill', '\u25B8 [FEATURED]');
            statusRow.appendChild(badge);
        } else {
            var status = el('span', 'mission-status', '[DONE]');
            statusRow.appendChild(status);
        }
        card.appendChild(statusRow);

        // 주제목
        card.appendChild(el('div', 'mission-heading', p.heading || p.title));
        // 부제목 (repo명)
        card.appendChild(el('div', 'mission-repo', p.title));

        // 설명
        card.appendChild(el('p', 'mission-desc', p.summary));

        // 기술 pill 태그
        var pills = el('div', 'mission-pills');
        p.tech.slice(0, 6).forEach(function(t) {
            pills.appendChild(el('span', 'mission-pill', t));
        });
        card.appendChild(pills);

        // GitHub 링크
        var actions = el('div', 'mission-actions');
        var gh = document.createElement('a');
        gh.className = 'mission-gh';
        gh.href = p.githubUrl;
        gh.target = '_blank';
        gh.rel = 'noopener noreferrer';
        gh.textContent = 'GitHub \u2197';
        actions.appendChild(gh);
        card.appendChild(actions);

        grid.appendChild(card);
    });
}

// ========================================
// Experience — Container + Timeline
// ========================================
function renderExperience() {
    var list = document.getElementById('expList');
    if (!list) return;
    list.textContent = '';

    experiencesData.forEach(function(exp) {
        var node = el('div', 'exp-node');

        // 기간
        node.appendChild(el('div', 'exp-period', exp.date));

        // 역할/활동 제목
        node.appendChild(el('div', 'exp-heading', exp.title));

        // 설명/성과
        var desc = exp.subtitle || (exp.achievements ? exp.achievements[0] : '');
        if (desc) {
            node.appendChild(el('div', 'exp-desc', desc));
        }

        list.appendChild(node);
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
    const footer = document.getElementById('footer');
    const navLinks = document.querySelectorAll('.side-nav-link');
    const homeLink = document.querySelector('.side-nav-link[data-section="home"]');

    function updateActiveNav() {
        let current = 'home';
        sections.forEach(function(section) {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        // Footer(Contact) detection: near bottom of page
        if (footer) {
            var atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
            if (atBottom) current = 'footer';
        }

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });

        // Home hint: show dot when scrolled past hero
        if (homeLink) {
            var heroBottom = (sections[0] ? sections[0].offsetTop + sections[0].offsetHeight : window.innerHeight);
            if (window.scrollY > heroBottom * 0.5) {
                homeLink.classList.add('has-hint');
            } else {
                homeLink.classList.remove('has-hint');
            }
        }
    }

    window.addEventListener('scroll', updateActiveNav);

    // Smooth scroll on nav link click
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
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
