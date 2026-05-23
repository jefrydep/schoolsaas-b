import { AsyncLocalStorage } from 'async_hooks';

export interface TenantContext {
  tenantId: string;
  userId: string;
  role: string;
}

export const tenantContextStorage = new AsyncLocalStorage<TenantContext>();

export function getCurrentTenantId(): string | undefined {
  return tenantContextStorage.getStore()?.tenantId;
}

export function getCurrentUserId(): string | undefined {
  return tenantContextStorage.getStore()?.userId;
}

export function getCurrentRole(): string | undefined {
  return tenantContextStorage.getStore()?.role;
}
