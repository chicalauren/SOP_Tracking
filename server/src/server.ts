import express from "express";
import path from "path";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import dotenv from "dotenv";
import connectDB from "./config/connection";
import typeDefs from "./schemas/typeDefs";
import resolvers from "./schemas/resolvers";
import { authMiddleware } from "./utils/auth";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  await connectDB();
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use("/api/auth", authRoutes);
  // ✅ Apply the GraphQL middleware and pass auth context
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        return await authMiddleware({ req });
      },
    })
  );

  // ✅ Serve static client assets in production
  if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    const clientPath = path.join(__dirname, "client", "dist");

    app.use(express.static(clientPath));

    app.get("*", (_req, res) => {
      res.sendFile(path.join(clientPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startApolloServer();
