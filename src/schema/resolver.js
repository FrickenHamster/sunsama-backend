import { GraphQLScalarType, Kind } from "graphql";
import Task from '../models/taskModel';

const resolvers = {
	Query: {
		tasks: async (parent, {startDate, endDate}) => {
			const query = {};
			if (startDate || endDate) {
				query.taskDate = {};
				if (startDate)
					query.taskDate.$gte = startDate;
				if (endDate)
					query.taskDate.$lt = endDate;
			};
			const raw = await Task.find(query).exec();
			console.log('kawaii', query, raw);
			return raw;
		},
	},
	Mutation: {
		createTask: async (parent, {title}) => {
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
		changeTaskDate: async (parent, {_id, taskDate}) => {
			try {
				const task = await Task.findOneAndUpdate({_id}, {taskDate}, {useFindAndModify: false, new: true});
				return task.toObject();
			} catch (e) {
				return e.message;
			}
		},
		completeTask: async (parent, {_id, completed}) => {
			try {
				const task = await Task.findOneAndUpdate({_id}, {completed}, {useFindAndModify: false, new: true});
				return task.toObject();
			} catch (e) {
				return e.message;
			}
		},
		deleteTask: async (parent, {_id}) => {
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

export default resolvers;
