import { Collaborator } from "../collaborator/collaborator.model";

export interface LicenseForCreation{
  description: string;

  collaborators?: Collaborator[];
}