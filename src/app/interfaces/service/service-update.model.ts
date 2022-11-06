import { Collaborator } from "../collaborator/collaborator.model";
import { Scheduling } from "../scheduling/scheduling.model";

export interface ServiceForUpdate{
  name: string;
  price: number;
  time: number;
  type: string;
  description: string;
  licenseCode: number;

  collaborators?: Collaborator[];
  scheduling?: Scheduling[];
}