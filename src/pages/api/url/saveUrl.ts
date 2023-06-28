import { UrlUseCase } from "@/useCases/url.useCase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.body;

  const urlCreated = await UrlUseCase.saveUrl(url);

  return res.status(201).json(urlCreated);
}
