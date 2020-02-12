const { readFileSync, appendFileSync, unlinkSync, existsSync } = require('fs');
const { resolve } = require('path');
const { workerData: { read, write, hash } } = require('worker_threads');

console.log('Process triggered.');
console.time('Execution time');

/**
 * @return {Promise}
 */
const sleep = async function () {
    return new Promise(resolve => {
        setTimeout(resolve, Math.floor(Math.random() * 5000) + 999);
    });
};

(async () => {
    // Act like process takes time
    await sleep();

    const writePath = resolve(write.filePath, write.fileName + '-' + hash);
    const readPath = resolve(read.filePath, read.fileName);
    const json = JSON.parse(readFileSync(readPath).toString('utf-8'));

    // Remove the file before writing
    if (existsSync(writePath)) {
        unlinkSync(writePath);
    }

    json.forEach(item => {
        appendFileSync(writePath, JSON.stringify(item) + '\n\n\n');
    });

    console.log('Process end.');
    console.timeEnd('Execution time');
})();
