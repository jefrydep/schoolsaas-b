"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantContextStorage = void 0;
exports.getCurrentTenantId = getCurrentTenantId;
exports.getCurrentUserId = getCurrentUserId;
exports.getCurrentRole = getCurrentRole;
const async_hooks_1 = require("async_hooks");
exports.tenantContextStorage = new async_hooks_1.AsyncLocalStorage();
function getCurrentTenantId() {
    return exports.tenantContextStorage.getStore()?.tenantId;
}
function getCurrentUserId() {
    return exports.tenantContextStorage.getStore()?.userId;
}
function getCurrentRole() {
    return exports.tenantContextStorage.getStore()?.role;
}
//# sourceMappingURL=tenant-context.js.map