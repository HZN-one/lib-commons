/**
 * Create request ID (origin + unix + 10 random character + url)
 * Minimal 23 characters
 * @param origin Identify where's the root request
 * @param req Express Request Handler
 * @returns example: 166313323569236784b4744-/v1/orders
 */
function createRequestId(origin: string, req: any) {
  const unix = new Date().getTime(); // in milisecond format (13 character)
  const randomCharacter = Math.random().toString(16).substring(2, 12); // alphanumeric (10 character)
  const url = req.originalUrl; // example value: /v1/orders/12345

  return `${origin}-${url}-${unix}${randomCharacter}`;
}

/**
 * Request ID Middleware will add "x-request-id" to headers when doesn't exist
 * @param origin
 * @return Express Request Handler
 */
export const requestIdMiddleware =
  (origin: string = "") =>
  (req, _res, next) => {
    /**
     * We allowing x-request-id from external
     */
    if (!req.headers["x-request-id"]) {
      req.headers["x-request-id"] = createRequestId(origin, req);
    }
    next();
  };

/**
 * Get a request id from headers "x-request-id"
 * @param req Express Request Handler
 * @returns request id
 */
export const getRequestId = (req: any): string => {
  return req?.headers?.["x-request-id"];
};

/**
 * Logger format
 * @param req RequestHandler | string
 * @param title Log key
 * @param data data
 * @param error error
 * @return "Request ID: [ID]] | [TITLE] | Data: [DATA] | Error Object: [ERROR]"
 */
export const logger = (
  requestId: string,
  title: string,
  data: any,
  error: any = {}
): void => {
  console.log(
    `Request ID: ${requestId}`,
    `| ${title}`,
    `| Data: `,
    JSON.stringify(data),
    `| Error Object: `,
    JSON.stringify(error)
  );
};
