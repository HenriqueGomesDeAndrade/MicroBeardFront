import { Collaborator } from "../collaborator/collaborator.model";
import { Scheduling } from "../scheduling/scheduling.model";

export interface ServiceForCreation{
  name: string;
  price: number;
  time: number;
  type: string;
  description: string;

  collaborators?: Collaborator[];
  scheduling?: Scheduling[];
}