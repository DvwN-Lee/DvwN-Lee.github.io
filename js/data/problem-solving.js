// ========================================
// Problem Solving Data Module
// ========================================

import { cloudNativeV2Content } from './shared-content.js';

/**
 * @typedef {Object} ProblemSolvingItem
 * @property {string} id - 고유 ID
 * @property {string} title - 문제 해결 제목
 * @property {string[]} tags - 관련 기술 태그 배열
 * @property {string} situation - 문제 상황 (HTML)
 * @property {string[]} tasks - 과업 목표 목록 (HTML)
 * @property {string[]} actions - 구체적인 해결 과정 목록 (HTML)
 * @property {string[]} results - 결과 및 성과 목록 (HTML)
 */

/**
 * @type {ProblemSolvingItem[]}
 */
export const problemSolvingData = [
    {
        id: 'msa-observability',
        title: 'Cloud-Native 마이크로서비스 플랫폼 v2.0',
        ...cloudNativeV2Content
    }
];
