// @ts-nocheck
import * as vscode from 'vscode';


const regex = /i18n\((.*?|\n*?)\)/g;

export function activate(context: vscode.ExtensionContext) {
	// 注册一个插件命令
	let disposable = vscode.commands.registerCommand(
	  "pick-string.pickI18n",
	  async () => {
		
		// 获取当前文件的内容
		const currentContext = vscode.window.activeTextEditor?.document.getText();
		// 根据'i18n'关键字筛选出key值
		const i18nText = currentContext?.match(regex).join("&_&");
		// 格式化成需要的csv格式
		const finalText = i18nText
		  .replace(/i18n\(|\)|\s/g, "")
		  .replace(/&_&/g, "\n")
		  .replace(/'|`|\x20|\$/g, "");

		// 《《《《 test-start
		// 新建一个用于输出key value值的 channel
		const chanel = vscode.window.createOutputChannel("i18n key");
		// 输出
		chanel.append(finalText);
		// 》》》》》test-end
  
		// 保存文件名称确认弹窗
		let uri = await vscode.window.showSaveDialog({
		  filters: {
			csv: ["csv"],
		  },
		});
  
		//   容错
		if (uri == undefined) {
		  vscode.window.showErrorMessage("无效的保存路径");
		  return;
		}
  
		// 生成csv buffer
		let writeData = Buffer.from(finalText, "utf8");
  
		// 写入文件
		vscode.workspace.fs.writeFile(uri, writeData);
  
		let openFile = "打开文件";
  
		// 提示保存成功
		vscode.window
		  .showInformationMessage("文件保存成功", openFile)
		  .then((value) => {
			if (value === openFile) {
			  vscode.window.showTextDocument(uri!, {});
			}
		  });
	  }
	);
  
	context.subscriptions.push(disposable);
  }

// this method is called when your extension is deactivated
export function deactivate() {}
