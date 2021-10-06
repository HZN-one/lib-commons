interface IResult {
  meta: {
    status: string;
    message: string;
  };
  data?: any;
  stack?: string;
}

export const Http = {
  /**
   * A function to standarize a API response
   *
   * @param isSuccess   Boolean
   * @param message     string
   * @param data        any
   * @param stack        string
   * @example
   *
   *    res.json(Http.response(true, "", { name: '' }, ''))
   */
  response: (
    isSuccess: boolean,
    message: string,
    data: any = null,
    stack: string = ""
  ) => {
    const result: IResult = {
      meta: {
        status: isSuccess ? "success" : "failed",
        message: isSuccess && message === "" ? "ok" : message,
      },
    };

    if (isSuccess) result.data = data;

    if (stack !== "") result.stack = stack;

    return result;
  },
};
