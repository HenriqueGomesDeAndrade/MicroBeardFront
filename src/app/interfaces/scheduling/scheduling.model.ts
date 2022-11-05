export interface Scheduling {
  code: string;
  title: string;
  serviceCode?: number;
  contactCode?: number;
  date: Date;
  endDate: Date;
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
