import cookie from "cookie";
import { APIURL } from "../../config/config";
import { NextApiRequest, NextApiResponse } from "next";

const currentUser = async (req: NextApiRequest, res: NextApiResponse) => {
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

    // console.log(data)
    return res.json({});
  } else {
    res.status(400).send(`${req.method} is not Allowed`);
  }
};

export default currentUser;
