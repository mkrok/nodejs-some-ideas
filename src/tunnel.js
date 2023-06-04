// @ts-nocheck
const http = require('http');
const net = require('net');
const url = require('url');
const proxy = new http.Server();

proxy
  .on('connect', function (request, clientSocket, head) {
    const reqData = url.parse('http://' + request.url);
    const remoteSocket = net.connect(reqData.port, reqData.hostname, function () {
      clientSocket.write('HTTP/1.1 200 \r\n\r\n');
      remoteSocket.write(head);
      remoteSocket.pipe(clientSocket);
      clientSocket.pipe(remoteSocket);
    });
  })
  .listen(8080);

const request = http.request({
  port: 8080,
  hostname: 'localhost',
  method: 'CONNECT',
  path: 'www.google.com:80',
});

request.end();

request.on('connect', function (res, socket, head) {
  socket.setEncoding('utf8');
  socket.write('GET / HTTP/1.1\r\nHost: www.google.com:80\r\nConnection: close\r\n\r\n');
  socket.on('readable', function () {
    console.log(socket.read());
  });
  socket.on('end', function () {
    proxy.close();
  });
});
