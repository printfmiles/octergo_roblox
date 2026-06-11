"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerationAction = exports.SessionStatus = exports.SubscriptionPlan = exports.CommunityStatus = exports.VerificationStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "USER";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
var VerificationStatus;
(function (VerificationStatus) {
    VerificationStatus["PENDING"] = "PENDING";
    VerificationStatus["VERIFIED"] = "VERIFIED";
    VerificationStatus["FAILED"] = "FAILED";
})(VerificationStatus || (exports.VerificationStatus = VerificationStatus = {}));
var CommunityStatus;
(function (CommunityStatus) {
    CommunityStatus["ACTIVE"] = "ACTIVE";
    CommunityStatus["INACTIVE"] = "INACTIVE";
    CommunityStatus["SUSPENDED"] = "SUSPENDED";
})(CommunityStatus || (exports.CommunityStatus = CommunityStatus = {}));
var SubscriptionPlan;
(function (SubscriptionPlan) {
    SubscriptionPlan["STARTER"] = "STARTER";
    SubscriptionPlan["PRO"] = "PRO";
    SubscriptionPlan["ENTERPRISE"] = "ENTERPRISE";
})(SubscriptionPlan || (exports.SubscriptionPlan = SubscriptionPlan = {}));
var SessionStatus;
(function (SessionStatus) {
    SessionStatus["SCHEDULED"] = "SCHEDULED";
    SessionStatus["ACTIVE"] = "ACTIVE";
    SessionStatus["COMPLETED"] = "COMPLETED";
    SessionStatus["CANCELLED"] = "CANCELLED";
})(SessionStatus || (exports.SessionStatus = SessionStatus = {}));
var ModerationAction;
(function (ModerationAction) {
    ModerationAction["WARN"] = "WARN";
    ModerationAction["PROMOTE"] = "PROMOTE";
    ModerationAction["DEMOTE"] = "DEMOTE";
    ModerationAction["TERMINATE"] = "TERMINATE";
})(ModerationAction || (exports.ModerationAction = ModerationAction = {}));
//# sourceMappingURL=index.js.map