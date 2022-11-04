export interface Service {
  code: string;
  name: string;
  price: number;
  time: number;
  type: string;
  description: string;
  creatorCode?: number;
  createDate?: string;
  updaterCode?: number;
  updateDate?: string;
  deleterCode?: number;
  deleteDate?: string;
}
