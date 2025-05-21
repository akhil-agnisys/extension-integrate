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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const axios_1 = __importDefault(require("axios"));
function activate(context) {
    const disposable = vscode.commands.registerCommand('agnisys-ids-integrate.helloWorld', async () => {
        // Workspace validation
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder is open.');
            return;
        }
        const workspacePath = workspaceFolders[0].uri.fsPath;
        // Ensure .vscode directory exists
        const vscodeDir = path.join(workspacePath, '.vscode');
        if (!fs.existsSync(vscodeDir)) {
            fs.mkdirSync(vscodeDir);
        }
        // List of files to download
        const filesToDownload = [
            { id: '1jn8WHMJbUxsj4TdwZ4DSmu5wUP7Qn0tr', name: 'Integrate.pyi' },
            { id: '1XWlyuEtLEqsT8zWVqw7KvU5GXgT36DiO', name: 'Integrate.py' } // Replace with actual ID
        ];
        for (const file of filesToDownload) {
            const downloadUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;
            try {
                const response = await axios_1.default.get(downloadUrl, {
                    responseType: 'arraybuffer',
                });
                const destPath = path.join(vscodeDir, file.name);
                fs.writeFileSync(destPath, response.data);
                vscode.window.showInformationMessage(`Downloaded: ${file.name} to .vscode folder`);
            }
            catch (err) {
                vscode.window.showErrorMessage(`Error downloading ${file.name}: ${err.message}`);
            }
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map