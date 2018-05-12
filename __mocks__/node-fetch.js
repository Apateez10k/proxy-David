const fetch = (url) => {
  let text;
  if (url.includes('client')) {
    text = fetch.clientText;
  } else if (url.includes('server')) {
    text = fetch.serverText;
  } else if (url.includes('css')) {
    text = fetch.cssText;
  }

  const res = {
    text: () => text,
  };

  return Promise.resolve(res);
};

fetch.clientText = 'this is client text';
fetch.serverText = 'this is server text';
fetch.cssText = 'this is css text';

module.exports = fetch;
