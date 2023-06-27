import { client } from "../apiClient";
import { z as zod } from "zod";

const helloSchema = zod.object({
  name: zod.string(),
});

export const getHelloMessage = async () => {
  const { data } = await client.get("/hello");

  return helloSchema.parse(data);
};
