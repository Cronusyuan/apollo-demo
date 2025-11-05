import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { metrics, trace } from "@opentelemetry/api";

export function createOtelApolloPlugin(): ApolloServerPlugin {
  const tracer = trace.getTracer("apollo-plugin-tracer");
  const meter = metrics.getMeter("apollo-meter");

  return {
    async requestDidStart(_requestContext) {
      meter.createCounter("request-count").add(1, { operation: "Query" });

      const span = tracer.startSpan(`graphql-query`, {
        attributes: {
          operation: "Query",
        },
      });

      return {
        async willSendResponse() {
          span.end();
        },
      };
    },
  };
}
