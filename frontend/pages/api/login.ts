import { APIURL } from "../../config/config";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { LoginBody } from "../../context/AuthContext";
import { LoginUser } from "../../config/backendRoutes";

const login = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (!req.body) return res.status(401).send({});

    const { email, password }: LoginBody = req.body;

    const request = await fetch(`${APIURL}${LoginUser}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await request.json();
    console.log(data);

    if (!request.ok)
      return res.status(request.status).send({ message: data.message });

    res.setHeader("Set-Cookie", [
      cookie.serialize("access_token", data?.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
      }),
    ]);

    res.send(data?.user);
    return;
  } else {
    res.status(400).send(`${req.method} is not allowed`);
    return;
  }
};

export default login;
