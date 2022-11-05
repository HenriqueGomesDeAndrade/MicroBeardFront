export interface SchedulingForUpdate {
  title: string;
  serviceCode: number;
  contactCode: number;
  collaboratorCode?: number;
  date: string;
  endDate: string;
  cancelled?: boolean;
}
