import { prismaClient } from "@/services/prismaClient";

export class UrlRepository {
  static async saveUrl(url: string) {
    const urlCreated = await prismaClient.url.create({
      data: { baseUrl: url },
    });

    return urlCreated;
  }

  static async getUrlById(id: string) {
    const urlCreated = await prismaClient.url.findFirst({
      where: { id },
    });

    return urlCreated;
  }
}
