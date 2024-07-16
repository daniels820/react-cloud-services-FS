import { Request, Response } from "express";
import { CloudProviderRepository } from "./cloud-provider.repository";

export class ProvidersController {
  static async getProviders(req: Request, res: Response) {
    const ans = await CloudProviderRepository.findAll();

    return res.send(ans);
  }
}
