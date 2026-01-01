const msg = null ?? 'Hello, Rspack!';

const worker = new Worker(new URL('./worker.js', import.meta.url), {
    name: 'the-worker',
});

worker.addEventListener('message', (event) => {
    console.log('Message from worker:', event.data);
});

worker.postMessage(msg);
