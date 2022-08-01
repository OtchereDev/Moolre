import cookie from "cookie";
import { APIURL } from "../../config/config";
import { NextApiRequest, NextApiResponse } from "next";
import { Payment } from "../../config/backendRoutes";

const Checkout = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (!req.headers.cookie) {
      res.status(400).send({});
      return;
    }
    let { access_token } = cookie.parse(req.headers.cookie);

    if (!access_token) {
      res.status(400).send({});
      return;
    }
    const request = await fetch(`${APIURL}${Payment}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${access_token}`,
      },
    });

    const data = await request.json();

    if (request.ok) {
      return res.json({
        message: data.message,
      });
    }

    // console.log(data)
    return res.status(400).json({ message: data.message });
  } else {
    res.status(400).send(`${req.method} is not Allowed`);
  }
};

export default Checkout;
