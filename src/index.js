import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import taskSchema from './schema/task';

const mode = process.env.NODE_ENV || 'dev';
console.log('mode', mode);

let mongoURL;
if (mode === 'production')
	mongoURL = process.env.DATABASE_URL;
else 
	mongoURL = 'mongodb://localhost:27017/sunsama';

const mongoose = require('mongoose');

mongoose.connect(mongoURL, { useNewUrlParser: true });

const app = express();

initSSE(app);

import taskResolver from './schema/resolver';
import { initSSE } from "./sse";

const server = new ApolloServer({
	typeDefs: taskSchema,
	resolvers: taskResolver,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 3000 }, () => {
	console.log('Apollo Server on http://localhost:3000/graphql');
});
