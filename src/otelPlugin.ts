import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { Meter, Tracer } from "@opentelemetry/api";

export function createOtelApolloPlugin(meter: Meter, tracer: Tracer): ApolloServerPlugin {
  return {
    async requestDidStart(_requestContext) {
      // meter.createCounter("request-count").add(1, { operation: "Query" });

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
