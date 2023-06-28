import { UrlRepository } from "@/repositories/url.repository";
import { randomUUID } from "crypto";

export class UrlUseCase {
  static async saveUrl(url: string) {
    const hash = randomUUID();

    const urlCreated = await UrlRepository.saveUrl(url, hash);

    return urlCreated;
  }
}
