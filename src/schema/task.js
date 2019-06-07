import { gql } from 'apollo-server';

const schema = gql`
  scalar Date

  type Query {
    task(_id: ID!): Task
    tasks: [Task!]
  }
  
  type Mutation {
  	createTask(title: String!): Task!
  	updateTask(_id: ID!, completed: Boolean): Task!
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
