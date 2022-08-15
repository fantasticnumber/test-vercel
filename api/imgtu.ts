import axios from "axios";
import FormData from 'form-data';
import fs from 'fs';
import multiparty from 'multiparty';
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method!.toUpperCase() === "POST") {
    try {
      const form = new multiparty.Form();
      const data: any = await new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
          if (err) reject({ err });
          resolve({ fields, files });
        });
      });
      const cookie = data.fields.album[0];
      const album = data.fields.cookie[0];
      const file = data.files.file[0].path;

      const resp = await axios({
        url: `https://imgtu.com/album/${album}`,
        method: 'get',
        headers: {
          cookie,
        }
      });
      const token = resp.data.match(/PF\.obj\.config\.auth_token\s=\s"(.*?)"/)[1];
      
      const formData: any = new FormData();
      formData.append('source', fs.createReadStream(file));
      formData.append('type', 'file');
      formData.append('action', 'upload');
      formData.append('timestamp', Date.now());
      formData.append('auth_token', token);
      formData.append('nsfw', 0);
      formData.append('album_id', album);
      const len: number = await new Promise((resolve, reject) => {
        formData.getLength((err, len) => {
          if (err) {
            reject(err);
            return
          }
          resolve(len);
        })
      });
      const response = await axios({
        url: "https://imgtu.com/json",
        method: 'post',
        headers: {
          cookie,
          'Content-Length': len
        },
        data: formData
      });
      res.send(response.data);
    } catch (e) {
      res.send(e.response.data);
    }
  } else {
    res.send("Post only!");
  }
}