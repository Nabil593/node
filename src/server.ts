import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { json } from "stream/consumers";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // console.log(req);
    // console.log(res);
    // console.log(req.url)
    // console.log(req.method)

    const url = req.url;
    const method = req.method;

    if (url === "/" && method === "GET") {
      console.log("Server Running Successfully on the root rout!");

      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "Hey What's up 😏!" }));
    } else if (url?.startsWith("/products")) {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          message: "Hey What's up 😏! This is Products Section be careful.",
        }),
      );
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
  },
);


server.listen(5000, () => {
  console.log("Server is running successfully!");
});
