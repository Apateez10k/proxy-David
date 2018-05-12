const makeHtml = services => (
  `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="/style.css">
      <link rel="icon" href="https://s3-us-west-1.amazonaws.com/apateezassets/apateez-logo-small-red.jpeg" type="image/x-icon">
      <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400" rel="stylesheet">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
      <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet">
      ${services.map(service => `<link href="/bundles/${service.name}.css" rel="stylesheet">`)}
      <title>Apateez Demo</title>
    </head>
    <body>
      ${services.map(service => `<div id="${service.name}">${service.html}</div>`).join('\n')}
    </body>
    <script src="/lib/react.development.js"></script>
    <script src="/lib/react-dom.development.js"></script>
    ${services.map(service => `<script src="/bundles/${service.name}.js"></script>`).join('\n')}
    <script>
      ${services.map(service => `ReactDOM.hydrate(React.createElement(${service.name}), document.getElementById('${service.name}'))`).join('\n')}
    </script>
  </html> `
);

module.exports = makeHtml;

