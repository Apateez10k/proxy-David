const template = require('../src/template/index.js');

const services = [
  { name: 'doesThing', html: '<span>Hello!</span>' },
  { name: 'doesElse', html: '<span>There!</span>' },
];
const html = template(services);

test('make css link tags', () => {
  services.forEach((service) => {
    const tag = `<link href="/bundles/${service.name}.css" rel="stylesheet">`;
    expect(html.includes(tag)).toBe(true);
  });
});

test('make div tags with ids', () => {
  services.forEach((service) => {
    const tag = `<div id="${service.name}">${service.html}</div>`;
    expect(html.includes(tag)).toBe(true);
  });
});

test('make script tags with src', () => {
  services.forEach((service) => {
    const tag = `<script src="/bundles/${service.name}.js"></script>`;
    expect(html.includes(tag)).toBe(true);
  });
});

test('make hydrate code', () => {
  services.forEach((service) => {
    const tag = `ReactDOM.hydrate(React.createElement(${service.name}), document.getElementById('${service.name}'))`;
    expect(html.includes(tag)).toBe(true);
  });
});
