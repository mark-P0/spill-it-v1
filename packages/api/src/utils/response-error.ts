import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

type StatusCode = keyof typeof StatusCodes;

export class ResponseError extends GraphQLError {
  constructor(statusCode?: StatusCode, statusMsg?: string) {
    const code = statusCode ?? "INTERNAL_SERVER_ERROR";
    const status = StatusCodes[code];
    const message = statusMsg ?? ReasonPhrases[code];

    super(message, {
      extensions: { code, http: { status } },
    });
  }
}
