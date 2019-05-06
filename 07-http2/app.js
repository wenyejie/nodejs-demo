/**
 * @author: Storm
 * @date: 2019/5/5
 * @email: wenyejie@foxmail.com
 */

const http2 = require('http2')
const fs = require('fs')

const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
})

server.on('error', err => console.error(err))

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html',
    'status': 200
  })
  stream.end('<h1>Hello World</h1>')
})

server.listen(8443)

