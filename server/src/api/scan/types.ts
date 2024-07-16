export interface FindAllParams {
  filterCallback?: (scan: Scan) => boolean;
}

export interface Scan {
  id: string;
  date: Date; 
  cloudProviderId: string;
  scanSize: number;
  scanPrivateKey: string;
}
