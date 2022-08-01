import cookie from "cookie";
import { APIURL } from "../../config/config";
import { NextApiRequest, NextApiResponse } from "next";
import {
  Products,
  UpdateCart as UpdateCartEndpoint,
} from "../../config/backendRoutes";

export interface IUploadProduct {
  productName: string;
  price: number;
  imageUrl: string;
}

const UploadProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { price, imageUrl, productName }: IUploadProduct = req.body;
    console.log("price, imageUrl, productName ", price, imageUrl, productName);

    const request = await fetch(`${APIURL}${Products}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ price, imageUrl, productName }),
    });

    const data = await request.json();

    if (request.ok) {
      return res.json({ message: data.message, product: data.product });
    }

    // console.log(data)
    return res.status(400).json({ message: data.message });
  } else {
    res.status(400).send(`${req.method} is not Allowed`);
  }
};

export default UploadProduct;
