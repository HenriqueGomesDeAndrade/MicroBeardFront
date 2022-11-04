export interface Scheduling {
  code: string;
  serviceCode: number;
  contactCode: number;
  date: number;
  cancelled?: boolean;
  cancellerCode?: number;
  cancellationDate?: string;
  creatorCode?: number;
  createDate?: string;
  updaterCode?: number;
  updateDate?: string;
  deleterCode?: number;
  deleteDate?: string;
}
