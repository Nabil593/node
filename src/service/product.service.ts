import fs from "fs";
import path from "node:path";
import type { Iproduct } from "../types/product";

const filePath = path.join(process.cwd(), "./src/database/db.json");

export const productservice = () => {
    console.log(filePath);

    const result = fs.readFileSync(filePath, "utf-8");
    // console.log(result)
    return JSON.parse(result);
}

export const createProduct = (payload: Iproduct[]) => {
    fs.writeFileSync(filePath, JSON.stringify(payload));
}

export const deleteProduct = () => {
    
}