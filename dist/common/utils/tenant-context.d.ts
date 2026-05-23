import { AsyncLocalStorage } from 'async_hooks';
export interface TenantContext {
    tenantId: string;
    userId: string;
    role: string;
}
export declare const tenantContextStorage: AsyncLocalStorage<TenantContext>;
export declare function getCurrentTenantId(): string | undefined;
export declare function getCurrentUserId(): string | undefined;
export declare function getCurrentRole(): string | undefined;
