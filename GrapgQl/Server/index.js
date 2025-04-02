const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const cors = require("cors");
const { default: axios } = require("axios");

async function startServer() {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


    const server = new ApolloServer({
        typeDefs: `
            type User {
                id: ID!
                name: String!
                username: String!
                email: String!
                phone: String!
                website: String!
            }
            type Todo {
                id: ID!
                title: String!
                completed: Boolean
                user: User
            }
            type Query {
                getTodos: [Todo]
                getAllUsers: [User]
                getUser(id: ID!): User
            }
        `,
        resolvers: {
            Todo:{
                user: async (todo) => {
                    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`);
                    return data;
                }
            },
            Query: {
                getTodos: async () => {
                    const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
                    return data;
                },
                getAllUsers: async () => {
                    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
                    return data;
                },
                getUser: async (parent, { id }) => {
                    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                    return data;
                }
            }
        }
    });

    await server.start();
    app.use("/graphql", expressMiddleware(server));


    app.listen(8000, () => {
        console.log("🚀 Server started on http://localhost:8000/graphql");
    });
};

startServer();