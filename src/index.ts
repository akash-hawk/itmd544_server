import express from 'express';
const cors = require("cors");
import createApolloServer from './graphql';
import UserService from './services/user';

const { expressMiddleware } = require("@apollo/server/express4");

(async function init() {
  const app = express();
  app.use(cors());
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ message: "Server is up and running !" });
  })

  app.use(
    '/graphql', 
    expressMiddleware(await createApolloServer(), {
      context: async ({ req }: { req: any }) => { 
        const token = req.headers['token'];
        if (!token) {
          return {};
        }
        try {
          const user = await UserService.decodeJWTToken(token as string);
          return { user };
        } catch(err: any) {
          console.error("Error decoding JWT token:", err.message);
          return {};
        }
      }
    })
  );

  app.listen(PORT, () => {
    console.log("Server started at: " + PORT);
  });

})();