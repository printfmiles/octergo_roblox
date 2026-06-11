"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_ROUTES = exports.PLAN_LIMITS = void 0;
const enums_1 = require("../enums");
exports.PLAN_LIMITS = {
    [enums_1.SubscriptionPlan.STARTER]: {
        name: 'Starter',
        price: 4.99,
        maxGroups: 1,
        maxLogsPerMonth: 100,
        actions: ['warn'],
    },
    [enums_1.SubscriptionPlan.PRO]: {
        name: 'Pro',
        price: 12.99,
        maxGroups: 3,
        maxLogsPerMonth: 1000,
        actions: ['warn', 'promote', 'demote'],
    },
    [enums_1.SubscriptionPlan.ENTERPRISE]: {
        name: 'Enterprise',
        price: 29.99,
        maxGroups: 10,
        maxLogsPerMonth: -1,
        actions: ['warn', 'promote', 'demote', 'terminate'],
    },
};
exports.API_ROUTES = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        REFRESH: '/auth/refresh',
        ME: '/auth/me',
    },
    VERIFICATION: {
        ROBLOX: '/verification/roblox',
        DISCORD: '/verification/discord',
    },
    COMMUNITIES: '/communities',
    MEMBERS: '/members',
    ROLES: '/roles',
    SESSIONS: '/sessions',
    AUDIT_LOGS: '/audit-logs',
    BOT_INTERNAL: '/bot-internal',
};
//# sourceMappingURL=index.js.map