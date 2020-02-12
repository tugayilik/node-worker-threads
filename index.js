const { Worker } = require('worker_threads');
const http = require('http');

const requestListener = (req, res) => {
    switch (req.url) {
        case '/':
            const workerData = {
                write: { fileName: 'write.txt', filePath: './' },
                read: { fileName: 'read.json', filePath: './' },
                hash: Math.random(),
            };

            new Worker('./worker.js', { workerData });

            res.writeHead(200).end('OK');
            break;
        default:
            res.writeHead(404).end('NOK');
            break;
    }

};

const server = http.createServer(requestListener);

server.listen(3333, () => {
    console.log('Server listening on: 127.0.0.1:3333');
});
