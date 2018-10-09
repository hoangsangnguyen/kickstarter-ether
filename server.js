const { createServer } = require('http');
const next = require('next');
const { parse } = require('url')
const app = next ({
    dev : process.env.NODE_ENV !== 'production'
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    createServer((req, res) => {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true)
        const { pathname, query } = parsedUrl
        console.log("========>", pathname, query)
        if (pathname === '/campaigns') {
          app.render(req, res, '/b', query)
        } else if (pathname === '/b') {
          app.render(req, res, '/a', query)
        } else {
            handler(req, res, parsedUrl)
        }
      }).listen(3000, err => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
      })
});