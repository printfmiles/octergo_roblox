export declare const PLAN_LIMITS: {
    readonly STARTER: {
        readonly name: "Starter";
        readonly price: 4.99;
        readonly maxGroups: 1;
        readonly maxLogsPerMonth: 100;
        readonly actions: readonly ["warn"];
    };
    readonly PRO: {
        readonly name: "Pro";
        readonly price: 12.99;
        readonly maxGroups: 3;
        readonly maxLogsPerMonth: 1000;
        readonly actions: readonly ["warn", "promote", "demote"];
    };
    readonly ENTERPRISE: {
        readonly name: "Enterprise";
        readonly price: 29.99;
        readonly maxGroups: 10;
        readonly maxLogsPerMonth: -1;
        readonly actions: readonly ["warn", "promote", "demote", "terminate"];
    };
};
export declare const API_ROUTES: {
    readonly AUTH: {
        readonly LOGIN: "/auth/login";
        readonly REGISTER: "/auth/register";
        readonly REFRESH: "/auth/refresh";
        readonly ME: "/auth/me";
    };
    readonly VERIFICATION: {
        readonly ROBLOX: "/verification/roblox";
        readonly DISCORD: "/verification/discord";
    };
    readonly COMMUNITIES: "/communities";
    readonly MEMBERS: "/members";
    readonly ROLES: "/roles";
    readonly SESSIONS: "/sessions";
    readonly AUDIT_LOGS: "/audit-logs";
    readonly BOT_INTERNAL: "/bot-internal";
};
//# sourceMappingURL=index.d.ts.map