import express from 'express';
import SSE from 'express-sse';
import { ApolloServer } from 'apollo-server-express';

import taskSchema from './schema/task';

const url = 'mongodb://localhost:27017/sunsama';

const mongoose = require('mongoose');

mongoose.connect(url, { useNewUrlParser: true });

const app = express();

const sse = new SSE();

app.get('/events', sse.init);

setInterval(() => {
	sse.send({event: 'top shit'}, 'poop', 1);
	console.log('wtf sending');
}, 300000);

import taskResolver from './schema/resolver';

const server = new ApolloServer({
	typeDefs: taskSchema,
	resolvers: taskResolver,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
	console.log('Apollo Server on http://localhost:8000/graphql');
});
