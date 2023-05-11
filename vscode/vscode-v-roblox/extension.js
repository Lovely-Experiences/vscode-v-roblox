const vscode = require('vscode');

const express = require('express');
const expressApp = express();
let currentConnection = null;

const statusBarItem = vscode.window.createStatusBarItem('vscode-v-roblox', vscode.StatusBarAlignment.Left, 1);
statusBarItem.text = '$(notebook-state-success) vscode-v-roblox';

expressApp.get('/', function (request, response) {
    response.send({ status: 'coming soon!' });
});

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('vscode-v-roblox.start', function () {
        if (currentConnection !== null) {
            vscode.window.showErrorMessage('[VSCode-v-Roblox]: Already started!');
        } else {
            currentConnection = expressApp.listen(8041);
            vscode.window.showInformationMessage('[VSCode-v-Roblox]: Started!');
            statusBarItem.show();
        }
    });

    let disposable2 = vscode.commands.registerCommand('vscode-v-roblox.stop', function () {
        if (currentConnection === null) {
            vscode.window.showErrorMessage('[VSCode-v-Roblox]: Already stopped!');
        } else {
            currentConnection.close();
            vscode.window.showInformationMessage('[VSCode-v-Roblox]: Stopped!');
            statusBarItem.hide();
        }
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);
}

function deactivate() {
    if (currentConnection !== null) {
        currentConnection.close();
        statusBarItem.hide();
    }
}

module.exports = {
    activate,
    deactivate,
};
