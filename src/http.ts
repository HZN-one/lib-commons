interface IResult {
  meta: {
    status: string;
    message: string;
  };
  data?: any;
}

export const Http = {
  /**
   * A function to standarize a API response
   *
   * @param isSuccess   Boolean
   * @param message     string
   * @param data        any
   * @example
   *
   *    res.json(Http.response())
   */
  response: (isSuccess: boolean, message: string, data: any) => {
    const result: IResult = {
      meta: {
        status: isSuccess ? "success" : "failed",
        message: isSuccess ? "ok" : message,
      },
    };

    if (isSuccess) result.data = data;

    return result;
  },
};
