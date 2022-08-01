import cookie from "cookie";
import { APIURL } from "../../config/config";
import { NextApiRequest, NextApiResponse } from "next";
import { UpdateCart as UpdateCartEndpoint } from "../../config/backendRoutes";

export interface ICartBody {
  productId: string;
  quantity: number;
}

const UpdateCart = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (!req.headers.cookie) {
      res.status(401).send({
        message: "Please sign before you can add an item to your cart",
      });
      return;
    }
    let { access_token } = cookie.parse(req.headers.cookie);

    if (!access_token) {
      res.status(401).send({
        message: "Please sign before you can add an item to your cart",
      });
      return;
    }

    const { quantity, productId }: ICartBody = req.body;

    console.log("quantity, productId ", typeof quantity, productId);

    const request = await fetch(`${APIURL}${UpdateCartEndpoint}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ quantity, productId }),
    });

    const data = await request.json();

    if (request.ok) {
      return res.json({ message: data.message, cartTotal: data.cartTotal });
    }

    // console.log(data)
    return res.status(400).json({ message: data.message });
  } else {
    res.status(400).send(`${req.method} is not Allowed`);
  }
};

export default UpdateCart;
