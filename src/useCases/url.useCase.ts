import { UrlRepository } from "@/repositories/url.repository";

export class UrlUseCase {
  static async saveUrl(url: string) {
    const urlCreated = await UrlRepository.saveUrl(url);

    return urlCreated;
  }

  static async getUrlById(id: string) {
    const urlFound = await UrlRepository.getUrlById(id);

    return urlFound;
  }
}
