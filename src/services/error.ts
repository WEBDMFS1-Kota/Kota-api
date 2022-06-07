class ServiceError extends Error {
  constructor(public code: number, message: string) {
    super(message);
  }
}

export function formatServiceError(res: any, error: unknown) {
  const code = (error instanceof ServiceError) ? (error as ServiceError).code : 500;
  res.status(code).send({
    errorMsg: `${error}`,
  });
}

export default ServiceError;
