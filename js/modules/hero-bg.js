// ========================================
// Hero Background - Network Topology Animation
// Kubernetes cluster node 연결 구조를 추상화한 경량 Canvas 배경
// ========================================

const CONFIG = {
    nodeCount: 65,
    hubCount: 6,
    connectionDistance: 180,
    fps: 30,
    // Node
    nodeMinRadius: 2.5,
    nodeMaxRadius: 4,
    hubMinRadius: 5,
    hubMaxRadius: 7,
    hubDotMin: 1.5,
    nodeDotMin: 1,
    driftSpeed: 0.15,
    breathSpeed: 0.008,
    breathAmount: 0.4,
    // Pulse
    pulseDecay: 0.02,
    pulseScale: 1.10,
    // Data flow particle
    particleSpeed: 0.012,
    particleRadius: 1.0,
    particleMargin: 0.08,
    particleTrailLength: 0.08,
    particleSpawnInterval: 50,
    particleFadeFrames: 20,
    // Edge lifecycle (frames)
    edgeGrowFrames: 50,
    edgeHoldMin: 140,
    edgeHoldMax: 240,
    edgeFadeMin: 25,
    edgeFadeMax: 50,
    edgeSpawnChance: 0.12,
    maxEdges: 60,
};

let canvas, ctx;
let nodes = [];
let edges = [];
let animationId = null;
let lastFrameTime = 0;
let frameCount = 0;
const frameInterval = 1000 / CONFIG.fps;

const EDGE_GROW = 0;
const EDGE_HOLD = 1;
const EDGE_FADE = 2;

// Phase 간 연속성을 보장하는 base alpha 상수
const BASE_END = 0.3;
const BASE_MID = 0.12;
const PEAK_END = 0.45;
const PEAK_MID = 0.2;
// Glow 비율 상수
const GLOW_END_RATIO = 0.25;
const GLOW_MID_RATIO = 0.15;

let cachedRgb = null;
let colorCacheFrame = -1;

function getRgb() {
    if (cachedRgb && frameCount - colorCacheFrame < 60) return cachedRgb;
    const style = getComputedStyle(document.documentElement);
    const hex = style.getPropertyValue('--primary-color').trim() || '#4A90E2';
    cachedRgb = {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16),
    };
    colorCacheFrame = frameCount;
    return cachedRgb;
}

function rgba(rgb, a) {
    return `rgba(${rgb.r},${rgb.g},${rgb.b},${a})`;
}

// Alpha 합산 보정: glow + main의 결과가 정확히 target이 되도록 main alpha를 역산
function compensateAlpha(target, glowA) {
    if (glowA >= 1) return 0;
    return Math.max(0, (target - glowA) / (1 - glowA));
}

function createNodes() {
    nodes = [];
    edges = [];
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const total = CONFIG.nodeCount + CONFIG.hubCount;

    for (let i = 0; i < total; i++) {
        const isHub = i < CONFIG.hubCount;
        const rMin = isHub ? CONFIG.hubMinRadius : CONFIG.nodeMinRadius;
        const rMax = isHub ? CONFIG.hubMaxRadius : CONFIG.nodeMaxRadius;

        nodes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            freqX: 0.3 + Math.random() * 0.7,
            freqY: 0.3 + Math.random() * 0.7,
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            ampX: (0.5 + Math.random() * 0.5) * CONFIG.driftSpeed,
            ampY: (0.5 + Math.random() * 0.5) * CONFIG.driftSpeed,
            baseRadius: rMin + Math.random() * (rMax - rMin),
            breathPhase: Math.random() * Math.PI * 2,
            breathFreq: CONFIG.breathSpeed * (0.7 + Math.random() * 0.6),
            isHub,
            activeEdges: 0,
            glowLevel: 0,
            pulseLevel: 0,
        });
    }
}

function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);
    createNodes();
}

function edgeKey(i, j) {
    return i < j ? `${i}-${j}` : `${j}-${i}`;
}

// 가중치 기반 랜덤 선택: 1/(activeEdges+1) 가중치, hub 편향 유지
function weightedPickSource() {
    let totalW = 0;
    for (let k = 0; k < nodes.length; k++) {
        let w = 1 / (nodes[k].activeEdges + 1);
        if (k < CONFIG.hubCount) w *= 2; // hub 편향
        nodes[k]._weight = w;
        totalW += w;
    }
    let r = Math.random() * totalW;
    for (let k = 0; k < nodes.length; k++) {
        r -= nodes[k]._weight;
        if (r <= 0) return k;
    }
    return nodes.length - 1;
}

function trySpawnEdge() {
    if (edges.length >= CONFIG.maxEdges) return;

    const i = weightedPickSource();
    const a = nodes[i];

    // 거리 내 후보 수집 + 가중치 기반 target 선택
    const candidates = [];
    let totalW = 0;
    for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const dx = a.x - nodes[j].x;
        const dy = a.y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.connectionDistance) {
            const w = 1 / (nodes[j].activeEdges + 1);
            candidates.push({ idx: j, weight: w });
            totalW += w;
        }
    }
    if (candidates.length === 0) return;

    // 가중치 기반 target 선택
    let r = Math.random() * totalW;
    let j = candidates[0].idx;
    for (const c of candidates) {
        r -= c.weight;
        if (r <= 0) { j = c.idx; break; }
    }
    const key = edgeKey(i, j);
    if (edges.some(e => e.key === key)) return;

    // 방향 결정: activeEdges 적은 node → 많은 node (동일 시 hub 우선 target)
    let from = i, to = j;
    const aEdges = nodes[i].activeEdges;
    const bEdges = nodes[j].activeEdges;
    if (aEdges > bEdges || (aEdges === bEdges && nodes[j].isHub && !nodes[i].isHub)) {
        from = j; to = i;
    }

    nodes[from].activeEdges++;
    nodes[to].activeEdges++;

    const holdFrames = CONFIG.edgeHoldMin
        + Math.floor(Math.random() * (CONFIG.edgeHoldMax - CONFIG.edgeHoldMin));
    const fadeFrames = CONFIG.edgeFadeMin
        + Math.floor(Math.random() * (CONFIG.edgeFadeMax - CONFIG.edgeFadeMin));

    edges.push({
        key, from, to,
        state: EDGE_GROW,
        progress: 0,
        holdCounter: 0,
        holdFrames,
        fadeFrames,
        particles: [],
        particleTimer: 0,
    });
}

function removeEdge(index) {
    const edge = edges[index];
    if (!edge.edgeCountReleased) {
        nodes[edge.from].activeEdges = Math.max(0, nodes[edge.from].activeEdges - 1);
        nodes[edge.to].activeEdges = Math.max(0, nodes[edge.to].activeEdges - 1);
    }
    edges.splice(index, 1);
}

function updateEdges() {
    for (let e = edges.length - 1; e >= 0; e--) {
        const edge = edges[e];
        switch (edge.state) {
        case EDGE_GROW:
            edge.progress += 1 / CONFIG.edgeGrowFrames;
            if (edge.progress >= 1) {
                edge.progress = 1;
                edge.state = EDGE_HOLD;
                edge.holdCounter = 0;
                // 연결 완료 시 target node pulse
                nodes[edge.to].pulseLevel = 1;
            }
            break;
        case EDGE_HOLD:
            edge.holdCounter++;
            // Particle 생성
            edge.particleTimer++;
            if (edge.particleTimer >= CONFIG.particleSpawnInterval && edge.particles.length < 3) {
                edge.particleTimer = 0;
                edge.particles.push({
                    t: 0,
                    direction: 1, // from → to 단방향
                });
            }
            // Particle 이동 및 제거
            for (let p = edge.particles.length - 1; p >= 0; p--) {
                edge.particles[p].t += CONFIG.particleSpeed;
                if (edge.particles[p].t >= 1) {
                    edge.particles.splice(p, 1);
                }
            }
            if (edge.holdCounter >= edge.holdFrames) {
                edge.state = EDGE_FADE;
                edge.progress = 1;
                // Node glow 즉시 감소 시작 (FADE 완료까지 기다리지 않음)
                edge.edgeCountReleased = true;
                nodes[edge.from].activeEdges = Math.max(0, nodes[edge.from].activeEdges - 1);
                nodes[edge.to].activeEdges = Math.max(0, nodes[edge.to].activeEdges - 1);
                // 잔존 particle을 제자리 fade-out으로 전환
                for (const p of edge.particles) {
                    p.fading = true;
                    p.fadeLife = 1;
                }
            }
            break;
        case EDGE_FADE:
            edge.progress -= 1 / edge.fadeFrames;
            // Particle: 이동 중지, 제자리에서 fade out
            for (let p = edge.particles.length - 1; p >= 0; p--) {
                edge.particles[p].fadeLife -= 1 / CONFIG.particleFadeFrames;
                if (edge.particles[p].fadeLife <= 0) {
                    edge.particles.splice(p, 1);
                }
            }
            if (edge.progress <= 0) {
                removeEdge(e);
            }
            break;
        }
    }
}

function update() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const t = frameCount;

    for (const node of nodes) {
        node.x += Math.sin(t * 0.02 * node.freqX + node.phaseX) * node.ampX;
        node.y += Math.cos(t * 0.02 * node.freqY + node.phaseY) * node.ampY;

        const margin = 20;
        if (node.x < margin) node.x += (margin - node.x) * 0.05;
        else if (node.x > w - margin) node.x -= (node.x - (w - margin)) * 0.05;
        if (node.y < margin) node.y += (margin - node.y) * 0.05;
        else if (node.y > h - margin) node.y -= (node.y - (h - margin)) * 0.05;

        const targetGlow = Math.min(node.activeEdges * 0.12, 0.35);
        // 비대칭 lerp: fade-in 느리게, fade-out 빠르게
        const rate = node.glowLevel > targetGlow ? 0.12 : 0.04;
        node.glowLevel += (targetGlow - node.glowLevel) * rate;
        if (node.glowLevel < 0.001) node.glowLevel = 0;

        // Pulse 감쇠
        if (node.pulseLevel > 0) {
            node.pulseLevel -= CONFIG.pulseDecay;
            if (node.pulseLevel < 0) node.pulseLevel = 0;
        }
    }

    if (Math.random() < CONFIG.edgeSpawnChance) {
        trySpawnEdge();
    }
    updateEdges();
    frameCount++;
}

// ---- Drawing ----

// 계층별 edge 기본 두께
function edgeBaseWidth(edge) {
    const a = nodes[edge.from];
    const b = nodes[edge.to];
    if (a.isHub && b.isHub) return 1.6;       // Hub ↔ Hub
    if (a.isHub || b.isHub) return 1.1;       // Hub ↔ Regular
    return 0.7;                                // Regular ↔ Regular
}

// Quadratic bezier 제어점 계산 (두 node 중점에서 수직 방향으로 offset)
function edgeControlPoint(ax, ay, bx, by) {
    const mx = (ax + bx) / 2;
    const my = (ay + by) / 2;
    const dx = bx - ax;
    const dy = by - ay;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // 수직 방향으로 거리 비례 offset (곡률)
    const curvature = 0.06;
    const nx = -dy / dist * dist * curvature;
    const ny = dx / dist * dist * curvature;
    return { cx: mx + nx, cy: my + ny };
}

// Quadratic bezier 위 t 지점의 좌표
function bezierPoint(ax, ay, cx, cy, bx, by, t) {
    const u = 1 - t;
    return {
        x: u * u * ax + 2 * u * t * cx + t * t * bx,
        y: u * u * ay + 2 * u * t * cy + t * t * by,
    };
}

function nodeRadius(node) {
    const breath = Math.sin(frameCount * node.breathFreq + node.breathPhase);
    const pulse = node.pulseLevel * (CONFIG.pulseScale - 1);
    return Math.max(0.5, node.baseRadius * (1 + pulse) + breath * CONFIG.breathAmount);
}

function drawEdges(rgb) {
    ctx.lineCap = 'round';
    for (const edge of edges) {
        const a = nodes[edge.from];
        const b = nodes[edge.to];

        // Node 경계에서 시작/종료하도록 offset 계산
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1) continue;
        const ux = dx / dist;
        const uy = dy / dist;
        const rA = nodeRadius(a) + 1;
        const rB = nodeRadius(b) + 1;

        // Node 경계 좌표
        const edgeAx = a.x + ux * rA;
        const edgeAy = a.y + uy * rA;
        const edgeBx = b.x - ux * rB;
        const edgeBy = b.y - uy * rB;

        // Bezier 제어점
        const { cx, cy } = edgeControlPoint(edgeAx, edgeAy, edgeBx, edgeBy);

        // 계층별 기본 두께
        const baseW = edgeBaseWidth(edge);

        // Phase별 target alpha 계산 (phase 간 연속)
        let targetAlpha, lineWidth, growRatio;

        if (edge.state === EDGE_GROW) {
            const p = edge.progress;
            growRatio = p * p * (3 - 2 * p);
            targetAlpha = p * BASE_END;
            lineWidth = baseW * (0.6 + p * 0.4);
        } else if (edge.state === EDGE_HOLD) {
            const t = edge.holdCounter / edge.holdFrames;
            const pulse = Math.sin(t * Math.PI);
            growRatio = 1;
            targetAlpha = BASE_END + (PEAK_END - BASE_END) * pulse;
            lineWidth = baseW * (1 + pulse * 0.3);
        } else {
            const p = edge.progress;
            growRatio = 1;
            targetAlpha = p * BASE_END;
            lineWidth = baseW * (0.6 + p * 0.4);
        }

        // Glow intensity
        const glowStrength = Math.min(targetAlpha / BASE_END, 1);

        // GROW: bezier 위에서 source → growRatio 지점까지만 그림
        // 곡선 path 생성
        ctx.beginPath();
        if (growRatio < 1) {
            // 곡선의 0 ~ growRatio 구간을 다수 직선으로 근사
            const steps = 20;
            const startPt = bezierPoint(edgeAx, edgeAy, cx, cy, edgeBx, edgeBy, 0);
            ctx.moveTo(startPt.x, startPt.y);
            for (let s = 1; s <= steps; s++) {
                const st = (s / steps) * growRatio;
                const pt = bezierPoint(edgeAx, edgeAy, cx, cy, edgeBx, edgeBy, st);
                ctx.lineTo(pt.x, pt.y);
            }
        } else {
            ctx.moveTo(edgeAx, edgeAy);
            ctx.quadraticCurveTo(cx, cy, edgeBx, edgeBy);
        }

        // Glow layer
        if (glowStrength > 0.02) {
            ctx.strokeStyle = rgba(rgb, targetAlpha * GLOW_END_RATIO);
            ctx.lineWidth = lineWidth + 2.5 * glowStrength;
            ctx.stroke();

            // Main line (alpha 보정)
            const mainA = compensateAlpha(targetAlpha, targetAlpha * GLOW_END_RATIO);
            ctx.strokeStyle = rgba(rgb, mainA);
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        } else {
            ctx.strokeStyle = rgba(rgb, targetAlpha);
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        }

        // 곡선 정보 캐싱 (drawParticles에서 사용)
        edge._ax = edgeAx; edge._ay = edgeAy;
        edge._bx = edgeBx; edge._by = edgeBy;
        edge._cx = cx; edge._cy = cy;
    }
}

function drawNodes(rgb) {
    const t = frameCount;

    for (const node of nodes) {
        const radius = nodeRadius(node);
        const glow = node.glowLevel;
        const pulse = node.pulseLevel;
        const breath = Math.sin(t * node.breathFreq + node.breathPhase);
        const baseOpacity = node.isHub ? 0.5 : 0.3;
        const coreOpacity = Math.min(baseOpacity + glow + pulse * 0.4 + breath * 0.05, 1);

        // Shadow glow (연결 또는 pulse 시)
        const shadowIntensity = glow + pulse * 0.5;
        if (shadowIntensity > 0.005) {
            ctx.shadowColor = rgba(rgb, Math.min(shadowIntensity * 1.5, 1));
            ctx.shadowBlur = 8 + 14 * Math.min(shadowIntensity / 0.35, 1);
        }

        // Ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(rgb, coreOpacity);
        ctx.lineWidth = node.isHub ? 1.4 : 1;
        ctx.stroke();

        // Center dot
        const dotMin = node.isHub ? CONFIG.hubDotMin : CONFIG.nodeDotMin;
        const dotR = Math.max(dotMin, radius * 0.3);
        ctx.beginPath();
        ctx.arc(node.x, node.y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = rgba(rgb, coreOpacity * 0.9);
        ctx.fill();

        // Shadow 해제
        if (shadowIntensity > 0.005) {
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        }
    }
}

function drawParticles(rgb) {
    for (const edge of edges) {
        if (edge.particles.length === 0) continue;
        const eAx = edge._ax, eAy = edge._ay;
        const eBx = edge._bx, eBy = edge._by;
        const eCx = edge._cx, eCy = edge._cy;

        const M = CONFIG.particleMargin;
        for (const particle of edge.particles) {
            // 이동 범위를 margin 내로 제한 (M ~ 1-M)
            const rawT = particle.direction === 1 ? particle.t : 1 - particle.t;
            const t = M + rawT * (1 - 2 * M);
            const pt = bezierPoint(eAx, eAy, eCx, eCy, eBx, eBy, t);

            // margin 경계 기준 fade
            const edgeFade = Math.min(particle.t / M, (1 - particle.t) / M, 1);
            const lifeFade = particle.fading ? particle.fadeLife : 1;
            const pAlpha = 0.7 * edgeFade * lifeFade;

            if (pAlpha < 0.005) continue;

            // Trail
            if (!particle.fading) {
                const trailT = t - CONFIG.particleTrailLength * particle.direction;
                if (trailT >= M && trailT <= 1 - M) {
                    const tp = bezierPoint(eAx, eAy, eCx, eCy, eBx, eBy, trailT);
                    ctx.beginPath();
                    ctx.arc(tp.x, tp.y, CONFIG.particleRadius * 0.6, 0, Math.PI * 2);
                    ctx.fillStyle = rgba(rgb, pAlpha * 0.3);
                    ctx.fill();
                }
            }

            // Main particle dot
            const r = CONFIG.particleRadius * lifeFade;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, Math.max(0.3, r), 0, Math.PI * 2);
            ctx.fillStyle = rgba(rgb, pAlpha);
            ctx.fill();

            // Bright core
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, Math.max(0.2, r * 0.4), 0, Math.PI * 2);
            ctx.fillStyle = rgba(rgb, Math.min(pAlpha * 1.5, 1));
            ctx.fill();
        }
    }
}

function draw() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const rgb = getRgb();

    ctx.clearRect(0, 0, w, h);
    drawEdges(rgb);      // 1. Edge 선
    drawNodes(rgb);      // 2. Node dot + glow
    drawParticles(rgb);  // 3. Particle (최상위)
}

function loop(timestamp) {
    animationId = requestAnimationFrame(loop);
    if (timestamp - lastFrameTime < frameInterval) return;
    lastFrameTime = timestamp;
    update();
    draw();
}

function stopAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

/**
 * Hero 배경 Network Topology 애니메이션을 초기화합니다.
 */
let resizeTimer;

function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 200);
}

function handleVisibility() {
    if (document.hidden) {
        stopAnimation();
    } else if (!animationId) {
        animationId = requestAnimationFrame(loop);
    }
}

/**
 * Hero 배경 Network Topology 애니메이션을 초기화합니다.
 */
export function initHeroBg() {
    canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    if (!ctx) return;

    resizeCanvas();

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('resize', handleResize);

    animationId = requestAnimationFrame(loop);
}

function cleanupHeroBg() {
    stopAnimation();
    document.removeEventListener('visibilitychange', handleVisibility);
    window.removeEventListener('resize', handleResize);
    clearTimeout(resizeTimer);
}
