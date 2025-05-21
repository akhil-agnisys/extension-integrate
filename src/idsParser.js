"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdsParser = void 0;
const fs = __importStar(require("fs"));
class IdsParser {
    idsFilePath;
    constructor(idsFilePath) {
        this.idsFilePath = idsFilePath;
    }
    parse() {
        const content = fs.readFileSync(this.idsFilePath, 'utf-8');
        const functionRegex = /def\s+(\w+)\s*\(([^)]*)\)\s*:\s*"""\s*([^]*?)\s*"""/g;
        const functions = [];
        let match;
        while ((match = functionRegex.exec(content)) !== null) {
            const name = match[1];
            const params = this.parseParameters(match[2]);
            const docstring = match[3].trim();
            functions.push({ name, params, docstring });
        }
        return functions;
    }
    parseParameters(paramString) {
        return paramString.split(',').map(param => {
            const [name, type] = param.split(':').map(p => p.trim());
            return { name, type: type || 'Any' };
        });
    }
}
exports.IdsParser = IdsParser;
//# sourceMappingURL=idsParser.js.map