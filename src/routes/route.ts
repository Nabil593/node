import type { IncomingMessage, ServerResponse } from "http";
import productController from "../controller/products.controller";

const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  // Get all product
  if (url === "/" && method === "GET") {
    console.log("Server Running Successfully on the root rout!");

    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ message: "Hey What's up 😏!" }));
  } else if (url?.startsWith("/products")) {
    productController(req, res);
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "Ohh no! you are on the wrong route, Go home bro!",
      }),
    );
  }
};

export default routeHandler;
