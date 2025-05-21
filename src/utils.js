"use strict";
// src/utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDocstring = formatDocstring;
exports.extractTypeHints = extractTypeHints;
exports.formatFunctionSignature = formatFunctionSignature;
exports.parseFunctionName = parseFunctionName;
exports.parseParameters = parseParameters;
function formatDocstring(docstring) {
    return docstring.trim().replace(/\n/g, ' ');
}
function extractTypeHints(signature) {
    const typeHints = signature.match(/:\s*([^\s]+)/g);
    return typeHints ? typeHints.map(hint => hint.trim().slice(1)) : [];
}
function formatFunctionSignature(name, params) {
    return `${name}(${params.join(', ')})`;
}
function parseFunctionName(line) {
    const match = line.match(/def\s+(\w+)/);
    return match ? match[1] : null;
}
function parseParameters(line) {
    const match = line.match(/\(([^)]+)\)/);
    return match ? match[1].split(',').map(param => param.trim()) : [];
}
//# sourceMappingURL=utils.js.map