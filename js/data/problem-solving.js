// ========================================
// Problem Solving Data Module
// ========================================

import { cloudNativeV3Content, cloudNativeV2Content, examPlatformV2Content } from './shared-content.js';

/**
 * @typedef {Object} ProblemSolvingItem
 * @property {string} id - 고유 ID
 * @property {string} title - 문제 해결 제목
 * @property {string} subtitle - 프로젝트별 요약 부제목 (details summary에 표시)
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
        id: 'exam-platform-v2',
        title: 'Legacy 시스템 TDD 기반 Full-Stack 마이그레이션',
        subtitle: 'exam-platform: Django 2.1 → 5.2 LTS + React 19 재작성 및 TDD Backend 317개 테스트 달성',
        tags: ['Django 5.2', 'React 19', 'TDD', 'pytest', 'Service Layer', 'TypeScript'],
        ...examPlatformV2Content
    },
    {
        id: 'gcp-cloudnative-v3',
        title: 'GCP 기반 Cloud-Native 모니터링 플랫폼',
        subtitle: 'Monitoring-v3: GCP 전체 IaC 자동화 및 App of Apps GitOps 구축',
        tags: ['GCP', 'K3s', 'Terraform', 'ArgoCD', 'External Secrets', 'Istio'],
        ...cloudNativeV3Content
    },
    {
        id: 'msa-observability',
        title: 'Cloud-Native 마이크로서비스 플랫폼 v2.0',
        subtitle: 'Monitoring-v2: GitOps 배포 자동화 및 Observability 기반 성능 최적화',
        tags: ['Kubernetes', 'Terraform', 'Istio', 'ArgoCD', 'Prometheus', 'Grafana'],
        ...cloudNativeV2Content
    }
];
