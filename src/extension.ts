import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
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

        // Files to download
        const filesToDownload = [
            { id: '1jn8WHMJbUxsj4TdwZ4DSmu5wUP7Qn0tr', name: 'Integrate.pyi' },
            { id: '1RhKjzN_T6LPj5T8Q1SYP9OPS1sLZSQ06', name: 'Integrate.py' }
        ];

        for (const file of filesToDownload) {
            const downloadUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;
            try {
                const response = await axios.get(downloadUrl, {
                    responseType: 'arraybuffer',
                });

                const destPath = path.join(vscodeDir, file.name);
                fs.writeFileSync(destPath, response.data);
                vscode.window.showInformationMessage(`Downloaded: ${file.name} to .vscode folder`);
            } catch (err: any) {
                vscode.window.showErrorMessage(`Error downloading ${file.name}: ${err.message}`);
            }
        }

        // Create or update settings.json
        const settingsPath = path.join(vscodeDir, 'settings.json');
        const settingsContent = {
            "python.analysis.extraPaths": [
                "${workspaceFolder}/.vscode"
            ],
            "python.autoComplete.extraPaths": [
                "${workspaceFolder}/.vscode"
            ],
            "python.languageServer": "Pylance",
            "python.analysis.typeCheckingMode": "strict"
        };
        fs.writeFileSync(settingsPath, JSON.stringify(settingsContent, null, 4));
        vscode.window.showInformationMessage('settings.json created/updated in .vscode folder');
    });

    context.subscriptions.push(disposable);

    // 🔁 Watch for new .py files
    const watcher = vscode.workspace.createFileSystemWatcher('**/*.py');
    watcher.onDidCreate(async (uri) => {
        const filePath = uri.fsPath;

        // 🛑 Skip if file is inside .vscode or is named Integrate.py
        if (filePath.includes(`${path.sep}.vscode${path.sep}`)) {
            return;
        }

        try {
            const doc = await vscode.workspace.openTextDocument(uri);
            const text = doc.getText();

            if (!text.startsWith('from Integrate import *')) {
                const edit = new vscode.WorkspaceEdit();
                edit.insert(uri, new vscode.Position(0, 0), 'from Integrate import *\n');
                await vscode.workspace.applyEdit(edit);
                await doc.save();
                vscode.window.showInformationMessage(`Prepended import to ${path.basename(filePath)}`);
            }
        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to modify new Python file: ${error.message}`);
        }
    });

    context.subscriptions.push(watcher);
}


export function deactivate() {}
