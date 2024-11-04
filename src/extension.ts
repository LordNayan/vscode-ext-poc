// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { prepareMetadata, sendMetadataToTauri } from "./utils/metadata";
import { getRunningNodeApps } from "./utils/swaggerCheck";
import { getWorkspaceBasePath } from "./utils/workspace";

async function gatherAndSendMetadata() {
  const basePath = getWorkspaceBasePath();
  console.log("BASE PATH ===> ", basePath);

  if (!basePath) {
    console.warn("No workspace base path found.");
    return;
  }

  // Call getRunningNodeApps with the base path to find relevant processes
  const processes = await getRunningNodeApps(basePath);
  console.log("Relevant Processes with Detected Ports:", processes);

  for (const process of processes) {
    const port = process.port;
    console.log(
      `Detected Swagger running on port ${port} for process ${process.pid}`
    );

    // Prepare and send metadata
    const metadata = prepareMetadata(basePath, port);
    await sendMetadataToTauri(metadata);
    break; // Send only the first valid Swagger endpoint we find
  }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "sendmetadata" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "sendmetadata.helloWorld",
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from sendMetaData!");
      await gatherAndSendMetadata();
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
