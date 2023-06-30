import { UrlUseCase } from "@/useCases/url.useCase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { referer: url } = req.headers!;

  if (!url) {
    return res.status(400).end();
  }

  const idIndex = 3;
  const id = url.split("/")[idIndex];

  const urlFound = await UrlUseCase.getUrlById(id);

  if (!urlFound) return res.status(404).json({ error: "Url Does not exists" });

  return res.status(200).json(urlFound);
}
