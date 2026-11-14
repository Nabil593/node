import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productservice } from "../service/product.service";
import type { Iproduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";
import { sendResponse } from "../utils/sendResponse";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  const urlParams = url?.split("/");
  const id = urlParams && urlParams[1] === "products" ? urlParams[2] : null;

  if (url === "/products" && method === "GET") {
    try {
      const product = productservice();

      sendResponse(res, true, 200, "Products retrive successful!", product);
    } catch (error) {
      sendResponse(res, false, 500, "Internal Server Erorr");
    }
  } else if (method === "GET" && id !== null) {
    try {
      const product = productservice();

      const singleProduct = product.find((p: Iproduct) => p.id === id);

      if (!singleProduct) {
        return sendResponse(res, false, 404, "Product not found");
      }

      sendResponse(
        res,
        true,
        200,
        "SingleProduct retrive successful!",
        singleProduct,
      );
    } catch (error) {
      sendResponse(res, false, 500, "Internal Server Erorr");
    }
  } else if (method === "POST" && url === "/products") {
    const body = await bodyParser(req);
    // console.log(body)

    const newProduct = {
      id: String(Date.now()),
      ...body,
    };

    const product = productservice();

    product.push(newProduct);

    createProduct(product);

    res.writeHead(201, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "Products created successfully!",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    const body = await bodyParser(req);
    const product = productservice();

    const index = product.findIndex((p: Iproduct) => p.id === id);

    if (index < 0) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          message: "Products not found!",
        }),
      );
    }

    product[index] = {
      id: product[index].id,
      ...body,
    };

    createProduct(product);

    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "Products updated successfully!",
        data: product[index],
      }),
    );
  } else if (method === "DELETE" && id !== null) {
    const product = productservice();

    const index = product.findIndex((p: Iproduct) => p.id === id);

    if (index < 0) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          message: "Products not found!",
        }),
      );
    }

    product.splice(index, 1);

    createProduct(product);

    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "Products deleted successfully!",
      }),
    );
  }
};

export default productController;
