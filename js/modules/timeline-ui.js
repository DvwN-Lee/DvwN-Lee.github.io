// ========================================
// Timeline UI Module
// ========================================

import { experiencesData } from '../data/experiences.js';

/**
 * 경력/타임라인 섹션을 동적으로 렌더링하는 함수
 */
function renderExperiences() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) {
        console.error('timeline container not found');
        return;
    }

    const timelineHTML = experiencesData.map((experience, index) => {
        // 짝수/홀수에 따라 fade 방향 결정
        const aosDirection = index % 2 === 0 ? 'fade-right' : 'fade-left';

        // 성과 목록 HTML 생성
        const achievementsHTML = experience.achievements.map(achievement =>
            `<li>${achievement}</li>`
        ).join('');

        return `
            <div class="timeline-item" data-aos="${aosDirection}">
                <div class="timeline-date">${experience.date}</div>
                <div class="timeline-content">
                    <h3>${experience.title}</h3>
                    <p>${experience.subtitle}</p>
                    <ul>
                        ${achievementsHTML}
                    </ul>
                </div>
            </div>
        `;
    }).join('');

    timeline.innerHTML = timelineHTML;
}

/**
 * 타임라인 UI 모듈 초기화
 */
export function initTimelineUI() {
    renderExperiences();

    console.log('✅ Timeline UI module initialized');
}
