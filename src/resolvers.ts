import { metrics, trace } from "@opentelemetry/api";

export const resolvers = {
  Query: {
    hello: (): string => {
      const meter = metrics.getMeter("apollo-meter");
      meter
        .createCounter("request-count")
        .add(1, { operation: "Query", field: "hello" });
      const tracer = trace.getTracer("apollo-server");
      const span = tracer.startSpan("hello-graphql-query");
      const result = "Hello from Apollo + OTel";
      span.end();
      return result;
    },
  },
};
