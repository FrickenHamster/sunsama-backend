import { gql } from 'apollo-server';

const schema = gql`
  scalar Date

  type Query {
    task(_id: ID!): Task
    tasks(startDate: Date, endDate: Date): [Task!]
    taskDays: [Date!]
  }
  
  type Mutation {
  	createTask(title: String!, taskDate: Date!): Task!
  	changeTaskDate(_id: ID!, taskDate: Date): Task!
  	completeTask(_id: ID!, completed: Boolean): Task!
  	deleteTask(_id: ID!): Result!
  }

  type Task {
  	_id: ID!
    title: String!
    completed: Boolean!
    taskDate: Date!
  }
  
  type Result {
  	success: Boolean!
  	message: String
  }
`;


export default schema;
