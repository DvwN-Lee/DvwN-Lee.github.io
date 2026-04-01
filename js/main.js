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
    { label: 'AI Agent', value: 'agent' },
    { label: 'Platform', value: 'platform' },
    { label: 'Backend', value: 'backend' }
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

        var cardClass = 'mission-card';
        if (p.badge === 'Featured') cardClass += ' featured';
        else if (p.badge === 'Award') cardClass += ' award';
        var card = el('div', cardClass);

        // 상태 + 기간 행
        var statusRow = el('div', 'mission-status-row');
        if (p.badge === 'Featured') {
            var badge = el('span', 'featured-pill', '\u25B8 [FEATURED]');
            statusRow.appendChild(badge);
        } else if (p.badge === 'Award') {
            var award = el('span', 'award-pill', '\u25B8 [' + (p.awardLabel || 'AWARD') + ']');
            statusRow.appendChild(award);
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

        // 카드 클릭 → Chat Widget에서 프로젝트 상세 표시
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            if (e.target.closest('a')) return;
            document.dispatchEvent(new CustomEvent('cw:open-project', { detail: { projectId: p.id } }));
        });

        grid.appendChild(card);
    });
}

// ========================================
// Experience — Category Sub-cards
// ========================================
function renderExperience() {
    var list = document.getElementById('expList');
    if (!list) return;
    list.textContent = '';

    var groups = {};
    experiencesData.forEach(function(exp) {
        var cat = exp.category || 'Other';
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(exp);
    });

    var totalCompleted = 0;
    var totalRunning = 0;
    var totalAchievements = 0;

    Object.keys(groups).forEach(function(category) {
        var items = groups[category];
        var subcard = el('div', 'exp-subcard');

        // data-category 매핑
        var catMap = {
            'AI Agent': 'ai-agent',
            'Platform Engineering': 'platform',
            'Full-Stack Development': 'fullstack',
            'Teaching': 'teaching'
        };
        subcard.setAttribute('data-category', catMap[category] || 'ai-agent');

        // 범주 헤더 (아이콘 + 텍스트)
        var iconMap = {
            'AI Agent': 'fas fa-robot',
            'Platform Engineering': 'fas fa-server',
            'Full-Stack Development': 'fas fa-code',
            'Teaching': 'fas fa-chalkboard-teacher'
        };
        var header = el('div', 'exp-subcard-header');
        var icon = document.createElement('i');
        icon.className = iconMap[category] || 'fas fa-folder';
        header.appendChild(icon);
        header.appendChild(document.createTextNode(category));
        subcard.appendChild(header);

        items.forEach(function(exp) {
            var isRunning = exp.date.includes('present');
            if (isRunning) totalRunning++; else totalCompleted++;
            totalAchievements += exp.achievements.length;

            var node = el('div', 'exp-item');

            // 제목 행
            var titleRow = el('div', 'exp-item-title');
            titleRow.textContent = exp.title;
            node.appendChild(titleRow);

            // 부제목
            node.appendChild(el('div', 'exp-item-sub', exp.subtitle));

            // 메타 행 (상태 pill + 기간)
            var metaRow = el('div', 'exp-meta-row');
            var statusCls = isRunning ? 'exp-status exp-status--running' : 'exp-status exp-status--completed';
            metaRow.appendChild(el('span', statusCls, isRunning ? 'RUNNING' : 'COMPLETED'));
            metaRow.appendChild(el('span', 'exp-date', exp.date));
            node.appendChild(metaRow);

            // 하단 gradient fade + chevron 힌트
            var toggleHint = el('div', 'exp-toggle-hint');
            var chevronIcon = document.createElement('i');
            chevronIcon.className = 'fas fa-chevron-down';
            toggleHint.appendChild(chevronIcon);
            node.appendChild(toggleHint);

            // 성과 펼침 영역
            var details = el('div', 'exp-details');
            details.appendChild(el('div', 'exp-details-label', '\uC8FC\uC694 \uC131\uACFC'));

            exp.achievements.forEach(function(a) {
                var item = el('div', 'exp-tree-item');
                item.textContent = a;
                details.appendChild(item);
            });

            // duration 요약
            var duration = '';
            if (isRunning) {
                var start = new Date(exp.date.split(' ~ ')[0].replace('.', '-').replace('.', '-') + '-01');
                var months = Math.floor((new Date() - start) / (1000 * 60 * 60 * 24 * 30));
                duration = months + '\uAC1C\uC6D4+ \u00B7 ';
            } else {
                var parts = exp.date.split(' ~ ');
                var s = new Date(parts[0].replace('.', '-').replace('.', '-') + '-01');
                var e2 = new Date(parts[1].replace('.', '-').replace('.', '-') + '-01');
                var m = Math.round((e2 - s) / (1000 * 60 * 60 * 24 * 30));
                duration = m + '\uAC1C\uC6D4 \u00B7 ';
            }
            var summary = el('div', 'exp-details-summary');
            summary.textContent = duration + '\uC131\uACFC ' + exp.achievements.length + '\uAC74';
            if (isRunning) summary.textContent += ' \u00B7 \u25CF \uC9C4\uD589 \uC911';
            details.appendChild(summary);

            node.appendChild(details);

            // 클릭 토글 (CSS transition 기반)
            function toggleItem() {
                node.classList.toggle('is-open');
            }
            node.addEventListener('click', toggleItem);
            node.style.cursor = 'pointer';

            subcard.appendChild(node);
        });

        list.appendChild(subcard);
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
        btn.textContent = theme === 'dark' ? '\u2600' : '\u263D';
    }
    updateIcon();
    var floodEl = document.querySelector('#tvStatic feFlood');
    if (floodEl) floodEl.setAttribute('flood-color', getComputedStyle(document.documentElement).getPropertyValue('--agent').trim());

    btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateIcon();
        var floodEl = document.querySelector('#tvStatic feFlood'); if (floodEl) floodEl.setAttribute('flood-color', getComputedStyle(document.documentElement).getPropertyValue('--agent').trim());
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
    // Radio Static Noise — Section Reveal
    // 노이즈 바가 콘텐츠 선두에서 아래로 함께 이동하며 sweep
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
        var turbulence = document.querySelector('#tvStatic feTurbulence');

        // 로드 시 이미 뷰포트 안에 있는 섹션은 즉시 표시, 나머지만 pending
        var viewBottom = window.scrollY + window.innerHeight;
        document.querySelectorAll('section.section').forEach(function(s) {
            if (s.offsetTop < viewBottom) {
                // 이미 보이는 위치 — noise 없이 즉시 표시
            } else {
                s.classList.add('section--pending');
            }
        });

        function revealWithNoise(section) {
            var wrapper = section.querySelector('.card-wrapper');
            var innerCard = wrapper ? (wrapper.querySelector('.about-card, .stack-card, .projects-container, .exp-container') || wrapper) : section;
            var rect = innerCard.getBoundingClientRect();
            var sectionH = innerCard.offsetHeight;
            var docTop = window.scrollY + rect.top;
            var barHeight = 8;

            var noiseBar = document.createElement('div');
            noiseBar.className = 'static-noise-bar';
            noiseBar.style.cssText = 'left:' + rect.left + 'px;width:' + rect.width + 'px;top:' + docTop + 'px;height:' + barHeight + 'px';
            document.body.appendChild(noiseBar);

            var duration = 700;
            var delay = 75;
            var startTime = null;
            var lastSeedTime = 0;

            section.style.willChange = 'clip-path';
            section.style.clipPath = 'inset(0 0 100% 0)';
            section.classList.remove('section--pending');

            function tick(timestamp) {
                if (!startTime) startTime = timestamp;
                var elapsed = timestamp - startTime;

                if (timestamp - lastSeedTime > 50) {
                    if (turbulence) turbulence.setAttribute('seed', Math.floor(Math.random() * 9999));
                    lastSeedTime = timestamp;
                }

                if (elapsed < delay) {
                    if (Math.random() > 0.7) {
                        noiseBar.style.opacity = (Math.random() > 0.5) ? '0.9' : '0.2';
                    }
                    requestAnimationFrame(tick);
                    return;
                }

                var sweepElapsed = elapsed - delay;
                var progress = Math.min(sweepElapsed / duration, 1);
                var eased = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                var clipBottom = 100 - (eased * 100);

                // clip-path는 section 전체 기준이므로, wrapper 비율을 section 비율로 변환
                var wrapperBottom = wrapper ? (wrapper.offsetTop + sectionH) : sectionH;
                var sectionTotalH = section.offsetHeight;
                var revealedPx = sectionH * eased;
                var clipBottomPx = sectionTotalH - (wrapper ? wrapper.offsetTop : 0) - revealedPx;
                var clipBottomPct = Math.max(0, (clipBottomPx / sectionTotalH) * 100);
                section.style.clipPath = 'inset(0 0 ' + clipBottomPct + '% 0)';

                var noiseTop = docTop + (sectionH * eased) - barHeight / 2;
                noiseBar.style.top = noiseTop + 'px';

                if (Math.random() > 0.6) {
                    noiseBar.style.opacity = (0.5 + Math.random() * 0.5).toFixed(2);
                }

                if (progress < 1) {
                    requestAnimationFrame(tick);
                } else {
                    section.style.clipPath = '';
                    section.style.willChange = 'auto';
                    noiseBar.remove();
                }
            }

            requestAnimationFrame(tick);
        }

        var sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    revealWithNoise(entry.target);
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0, rootMargin: '0px 0px -30% 0px' });

        document.querySelectorAll('section.section.section--pending').forEach(function(s) {
            sectionObserver.observe(s);
        });
    }
    initChatWidget();
});
