class APIError extends Error {
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.name = "APIError";
    this.response = response;
  }
}
