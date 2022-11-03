import { License } from "../license/license.model";

export interface Collaborator{
    code: string;
    name: string;
    birthDate: Date;
    cpf: string;
    email: string;
    phone: string;
    function?: string;
    salary: number;
    commision: number;
    isAdmin: boolean;

    licenses?: License[];
}