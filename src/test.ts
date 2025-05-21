import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
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
		const sourceFilePath ='https://drive.google.com/file/d/1jn8WHMJbUxsj4TdwZ4D/view?usp=sharing';

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

export function deactivate() {}
