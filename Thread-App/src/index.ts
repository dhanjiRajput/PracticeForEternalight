import express from 'express';
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGrapgqlServer from './graphql';

async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

    app.use(express.json());


    app.get('/', (req, res) => {
        res.json({ message: "Server is up and running..." });
    });

    const gqlServer = await createApolloGrapgqlServer();
    app.use("/graphql", express.json(), expressMiddleware(gqlServer) as unknown as express.RequestHandler);

    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
}

init();