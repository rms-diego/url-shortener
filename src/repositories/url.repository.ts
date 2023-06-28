import { prismaClient } from "@/services/prismaClient";

export class UrlRepository {
  static async saveUrl(url: string, hash: string) {
    const urlCreated = await prismaClient.url.create({
      data: { baseUrl: url, hash },
    });

    return urlCreated;
  }
}
