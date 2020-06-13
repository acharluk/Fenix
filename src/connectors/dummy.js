class DummyConnector {

  getName() {
    return 'dummy';
  }

  runTemplate(id, vars) {
    alert('Template: ' + id);
    console.log('Template', id);
    console.log('Variables', vars);
  }

  loadTemplates(callback) {
    fetch('https://raw.githubusercontent.com/FenixTemplates/Default/master/fenix.json')
    .then(res => res.json())
    .then(json => {  
        const templateData = {
          templates: json.templates.map((t) => ({
            ...t,
            author: json.author,
            repoName: json.repoName
          })),
          repositories: [
            'https://raw.githubusercontent.com/FenixTemplates/Default/master/fenix.json'
          ],
        };

        callback(templateData);
      });
  }

  postMessage() { }
}

export default DummyConnector;