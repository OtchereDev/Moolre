import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", [
      cookie.serialize("refresh_token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
      }),
      cookie.serialize("access_token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
      }),
    ]);

    return res.send({});
  } else {
    res.send(`${req.method} is not Allowed`);
  }
};

export default logout;
