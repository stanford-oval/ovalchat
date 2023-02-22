// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  x: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // HANDLER FOR TESTING/EXPERIMENTATION
  console.log(req.body);
  res.status(200).json({ name: "John Doe", x: req.query });
}
