// ========================================
// Animation Utilities Module
// ========================================

/**
 * 애니메이션 큐 관리 클래스
 * 중첩된 애니메이션을 안전하게 관리하고 충돌을 방지합니다.
 */
export class AnimationQueue {
    constructor() {
        this.isAnimating = false;
        this.timeouts = [];
    }

    /**
     * 새로운 애니메이션 시작
     * 기존에 진행 중인 애니메이션이 있으면 취소하고 새로 시작
     * @param {Function} callback - 애니메이션 콜백 함수 (this 인스턴스를 인자로 받음)
     */
    start(callback) {
        this.cancel();
        this.isAnimating = true;
        callback(this);
    }

    /**
     * 진행 중인 모든 애니메이션 취소
     */
    cancel() {
        this.timeouts.forEach(id => clearTimeout(id));
        this.timeouts = [];
        this.isAnimating = false;
    }

    /**
     * 지연된 콜백 추가
     * @param {Function} callback - 실행할 콜백 함수
     * @param {number} delay - 지연 시간 (밀리초)
     * @returns {number} - timeout ID
     */
    addTimeout(callback, delay) {
        const id = setTimeout(() => {
            callback();
            this.timeouts = this.timeouts.filter(t => t !== id);
            // 모든 timeout이 완료되면 isAnimating을 false로 설정
            if (this.timeouts.length === 0) {
                this.isAnimating = false;
            }
        }, delay);
        this.timeouts.push(id);
        return id;
    }

    /**
     * 특정 timeout 제거
     * @param {number} timeoutId - 제거할 timeout ID
     */
    removeTimeout(timeoutId) {
        clearTimeout(timeoutId);
        this.timeouts = this.timeouts.filter(id => id !== timeoutId);
        if (this.timeouts.length === 0) {
            this.isAnimating = false;
        }
    }

    /**
     * 애니메이션을 수동으로 완료 처리
     * transitionend 등 이벤트 기반 애니메이션에서 사용
     */
    complete() {
        this.timeouts.forEach(id => clearTimeout(id));
        this.timeouts = [];
        this.isAnimating = false;
    }

    /**
     * 애니메이션 진행 중인지 확인
     * @returns {boolean}
     */
    get inProgress() {
        return this.isAnimating;
    }
}
