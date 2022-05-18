import axios from "axios";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method.toUpperCase() === "POST") {
    const response = await axios.get("https://imgtu.com");
    res.send(response.data);
  } else {
    res.send("Post only!");
  }
}
