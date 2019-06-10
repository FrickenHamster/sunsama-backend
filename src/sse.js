import SSE from 'express-sse';

let sse;

export const initSSE = app => {
	sse = new SSE();

	app.get('/events', sse.init);
};


export const sendSSE = msg => {
	console.log('sending message', msg);
	sse.send(msg, 'taskEvent', 1);
};



