// ========================================
// Chat Widget Module
// ========================================

import { config } from './data/config.js';
import { projectsData } from './data/projects.js';
import { skillsData } from './data/skills.js';
import { experiencesData } from './data/experiences.js';

// ========================================
// State
// ========================================
let isAnimating = false;
let currentConvo = null;

const PRESETS = ['\uc18c\uac1c', 'Projects', 'Skills', 'Experience', 'Contact'];

// ========================================
// Helper Functions
// ========================================

function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
}

function cwScrollBottom(cwBody) {
    const threshold = 30;
    const isNearBottom = cwBody.scrollHeight - cwBody.scrollTop - cwBody.clientHeight < threshold;
    if (isNearBottom) {
        cwBody.scrollTop = cwBody.scrollHeight;
    }
}

function cwAddUser(cwBody, text) {
    const m = el('div', 'msg user-msg');
    m.appendChild(el('div', 'msg-role user', '\uD83D\uDC64 User'));
    const b = el('div', 'msg-bubble');
    b.textContent = text;
    m.appendChild(b);
    cwBody.appendChild(m);
    cwScrollBottom(cwBody);
    return m;
}

function cwAddAgent(cwBody) {
    const m = el('div', 'msg agent-msg');
    m.appendChild(el('div', 'msg-role agent', '\uD83E\uDD16 Agent'));
    const b = el('div', 'msg-bubble');
    m.appendChild(b);
    cwBody.appendChild(m);
    cwScrollBottom(cwBody);
    return { msg: m, bubble: b };
}

function cwStream(cwBody, elem, text) {
    return new Promise((resolve) => {
        const cur = el('span', 'cursor');
        elem.appendChild(cur);
        const chunks = [];
        const words = text.split(/(?<=\s)/);
        let buf = '';
        for (let w = 0; w < words.length; w++) {
            buf += words[w];
            if (buf.length >= 4 || w === words.length - 1) {
                chunks.push(buf);
                buf = '';
            }
        }
        let i = 0;
        function tick() {
            if (i < chunks.length) {
                const s = el('span', 'chunk');
                s.textContent = chunks[i];
                elem.insertBefore(s, cur);
                cwScrollBottom(cwBody);
                i++;
                setTimeout(tick, 45);
            } else {
                cur.remove();
                resolve();
            }
        }
        tick();
    });
}

function cwDelay(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

function cwFadeIn(e) {
    e.style.opacity = '0';
    e.style.transform = 'translateY(6px)';
    requestAnimationFrame(() => {
        e.style.transition = 'all .3s ease';
        e.style.opacity = '1';
        e.style.transform = 'translateY(0)';
    });
}

function cwToolCall(cwBody, bubble, name, items) {
    const tc = el('div', 'tc');
    tc.appendChild(el('div', 'tc-h', '\uD83D\uDD27 tool_call: ' + name));
    items.forEach((t) => {
        const it = el('div', 'tc-item');
        it.appendChild(el('span', 'tc-dot'));
        it.appendChild(document.createTextNode(t));
        tc.appendChild(it);
    });
    bubble.appendChild(tc);
    cwFadeIn(tc);
    cwScrollBottom(cwBody);
}

function cwPresets(cwBody, bubble, handleFn) {
    const row = el('div', 'presets');
    PRESETS.forEach((p) => {
        const btn = el('button', 'preset-btn', p);
        btn.addEventListener('click', () => handleFn(p));
        row.appendChild(btn);
    });
    bubble.appendChild(row);
    cwFadeIn(row);
}

function cwRemovePrev() {
    return new Promise((resolve) => {
        if (!currentConvo) {
            resolve();
            return;
        }
        const els = [currentConvo.u, currentConvo.a];
        let done = 0;
        els.forEach((e) => {
            e.classList.add('fade-out');
            e.addEventListener('animationend', () => {
                if (e.parentNode) e.parentNode.removeChild(e);
                done++;
                if (done >= 2) resolve();
            });
        });
        currentConvo = null;
    });
}

// ========================================
// Data Accessors
// ========================================

function getIntroData() {
    return {
        text: config.about.paragraphs
            ? config.about.title + ' ' + config.about.paragraphs[0]
            : config.about.title,
        toolName: 'get_profile()',
        toolResults: [
            'Email: ' + config.email,
            'GitHub: ' + (config.socials[0]?.handle || 'github.com/DvwN-Lee'),
            'Location: ' + (config.contact?.location || 'Korea')
        ]
    };
}

function getProjectsForChat() {
    return projectsData.map((p) => ({
        id: p.id,
        name: p.title,
        sub: p.badge || p.category,
        desc: p.summary,
        tags: p.tech,
        metrics: extractMetrics(p),
        github: p.githubUrl,
        details: p.modalDetails?.[0]?.content || p.summary
    }));
}

function extractMetrics(p) {
    // Extract meaningful metrics from project highlights/data
    const metrics = [];
    if (p.id === 'financial') metrics.push(['99', 'tests'], ['94', 'commits'], ['RAGAS faith', '1.000'], ['3', 'Docker services']);
    else if (p.id === 'llm-obs') metrics.push(['11', 'LLM metrics'], ['5', 'load scenarios'], ['TTFT', '213x degradation'], ['10', 'Grafana panels']);
    else if (p.id === 'ai-exam') metrics.push(['957', 'tests'], ['309', 'commits'], ['95%', 'coverage'], ['86', 'PRs']);
    else if (p.id === 'token') metrics.push(['3-layer', 'architecture'], ['4', 'CLI commands'], ['v1.1.0', 'release']);
    else if (p.id === 'saga') metrics.push(['9', 'core docs'], ['19', 'research docs'], ['6', 'phases']);
    else if (p.id === 'clmux') metrics.push(['234', 'lines'], ['iTerm2', 'optimized']);
    return metrics;
}

function getSkillsForChat() {
    return skillsData.map((s) => ({
        title: s.title,
        tags: s.skills.map((sk) => sk.name)
    }));
}

function getExperienceForChat() {
    return experiencesData.map((e) => ({
        period: e.date,
        title: e.title,
        desc: e.subtitle || (e.achievements ? e.achievements[0] : '')
    }));
}

function getContactData() {
    return config.contact || {
        email: config.email,
        github: config.socials[0]?.handle || 'github.com/DvwN-Lee',
        location: 'Korea'
    };
}

// ========================================
// Handlers
// ========================================

function createInlineLink(text, sectionSelector) {
    const wrapper = document.createElement('span');
    const a = document.createElement('a');
    a.className = 'cw-inline-link';
    a.href = sectionSelector;
    if (text) a.appendChild(document.createTextNode(text + ' '));
    const icon = document.createElement('i');
    icon.className = 'fas fa-arrow-up-right-from-square';
    icon.style.fontSize = '0.65em';
    a.appendChild(icon);
    a.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(sectionSelector);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    wrapper.appendChild(a);
    wrapper.appendChild(document.createTextNode('\u00A0'));
    return wrapper;
}

async function cwHandle(cwBody, name) {
    if (isAnimating) return;
    isAnimating = true;

    await cwRemovePrev();
    const u = cwAddUser(cwBody, name);
    await cwDelay(200);
    const a = cwAddAgent(cwBody);
    currentConvo = { u: u, a: a.msg };

    if (name === '\uc18c\uac1c') {
        const intro = getIntroData();
        a.bubble.appendChild(createInlineLink('\uC800\uB294', '#about'));
        await cwStream(cwBody, a.bubble, ' LangGraph, MCP Protocol, RAG \uAE30\uBC18 AI Agent\uB97C \uC124\uACC4\uD558\uACE0 \uAD6C\uD604\uD558\uB294 AI Agent Developer\uC785\uB2C8\uB2E4. FastAPI + Docker Compose\uB85C Agent \uC11C\uBE44\uC2A4\uB97C \uBC30\uD3EC\uD558\uACE0, Prometheus \uAE30\uBC18 LLM \uC804\uC6A9 \uBA54\uD2B8\uB9AD\uC744 \uC124\uACC4\uD558\uC5EC Observability\uB97C \uD655\uBCF4\uD55C \uACBD\uD5D8\uC774 \uC788\uC2B5\uB2C8\uB2E4.');
        await cwDelay(150);
        cwToolCall(cwBody, a.bubble, intro.toolName, intro.toolResults);
    } else if (name === 'Projects') {
        const projects = getProjectsForChat();
        a.bubble.appendChild(createInlineLink('Projects', '#projects'));
        await cwStream(cwBody, a.bubble, ' \uBAA9\uB85D\uC785\uB2C8\uB2E4.');
        await cwDelay(150);
        cwToolCall(cwBody, a.bubble, 'get_projects()', projects.map((p) => p.name + ' \u2014 ' + p.sub));
        await cwDelay(150);
        const cards = el('div', 'cw-cards');
        projects.forEach((p) => {
            const c = el('div', 'cw-card');
            c.appendChild(el('div', 'cw-card-name', p.name));
            c.appendChild(el('div', 'cw-card-sub', p.sub));
            c.addEventListener('click', () => cwProjectDetail(cwBody, p));
            cards.appendChild(c);
        });
        a.bubble.appendChild(cards);
        cwFadeIn(cards);
    } else if (name === 'Skills') {
        const skills = getSkillsForChat();
        a.bubble.appendChild(createInlineLink('\uAE30\uC220 \uC2A4\uD0DD', '#skills'));
        await cwStream(cwBody, a.bubble, '\uC785\uB2C8\uB2E4.');
        await cwDelay(150);
        const g = el('div', 'cw-s-grid');
        skills.forEach((s) => {
            const c = el('div', 'cw-s-card');
            c.appendChild(el('div', 'cw-s-title', s.title));
            const t = el('div', 'cw-s-tags');
            s.tags.forEach((tag) => t.appendChild(el('span', 'cw-s-tag', tag)));
            c.appendChild(t);
            g.appendChild(c);
        });
        a.bubble.appendChild(g);
        cwFadeIn(g);
    } else if (name === 'Experience') {
        const experience = getExperienceForChat();
        a.bubble.appendChild(createInlineLink('Experience', '#experience'));
        await cwStream(cwBody, a.bubble, ' \uD0C0\uC784\uB77C\uC778\uC785\uB2C8\uB2E4.');
        await cwDelay(150);
        const list = el('div');
        experience.forEach((e) => {
            const it = el('div', 'cw-exp');
            it.appendChild(el('div', 'cw-exp-period', e.period));
            it.appendChild(el('div', 'cw-exp-title', e.title));
            it.appendChild(el('div', 'cw-exp-desc', e.desc));
            list.appendChild(it);
        });
        a.bubble.appendChild(list);
        cwFadeIn(list);
    } else if (name === 'Contact') {
        const c = getContactData();
        a.bubble.appendChild(createInlineLink('Contact', '.footer'));
        await cwStream(cwBody, a.bubble, ' \uC815\uBCF4\uC785\uB2C8\uB2E4.');
        await cwDelay(150);
        const row = el('div');
        [
            ['Email', c.email, 'mailto:' + c.email],
            ['GitHub', c.github, 'https://' + c.github],
            ['Location', c.location, null]
        ].forEach((item) => {
            const it = el('div', 'cw-contact-item');
            it.appendChild(el('strong', '', item[0] + ': '));
            if (item[2]) {
                const a2 = document.createElement('a');
                a2.href = item[2];
                a2.textContent = item[1];
                a2.target = '_blank';
                a2.rel = 'noopener noreferrer';
                it.appendChild(a2);
            } else {
                it.appendChild(document.createTextNode(item[1]));
            }
            row.appendChild(it);
        });
        a.bubble.appendChild(row);
        cwFadeIn(row);
    }
    cwScrollBottom(cwBody);
    isAnimating = false;
}

async function cwProjectDetail(cwBody, p) {
    if (isAnimating) return;
    isAnimating = true;
    await cwRemovePrev();
    const u = cwAddUser(cwBody, p.name + ' \uC0C1\uC138');
    await cwDelay(200);
    const a = cwAddAgent(cwBody);
    currentConvo = { u: u, a: a.msg };
    await cwStream(cwBody, a.bubble, p.desc);
    await cwDelay(150);
    cwToolCall(cwBody, a.bubble, 'get_detail("' + p.id + '")', p.tags);
    await cwDelay(150);
    const d = el('div', 'cw-detail');
    const ml = el('div');
    ml.appendChild(el('div', 'cw-detail-label', 'Metrics'));
    const mr = el('div', 'cw-detail-metrics');
    p.metrics.forEach((m) => {
        const dm = el('div', 'cdm');
        const b = document.createElement('b');
        b.textContent = m[0];
        dm.appendChild(b);
        dm.appendChild(document.createTextNode(' ' + m[1]));
        mr.appendChild(dm);
    });
    ml.appendChild(mr);
    d.appendChild(ml);
    d.appendChild(el('p', '', p.details));
    const lk = document.createElement('a');
    lk.href = p.github;
    lk.target = '_blank';
    lk.rel = 'noopener noreferrer';
    lk.textContent = 'GitHub \u2197';
    lk.style.cssText = 'font-size:.78rem;color:var(--agent);text-decoration:none;font-weight:600';
    d.appendChild(lk);
    a.bubble.appendChild(d);
    cwFadeIn(d);
    cwScrollBottom(cwBody);
    isAnimating = false;
}

// ========================================
// Init
// ========================================

export function initChatWidget() {
    const widget = document.getElementById('chatWidget');
    const fab = document.getElementById('chatFab');
    const cwBody = document.getElementById('cwBody');
    const closeBtn = document.getElementById('chatClose');

    if (!widget || !fab || !cwBody || !closeBtn) return;

    // Close -> FAB
    closeBtn.addEventListener('click', () => {
        widget.classList.add('collapsed');
        setTimeout(() => fab.classList.add('visible'), 200);
    });

    // FAB -> Open
    fab.addEventListener('click', () => {
        fab.classList.remove('visible');
        widget.classList.remove('collapsed');
    });

    // Init greeting
    async function cwInit() {
        await cwDelay(500);
        const a = cwAddAgent(cwBody);
        await cwStream(
            cwBody,
            a.bubble,
            '\uC548\uB155\uD558\uC138\uC694! AI Agent Developer \uC774\uB3D9\uC8FC\uC758 \uD3EC\uD2B8\uD3F4\uB9AC\uC624\uC785\uB2C8\uB2E4. \uBB34\uC5C7\uC774 \uAD81\uAE08\uD558\uC2E0\uAC00\uC694?'
        );
        cwPresets(cwBody, a.bubble, (name) => cwHandle(cwBody, name));
    }

    cwInit();
}
