import { Collaborator } from "../collaborator/collaborator.model";

export interface License {
  code: string;
  description: string;
  creatorCode?: number;
  createDate?: string;
  updaterCode?: number;
  updateDate?: string;
  desactivatorCode?: number;
  desactivationDate?: string;

  collaborators?: Collaborator[];
}
