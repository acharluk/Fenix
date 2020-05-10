class VSCodeConnector {

  constructor() {
    // eslint-disable-next-line no-undef
    this.vscode = acquireVsCodeApi();
  }

  getName() {
    return 'vscode';
  }

  runTemplate(id, vars) {
    this.vscode.postMessage({
      command: 'create',
      id: id,
      vars: vars
    });
  }

  loadTemplates(callback) {
    window.addEventListener('message', (ev) => {
      switch (ev.data.command) {
        case 'load': {
          const templateData = {
            templates: ev.data.templates,
            repositories: ev.data.repositories,
          };

          callback(templateData);
          break;
        }
        default:
          break;
      }
    });

  }

  postMessage(obj) {
    this.vscode.postMessage(obj);
  }
}

export default VSCodeConnector;