import { Collaborator } from "../collaborator/collaborator.model";

export interface LicenseForUpdate{
  description: string;

  collaborators?: Collaborator[];
}