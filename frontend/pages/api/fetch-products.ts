import { APIURL } from "../../config/config";
import { NextApiRequest, NextApiResponse } from "next";
import { Products } from "../../config/backendRoutes";

const FetchAllProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const response = await fetch(`${APIURL}${Products}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(400).json({ message: data.message });
    }

    return res.json({
      message: data.message,
      products: data.data.products,
    });
  } else {
    res.status(400).send({ message: `${req.method} is not Allowed` });
  }
};

export default FetchAllProducts;
