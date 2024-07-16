import { Request, Response } from "express";
import { FindAllParams, Scan } from "./types";
import { ScanRepository } from "./scan.repository";

export class ScanController {
  static async getScans(req: Request, res: Response) {
    const { year, providers } = req.query;
    let params: FindAllParams = {
      filterCallback: (scan: Scan) => filterByYear(scan, year), // As year is always filtering
    };

    if (providers) {
      params = {
        filterCallback: (scan: Scan) =>
          filterByProvider(scan, providers) && filterByYear(scan, year),
      };
    }
    const ans: Scan[] = await ScanRepository.findAll(params);

    return res.send(ans);
  }
}

function filterByYear(scan: Scan, year: any): boolean {
  return (
    new Date(Number(year), 0, 1) < scan.date &&
    scan.date < new Date(Number(year), 11, 31)
  );
}

function filterByProvider(scan: Scan, providers: any): boolean {
  return providers.includes(scan.cloudProviderId);
}
