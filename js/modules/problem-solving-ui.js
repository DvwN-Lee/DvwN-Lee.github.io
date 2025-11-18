// ========================================
// Problem Solving UI Module
// ========================================

import { problemSolvingData } from '../data/problem-solving.js';

/**
 * 각 Problem Solving 아이템의 HTML을 생성합니다.
 * @param {import('../data/problem-solving.js').ProblemSolvingItem} item - 문제 해결 데이터 아이템
 * @returns {string} - 생성된 HTML 문자열
 */
function createProblemItemHTML(item) {
    const tagsHTML = item.tags.map(tag => `<span>${tag}</span>`).join('');
    const tasksHTML = item.tasks.map(task => `<li>${task}</li>`).join('');
    const actionsHTML = item.actions.map(action => `<li>${action}</li>`).join('');
    const resultsHTML = item.results.map(result => `<li>${result}</li>`).join('');

    return `
        <div class="problem-item" data-aos="fade-up">
            <h3>${item.title}</h3>
            <div class="problem-tags">
                ${tagsHTML}
            </div>

            <details>
                <summary>
                    <span class="summary-text">문제에 대한 해결 과정 (클릭하여 자세히 보기)</span>
                </summary>
                <div class="problem-details">
                    <h4>Situation (문제 상황)</h4>
                    <p>${item.situation}</p>

                    <h4>Task (과업 목표)</h4>
                    <ol>${tasksHTML}</ol>

                    <h4>Action (구체적인 해결 과정)</h4>
                    <ul>${actionsHTML}</ul>

                    <h4>Result (결과 및 성과)</h4>
                    <ul>${resultsHTML}</ul>
                </div>
            </details>
        </div>
    `;
}

/**
 * details-summary 아코디언 애니메이션을 처리합니다.
 */
function setupAccordionAnimations() {
    const detailsElements = document.querySelectorAll('.problem-item details');

    detailsElements.forEach(details => {
        const summary = details.querySelector('summary');
        const content = details.querySelector('.problem-details');

        summary.addEventListener('click', (event) => {
            // 기본 동작(토글)을 막고 애니메이션으로 제어
            event.preventDefault();

            if (details.open) {
                // 닫힐 때
                content.style.height = `${content.scrollHeight}px`;
                requestAnimationFrame(() => {
                    content.style.height = '0px';
                    content.style.paddingTop = '0';
                    content.style.paddingBottom = '0';
                });
                
                // 애니메이션이 끝난 후 open 속성 제거
                content.addEventListener('transitionend', () => {
                    details.removeAttribute('open');
                }, { once: true });

            } else {
                // 열릴 때
                details.setAttribute('open', '');
                content.style.height = '0px';
                content.style.paddingTop = '0';
                content.style.paddingBottom = '0';

                requestAnimationFrame(() => {
                    content.style.height = `${content.scrollHeight}px`;
                    content.style.paddingTop = '25px';
                    content.style.paddingBottom = '25px';
                });

                // 애니메이션이 끝나면 height를 auto로 변경하여 내부 콘텐츠 변경에 대응
                content.addEventListener('transitionend', () => {
                    content.style.height = 'auto';
                }, { once: true });
            }
        });
    });
}


/**
 * Problem Solving 섹션을 동적으로 렌더링합니다.
 */
function renderProblemSolvingSection() {
    const container = document.querySelector('#problem-solving .container');
    if (!container) {
        console.error('Problem solving container not found');
        return;
    }

    // 기존의 정적 컨텐츠를 찾아서 그 뒤에 동적 컨텐츠를 추가하거나,
    // 컨테이너를 특정하여 내부를 교체할 수 있습니다.
    // 여기서는 기존 구조를 유지하기 위해, h2와 p 태그 다음에 아이템을 넣을 div를 만듭니다.
    
    let itemsContainer = container.querySelector('.problem-items-container');
    if (!itemsContainer) {
        itemsContainer = document.createElement('div');
        itemsContainer.className = 'problem-items-container';
        // 기존의 h2와 p 태그 다음에 삽입
        const subtitle = container.querySelector('.section-subtitle');
        if (subtitle && subtitle.nextSibling) {
            container.insertBefore(itemsContainer, subtitle.nextSibling);
        } else {
            container.appendChild(itemsContainer);
        }
    }

    const allItemsHTML = problemSolvingData.map(createProblemItemHTML).join('');
    itemsContainer.innerHTML = allItemsHTML;

    // 아코디언 애니메이션 설정
    setupAccordionAnimations();
}


/**
 * Problem Solving UI 모듈 초기화
 */
export function initProblemSolvingUI() {
    renderProblemSolvingSection();
    console.log('✅ Problem Solving UI module initialized');
}
