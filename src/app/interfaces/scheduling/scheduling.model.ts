import { Collaborator } from "../collaborator/collaborator.model";
import { Contact } from "../contact/contact.model";
import { Service } from "../service/service.model";

export interface Scheduling {
  code: string;
  title: string;
  serviceCode?: number;
  contactCode?: number;
  collaboratorCode?: number;
  date: Date;
  endDate: Date;
  cancelled?: boolean;
  cancellerCode?: number;
  cancellationDate?: string;
  creatorCode?: number;
  createDate?: string;
  updaterCode?: number;
  updateDate?: string;

  contact?: Contact;
  service?: Service;
  collaborator?: Collaborator;
}
