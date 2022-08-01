import cookie from "cookie";
import { APIURL } from "../../config/config";
import { NextApiRequest, NextApiResponse } from "next";
import { GetCart as GetCartEndpoint } from "../../config/backendRoutes";

export interface ICartBody {
  productId: string;
  quantity: number;
}

const GetCart = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (!req.body?.access_token) {
      res.status(401).send({
        message: "Please sign in to get access to your cart",
      });
      return;
    }
    let { access_token } = req.body;

    const request = await fetch(`${APIURL}${GetCartEndpoint}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${access_token}`,
      },
    });

    const data = await request.json();

    if (request.ok) {
      return res.json({
        message: data.message,
        cart: data.cart,
        cartTotal: data.cartTotal,
      });
    }

    // console.log(data)
    return res.status(400).json({ message: data.message });
  } else {
    res.status(400).send(`${req.method} is not Allowed`);
  }
};

export default GetCart;
