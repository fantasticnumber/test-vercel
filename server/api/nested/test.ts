import { readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  if (event.node.req.method?.toUpperCase() !== "POST") {
    throw createError({
      statusCode: 405,
      data: "Post only!"
    });
  }

  
  return {
    msg: process.env.NITRO_PRESET === "node-server" ? "pure node" : "not pure node"
  }
});