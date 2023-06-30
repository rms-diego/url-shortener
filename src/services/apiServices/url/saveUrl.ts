import { client } from "../../apiClient";
import { z as zod } from "zod";

export const urlCreatedSchema = zod.object({
  id: zod.string().uuid(),
  baseUrl: zod.string(),
});

export type UrlCreatedType = zod.infer<typeof urlCreatedSchema>;

export const saveUrl = async (url: string) => {
  const { data } = await client.post("/url/saveUrl", { url });

  return urlCreatedSchema.parse(data);
};
