import axios from "axios";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method.toUpperCase() === "POST") {
    try {
      const response = await axios.get("https://bing.com");
      res.send(response.data);
    } catch (e) {
      res.send(e.toString());
    }
  } else {
    res.send("Post only!");
  }
}
