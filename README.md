# URL Shortener

Simple URL shortener with a Node/Express + MongoDB backend and a React frontend.

## Quick overview / flow
1. User types an original URL in the React frontend.
2. Frontend calls the backend POST /url with `{ "url": "https://..." }`.
3. Backend stores a document in MongoDB with a generated shortId and returns `{ shortId, redirectURL }`.
4. Frontend shows `http://localhost:8001/<shortId>` and provides a Copy button.
5. Visiting `http://localhost:8001/<shortId>` increments `visitHistory` and redirects to the original URL.
6. Analytics are available at `GET /url/analytics/:shortId`.

## File structure
short_url
- client/                          # React frontend (create-react-app)
  - src/
    - components/
      - UrlShortener.js
    - App.js
    - index.js
  - package.json
- controllers/
  - url.js                          # request handlers
- models/
  - url.js                          # Mongoose schema
- routes/
  - url.js                          # /url routes
- connect.js                        # MongoDB connection helper
- index.js                          # Express server entrypoint
- .env
- .gitignore
- package.json
- README.md

## Important files (what they do)
- index.js (root): bootstraps Express, loads routes, and handles `/:shortId` redirect route.
- controllers/url.js: handles POST /url (create) and GET /url/analytics/:shortId (analytics).
- routes/url.js: mounts `/url` routes.
- models/url.js: Mongoose schema with `redirectURL`, `shortId`, `visitHistory`.
- connect.js: connects to MongoDB (forces IPv4 on Windows by default).
- client/src/components/UrlShortener.js: React component that posts URL, displays short URL and copy button.

## Environment
Create `.env` at project root:

```
MONGO_URI=mongodb://127.0.0.1:27017/url_shortner
PORT=8001
NODE_ENV=development
```

Using `127.0.0.1` avoids common Windows IPv6 (::1) connection issues.

## Setup and run (Windows)
1. Ensure MongoDB is installed and running.
   - Check listener: `netstat -ano | findstr :27017`
   - Start service (Admin): `net start MongoDB`
   - Or run mongod manually:
     - `mkdir C:\data\db`
     - `"C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe" --dbpath C:\data\db`

2. Server:
   - From project root:
     - `npm install`
     - `npm start` (runs nodemon index.js)

3. Frontend:
   - From `client` folder:
     - `cd client`
     - `npm install`
     - `npm start` (opens React dev server, default http://localhost:3000)

The frontend posts to `http://localhost:8001/url` (CORS is enabled in server).

## API
- POST /url
  - Body: `{ "url": "https://example.com" }`
  - Response: `201 { "shortId": "<id>", "redirectURL": "<original>" }`

- GET /url/analytics/:shortId
  - Response: `{ totalClicks: <number>, analytics: [ { timestamp } ... ] }`

- GET /:shortId
  - Redirects to original URL and records timestamp.

## Troubleshooting
- Error: `MongooseServerSelectionError: connect ECONNREFUSED ::1:27017`
  - Ensure MongoDB service is started and listening on 127.0.0.1:27017.
  - Use `MONGO_URI=mongodb://127.0.0.1:27017/...` in `.env`.
  - Check `netstat -ano | findstr :27017`.

- If `client/node_modules` was accidentally committed:
```
git rm -r --cached client/node_modules
git commit -m "Stop tracking client/node_modules"
git push
```


