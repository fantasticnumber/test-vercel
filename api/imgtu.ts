import axios from "axios";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method!.toUpperCase() === "POST") {
    try {
      const cookie = req.body.cookie;
      const album = req.body.album;
      const resp = await axios({
        url: `https://imgtu.com/album/${album}`,
        method: 'get',
        headers: {
          cookie,
        }
      });
      const token = resp.data.match(/PF\.obj\.config\.auth_token\s=\s"(.*?)"/)[1];
      const response = await axios({
        url: "https://imgtu.com/json",
        method: 'post',
        headers: {
          cookie,
        },
        data: {
          source: req.body.file,
          type: "file",
          action: "upload",
          timestamp: Date.now(),
          auth_token: token,
          nsfw: 0,
          album_id: album
        }
      });
      res.send(response.data);
    } catch (e) {
      res.send(e.toString());
    }
  } else {
    res.send("Post only!");
  }
}
