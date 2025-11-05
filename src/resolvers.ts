import { trace } from "@opentelemetry/api";

export const resolvers = {
  Query: {
    hello: (): string => {
      const tracer = trace.getTracer("apollo-server");
      const span = tracer.startSpan("hello-graphql-query");
      const result = "Hello from Apollo + OTel";
      span.end();
      return result;
    },
  },
};
