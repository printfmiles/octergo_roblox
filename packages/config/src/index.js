"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireEnv = requireEnv;
exports.optionalEnv = optionalEnv;
exports.isProduction = isProduction;
function requireEnv(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}
function optionalEnv(key, fallback = '') {
    return process.env[key] ?? fallback;
}
function isProduction() {
    return process.env.NODE_ENV === 'production';
}
//# sourceMappingURL=index.js.map