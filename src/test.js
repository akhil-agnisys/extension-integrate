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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function activate(context) {
    const disposable = vscode.commands.registerCommand('agnisys-ids-integrate.helloWorld', async () => {
        // Workspace validation
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder is open.');
            return;
        }
        const workspacePath = workspaceFolders[0].uri.fsPath;
        // 🔁 Replace this path with your actual Google Drive or GitHub-cloned repo path
        // const sourceFilePath = '/Users/yourname/Google Drive/My Drive/stubs/mymodule.pyi';
        const sourceFilePath = 'https://drive.google.com/file/d/1jn8WHMJbUxsj4TdwZ4D/view?usp=sharing';
        // Check if source file exists
        if (!fs.existsSync(sourceFilePath)) {
            vscode.window.showErrorMessage(`Stub file not found at: ${sourceFilePath}`);
            return;
        }
        // Read and copy the file
        fs.readFile(sourceFilePath, 'utf8', (readErr, data) => {
            if (readErr) {
                vscode.window.showErrorMessage(`Error reading stub file: ${readErr.message}`);
                return;
            }
            const destPath = path.join(workspacePath, 'copied_stub.pyi');
            fs.writeFile(destPath, data, (writeErr) => {
                if (writeErr) {
                    vscode.window.showErrorMessage(`Failed to write stub file: ${writeErr.message}`);
                    return;
                }
                vscode.window.showInformationMessage(`Stub file copied to: ${destPath}`);
            });
        });
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=test.js.map