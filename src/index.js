import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';

import taskSchema from './schema/task';

const url = 'mongodb://localhost:27017/sunsama';

const mongoose = require('mongoose');

mongoose.connect(url, { useNewUrlParser: true });

const Task = require('./models/taskModel');

const app = express();

const resolvers = {
	Query: {
		tasks: async () => {
			const raw = await Task.find({}).exec();
			return raw;
		},
	},
	Mutation: {
		createTask: async (parent, { title }) => {
			try {
				const response = await Task.create({
					title,
					completed: false,
					taskDate: Date.now(),
				});

				return response;
			} catch (e) {
				return e.message;
			}
		},
		updateTask: async (parent, { _id, completed }) => {
			try {
				const task = await Task.findById({ _id }, { completed });
				return task.toObject();
			} catch (e) {
				return e.message;
			}
		},
		deleteTask: async (parent, { _id }) => {
			try {
				const task = await Task.findById(_id);
				if (task) {
					await task.remove();
					return {
						success: true,
					};
				} else {
					return {
						success: false,
						message: 'Task not found with id'
					}
				}
			} catch (e) {
				return {
					success: false,
					message: e
				}
			}
		}
	},
	Date: new GraphQLScalarType({
		name: 'Date',
		description: 'Date custom scalar type',
		parseValue(value) {
			return new Date(value);
		},
		serialize(value) {
			return value.getTime();
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return parseInt(ast.value, 10);
			}
			return null;
		},
	}),

};

const server = new ApolloServer({
	typeDefs: taskSchema,
	resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
	console.log('Apollo Server on http://localhost:8000/graphql');
});
