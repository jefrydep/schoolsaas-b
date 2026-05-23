"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const tenant_context_1 = require("../utils/tenant-context");
const role_enum_1 = require("../enums/role.enum");
class BaseService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    isSuperAdmin() {
        return (0, tenant_context_1.getCurrentRole)() === role_enum_1.Role.SUPER_ADMIN;
    }
    getTenantFilter() {
        if (this.isSuperAdmin())
            return {};
        const tenantId = (0, tenant_context_1.getCurrentTenantId)();
        if (!tenantId)
            return {};
        return { tenantId };
    }
    async findAll(options) {
        const where = {
            ...this.getTenantFilter(),
            ...(options?.where || {}),
        };
        return this.repository.find({ ...options, where });
    }
    async findOne(id) {
        const where = {
            ...this.getTenantFilter(),
            id,
        };
        const entity = await this.repository.findOne({ where });
        if (!entity)
            throw new common_1.NotFoundException('Entity not found');
        return entity;
    }
    async create(dto) {
        const tenantId = (0, tenant_context_1.getCurrentTenantId)();
        const entity = this.repository.create({
            ...dto,
            tenantId,
        });
        return this.repository.save(entity);
    }
    async update(id, dto) {
        const entity = await this.findOne(id);
        Object.assign(entity, dto);
        return this.repository.save(entity);
    }
    async remove(id) {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
    async count() {
        return this.repository.count({ where: this.getTenantFilter() });
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map