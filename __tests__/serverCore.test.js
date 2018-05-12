const request = require('supertest');
const serverCore = require('../src/serverCore.js');
const template = require('../src/template/index.js');

const services = [
  { name: 'doesThing', html: '<span>Hello!</span>' },
  { name: 'doesElse', html: '<span>There!</span>' },
];

jest.mock('../src/bundleLoader.js', () => {
  const services = [
    { name: 'doesThing', Component: '<span>Hello!</span>' },
    { name: 'doesElse', Component: '<span>There!</span>' },
  ];
  return () => Promise.resolve(services);
});

jest.mock('react', () => (
  {
    createElement: dummy => dummy,
  }
));

jest.mock('react-dom/server', () => (
  {
    renderToString: dummy => dummy,
  }
));

test('Get correct html from GET request', () => {
  serverCore.startFetches()
    .then(() => request(serverCore.app).get('/restaurants/0'))
    .then((response) => {
      expect(response.text).toBe(template(services));
    });
});

