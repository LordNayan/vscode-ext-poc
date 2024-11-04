import * as vscode from "vscode";

export function getWorkspaceBasePath(): string | undefined {
  const folders = vscode.workspace.workspaceFolders;
  console.log(folders);
  return folders ? folders[0].uri.fsPath : undefined;
}
