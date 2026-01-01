
console.log('I am worker.js');

globalThis.onmessage = (event) => {
    globalThis.postMessage(`Echo: ${event.data}`);
};