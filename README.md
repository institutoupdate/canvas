# IMPULSA

## Electoral Canvas

Electoral Canvas built with [react-flexcanvas](https://github.com/miguelpeixe/react-flexcanvas).

![Electoral Canvas Example](https://i.imgur.com/s0pQ4VC.png)

### Features

- Generate tiled and full format PDFs in A3, A2 and A1

---

### Installation

#### Dependencies

- Node (v8 or newer)
- [pdfposter](https://gitlab.com/pdftools/pdfposter)

---

#### Clone and build

Clone the repository, install dependencies and start the server:

```
$ git clone https://github.com/institutoupdate/canvas.git
$ cd canvas
$ npm install
$ npm start
```

Starting the server will run babel server with nodemon, serving the client with webpack dev middleware with hot module replacement enabled.

Access http://localhost:8000/

---

#### Environment variables

- `NODE_ENV` - Either development or production. _Default to `development`_
- `PORT` - Port to start the server. _Default to `8000`_

---

### Build and run for production

Build the server and client with `npm run build` and start the server with `npm run serve`.

Compiled server will be at `dist/`, while client will be compiled at `public/`.

---

### Credits

#### Authors

- [Miguel Peixe](https://github.com/miguelpeixe)

### License

MIT
