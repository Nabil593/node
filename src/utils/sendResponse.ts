import type { ServerResponse } from "http";

export const sendResponse = (
  res: ServerResponse,
  success: boolean,
  statusCode: number,
  message: string,
  data?: string,
) => {
  const response = {
    success,
    message,
    data,
  };

  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });
  res.end(
    JSON.stringify(response),
  );
};
