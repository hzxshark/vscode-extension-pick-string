// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "pick-string" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('pick-string.pickI18n', () => {
		// 新建一个用于输出key value值的 channel
		const chanel =  vscode.window.createOutputChannel('i18n key');
		// 获取当前文件的内容
		const currentContext:string = vscode.window.activeTextEditor.document.getText();
		// 把当前文件内容进行pick
		const i18nText = currentContext.toString().match(regex).join('&_&');
		// 格式化成需要的csv格式
		const finalText = i18nText
		.replace(/i18n\(/g, '')
		.replace(/\)/g, '')
		.replace(/&_&/g, '\n')
		.replace(/'/g, '')
		.replace(/\x20/g,'')
		vscode.window.showInformationMessage(typeof currentContext);
		// 把最后的内容输出到控制台
		chanel.append(finalText)
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
