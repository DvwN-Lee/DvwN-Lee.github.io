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
let suppressAutoScroll = false;

const PRESETS = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

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
    if (suppressAutoScroll) return;
    if (cwBody.scrollHeight - cwBody.clientHeight < 10) return;
    const threshold = 30;
    const isNearBottom = cwBody.scrollHeight - cwBody.scrollTop - cwBody.clientHeight < threshold;
    if (isNearBottom) {
        cwBody.scrollTop = cwBody.scrollHeight;
    }
}

function cwAddUser(cwBody, text) {
    var m = el('div', 'msg user-msg');
    var label = el('div', 'msg-label-row');
    var icon = document.createElement('i');
    icon.className = 'fas fa-user';
    label.appendChild(icon);
    label.appendChild(document.createTextNode(' User'));
    m.appendChild(label);
    var content = el('div', 'msg-content');
    var prompt = el('span', 'user-prompt', '$');
    content.appendChild(prompt);
    content.appendChild(document.createTextNode(' ' + text));
    m.appendChild(content);
    cwBody.appendChild(m);
    cwScrollBottom(cwBody);
    return m;
}

function cwAddAgent(cwBody) {
    var m = el('div', 'msg agent-msg');
    var label = el('div', 'msg-label-row');
    var icon = document.createElement('i');
    icon.className = 'fas fa-robot';
    label.appendChild(icon);
    label.appendChild(document.createTextNode(' 이동주'));
    m.appendChild(label);
    var content = el('div', 'msg-content');
    var prompt = el('span', 'agent-prompt', '>');
    content.appendChild(prompt);
    m.appendChild(content);
    cwBody.appendChild(m);
    cwScrollBottom(cwBody);
    return { msg: m, bubble: content };
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
    var tc = el('div', 'tc');
    tc.appendChild(el('div', 'tc-h', 'tool_call: ' + name));
    items.forEach(function(t, i) {
        var item = el('div', 'tc-item');
        var branch = el('span', 'tc-branch', i < items.length - 1 ? '\u251C ' : '\u2514 ');
        item.appendChild(branch);
        item.appendChild(document.createTextNode(t));
        tc.appendChild(item);
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
    if (!currentConvo) return;
    [currentConvo.sep, currentConvo.u, currentConvo.a].filter(Boolean).forEach(function(e) {
        if (e.parentNode) e.parentNode.removeChild(e);
    });
    currentConvo = null;
}

// ========================================
// Data Accessors
// ========================================

function getProjectsForChat() {
    return projectsData.map((p) => ({
        id: p.id,
        name: p.title,
        sub: p.badge || p.category,
        desc: p.widgetDesc || p.summary,
        tags: p.tech,
        metrics: extractMetrics(p),
        github: p.githubUrl,
        details: p.modalDetails?.[0]?.content || p.summary
    }));
}

function extractMetrics(p) {
    const metrics = [];
    if (p.id === 'llm-obs') metrics.push(['11', 'LLM 메트릭'], ['5', '부하 시나리오'], ['213x', 'TTFT 저하'], ['10', 'Grafana 패널']);
    else if (p.id === 'financial') metrics.push(['99', '테스트'], ['1.000', 'RAGAS 점수'], ['3', 'MCP 서버'], ['5', '분석 도구']);
    else if (p.id === 'exam') metrics.push(['3', '테스트 계층'], ['3', 'DB 통합'], ['2', '보안 계층']);
    else if (p.id === 'mon-v3') metrics.push(['6', '검증 단계'], ['3', '보안 계층'], ['1', '프로비저닝']);
    else if (p.id === 'mon-v2') metrics.push(['3+', 'ADR 문서'], ['3', '보안 계층']);
    else if (p.id === 'k8s-cicd') metrics.push(['3', '자동화 단계'], ['3', 'CI/CD 도구']);
    else if (p.id === 'mon-v1') metrics.push(['2', 'Go 서비스'], ['→v2', 'Istio 전환']);
    else if (p.id === 'dorazy') metrics.push(['4', '팀원'], ['🥉', '해커톤 동상']);
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

    suppressAutoScroll = true;

    // Clean up synchronously
    cwBody.querySelectorAll('.detail-msg').forEach(function(e) { e.remove(); });
    cwBody.style.paddingBottom = '';
    cwRemovePrev();

    // User message first
    var sep = el('div', 'msg-separator');
    cwBody.appendChild(sep);
    const u = cwAddUser(cwBody, name);
    u.classList.add('soft-anim');

    suppressAutoScroll = false;

    // Staggered: agent appears after user (chat-like UX)
    await cwDelay(300);
    const a = cwAddAgent(cwBody);
    a.msg.classList.add('soft-anim');
    currentConvo = { u: u, a: a.msg, sep: sep };

    if (name === 'About') {
        await cwStream(cwBody, a.bubble, '\uC548\uB155\uD558\uC138\uC694! AI Agent Developer \uC774\uB3D9\uC8FC\uC785\uB2C8\uB2E4.');
        await cwDelay(200);
        var profile = el('div', 'cw-profile-card');
        profile.appendChild(el('div', 'cw-profile-name', '\uC774\uB3D9\uC8FC'));
        profile.appendChild(el('div', 'cw-profile-role', 'AI Agent Developer'));
        profile.appendChild(el('div', 'cw-profile-info', '\uB2E8\uAD6D\uB300\uD559\uAD50 \uCEF4\uD4E8\uD130\uACF5\uD559\uACFC'));
        a.bubble.appendChild(profile);
        cwFadeIn(profile);
        a.bubble.appendChild(createInlineLink('About 섹션 보기', '#about'));
    } else if (name === 'Skills') {
        await cwStream(cwBody, a.bubble, '\uC5B4\uB5A4 \uAE30\uC220\uC774 \uAD81\uAE08\uD558\uC138\uC694?');
        await cwDelay(200);
        var chips = el('div', 'cw-chips');
        var skills = getSkillsForChat();
        skills.forEach(function(cat) {
            var chip = el('button', 'cw-chip', cat.title);
            chip.addEventListener('click', function() {
                var existing = a.bubble.querySelector('.cw-skill-stack');
                if (existing) existing.remove();
                var stack = el('div', 'cw-skill-stack');
                cat.tags.forEach(function(tag) {
                    stack.appendChild(el('div', 'cw-skill-item', tag));
                });
                a.bubble.appendChild(stack);
                cwFadeIn(stack);
                cwScrollBottom(cwBody);
            });
            chips.appendChild(chip);
        });
        a.bubble.appendChild(chips);
        cwFadeIn(chips);
        a.bubble.appendChild(createInlineLink('Tech Stack 섹션 보기', '#skills'));
    } else if (name === 'Projects') {
        await cwStream(cwBody, a.bubble, '\uC8FC\uC694 \uD504\uB85C\uC81D\uD2B8\uB97C \uC18C\uAC1C\uD560\uAC8C\uC694!');
        await cwDelay(200);
        var projects = getProjectsForChat();
        var list = el('div', 'cw-project-list');
        projects.forEach(function(p) {
            var card = el('div', 'cw-project-item');
            var status = el('span', 'cw-project-status' + (p.sub === 'Featured' ? ' active' : ''), p.sub === 'Featured' ? '\u25B8 [FEATURED]' : '[DONE]');
            var pname = el('span', 'cw-project-name', p.name);
            var desc = el('div', 'cw-project-desc', p.desc.substring(0, 50) + '...');
            card.appendChild(status);
            card.appendChild(pname);
            card.appendChild(desc);
            var actions = el('div', 'cw-project-actions');
            var detailBtn = el('button', 'cw-action-btn', '\uC790\uC138\uD788');
            detailBtn.addEventListener('click', function() { cwProjectDetail(cwBody, p); });
            actions.appendChild(detailBtn);
            card.appendChild(actions);
            list.appendChild(card);
        });
        a.bubble.appendChild(list);
        cwFadeIn(list);
        a.bubble.appendChild(createInlineLink('Projects 섹션 보기', '#projects'));
    } else if (name === 'Experience') {
        await cwStream(cwBody, a.bubble, '\uC81C \uC5EC\uC815\uC744 \uBCF4\uC5EC\uB4DC\uB9B4\uAC8C\uC694!');
        await cwDelay(200);
        var experience = getExperienceForChat();
        var timeline = el('div', 'cw-timeline');
        experience.forEach(function(exp) {
            var card = el('div', 'cw-timeline-card');
            card.appendChild(el('div', 'cw-timeline-period', exp.period));
            card.appendChild(el('div', 'cw-timeline-title', exp.title));
            card.appendChild(el('div', 'cw-timeline-desc', exp.desc));
            timeline.appendChild(card);
        });
        a.bubble.appendChild(timeline);
        cwFadeIn(timeline);
        a.bubble.appendChild(createInlineLink('Experience 섹션 보기', '#experience'));
    } else if (name === 'Contact') {
        await cwStream(cwBody, a.bubble, '\uC5F0\uB77D \uC8FC\uC2DC\uBA74 \uBE60\uB974\uAC8C \uB2F5\uBCC0 \uB4DC\uB9AC\uACA0\uC2B5\uB2C8\uB2E4!');
        await cwDelay(200);
        var c = getContactData();
        var links = el('div', 'cw-contact-links');
        var items = [
            { icon: 'fas fa-envelope', label: 'Email', value: c.email, url: 'mailto:' + c.email },
            { icon: 'fab fa-github', label: 'GitHub', value: c.github, url: 'https://' + c.github },
            { icon: '', label: 'Blog', value: 'velog.io/@dongju101', url: 'https://velog.io/@dongju101/', img: 'https://cdn.simpleicons.org/velog/20C997' }
        ];
        items.forEach(function(item) {
            var link = document.createElement('a');
            link.className = 'cw-contact-btn';
            link.href = item.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            if (item.icon) {
                var icon = document.createElement('i');
                icon.className = item.icon;
                link.appendChild(icon);
            } else if (item.img) {
                var img = document.createElement('img');
                img.src = item.img;
                img.width = 14;
                img.height = 14;
                link.appendChild(img);
            }
            link.appendChild(document.createTextNode(' ' + item.label));
            var val = el('div', 'cw-contact-val', item.value);
            link.appendChild(val);
            links.appendChild(link);
        });
        a.bubble.appendChild(links);
        cwFadeIn(links);
        a.bubble.appendChild(createInlineLink('Contact 섹션 보기', '#footer'));
    }
    cwScrollBottom(cwBody);
    isAnimating = false;
}

async function cwProjectDetail(cwBody, p) {
    if (isAnimating) return;
    isAnimating = true;

    var savedScroll = cwBody.scrollTop;
    cwBody.querySelectorAll('.detail-msg').forEach(function(e) { e.remove(); });
    cwBody.style.paddingBottom = '';
    cwBody.scrollTop = savedScroll;

    // cwBody에 임시 padding-bottom 추가 (스크롤 공간 확보)
    cwBody.style.paddingBottom = cwBody.clientHeight + 'px';

    // 구분선
    var sep = el('div', 'msg-separator detail-msg');
    cwBody.appendChild(sep);

    // 즉시 구분선으로 스크롤 (1회만)
    cwBody.scrollTop = sep.offsetTop;

    // 콘텐츠 렌더링 (구분선 바로 아래, 화면에 보임)
    var userMsg = cwAddUser(cwBody, p.name + ' \uC0C1\uC138');
    userMsg.classList.add('detail-msg');

    await cwDelay(200);

    var a = cwAddAgent(cwBody);
    a.msg.classList.add('detail-msg');

    await cwStream(cwBody, a.bubble, p.desc);
    await cwDelay(200);

    var detail = el('div', 'cw-detail');
    var ms = el('div');
    ms.appendChild(el('div', 'cw-detail-label', 'Key Numbers'));
    var mrow = el('div', 'cw-detail-metrics');
    p.metrics.forEach(function(m) {
        var dm = el('div', 'cdm');
        var b = document.createElement('b');
        b.textContent = m[0];
        dm.appendChild(b);
        var lbl = document.createElement('span');
        lbl.textContent = m[1];
        dm.appendChild(lbl);
        mrow.appendChild(dm);
    });
    ms.appendChild(mrow);
    detail.appendChild(ms);
    detail.appendChild(el('p', '', p.details));
    var lk = document.createElement('a');
    lk.href = p.github;
    lk.target = '_blank';
    lk.rel = 'noopener noreferrer';
    lk.textContent = 'GitHub \u2197';
    lk.className = 'cw-detail-link';
    detail.appendChild(lk);
    a.bubble.appendChild(detail);
    cwFadeIn(detail);

    // 렌더링 완료 후 padding을 필요 최소량으로 축소
    var detailTotalHeight = (a.msg.offsetTop + a.msg.offsetHeight) - sep.offsetTop;
    var neededPadding = Math.max(0, cwBody.clientHeight - detailTotalHeight);
    var currentScroll = cwBody.scrollTop;
    cwBody.style.paddingBottom = neededPadding + 'px';
    cwBody.scrollTop = currentScroll;

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

    const cwScrollTopBtn = document.getElementById('cwScrollTop');

    if (!widget || !fab || !cwBody || !closeBtn) return;

    // Scroll-to-top button in widget header
    if (cwScrollTopBtn) {
        cwBody.addEventListener('scroll', function() {
            if (cwBody.scrollTop > 100) {
                cwScrollTopBtn.classList.add('visible');
            } else {
                cwScrollTopBtn.classList.remove('visible');
            }
        });
        cwScrollTopBtn.addEventListener('click', function() {
            cwBody.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

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
        await cwDelay(200);
        const a = cwAddAgent(cwBody);
        await cwStream(
            cwBody,
            a.bubble,
            '\uC548\uB155\uD558\uC138\uC694! AI Agent Developer \uC774\uB3D9\uC8FC\uC758 \uD3EC\uD2B8\uD3F4\uB9AC\uC624\uC785\uB2C8\uB2E4. \uBB34\uC5C7\uC774 \uAD81\uAE08\uD558\uC2E0\uAC00\uC694?'
        );
        cwPresets(cwBody, a.bubble, (name) => cwHandle(cwBody, name));
    }

    cwInit();

    // 프로젝트 카드 클릭 → Chat Widget에서 상세 표시
    document.addEventListener('cw:open-project', function(e) {
        var projectId = e.detail && e.detail.projectId;
        if (!projectId) return;

        // Widget 열기
        fab.classList.remove('visible');
        widget.classList.remove('collapsed');

        // 프로젝트 찾기
        var projects = getProjectsForChat();
        var p = projects.find(function(proj) { return proj.id === projectId; });
        if (p) {
            cwProjectDetail(cwBody, p);
        }
    });
}
