import "./instrumentation";

import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { createOtelApolloPlugin } from "./otelPlugin";
import { metrics, trace } from "@opentelemetry/api";

async function start() {
  const tracer = trace.getTracer("apollo-plugin-tracer");
  const meter = metrics.getMeter("apollo-meter");
  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers(tracer),
    plugins: [createOtelApolloPlugin(meter, tracer)],
  });

  const { url } = await server.listen({ port: 4000 });
  console.log(`🚀 Server ready at ${url}`);
}

start();
