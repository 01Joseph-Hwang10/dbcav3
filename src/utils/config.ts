/**
 * mod1:
 * - Multiwii 기반 모터 커맨드
 * - 쿼드 콥터 강제 (다른 모듈 설정 불가능)
 *
 * mod2:
 * - 개별적으로 조절 가능한 모터 커맨드
 * - 모듈 자유롭게 설정 가능
 */
type AppMode = 'mod1' | 'mod2';

export const APP_MODE: AppMode = 'mod2';
