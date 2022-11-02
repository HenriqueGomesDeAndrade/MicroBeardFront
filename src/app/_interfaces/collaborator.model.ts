import { License } from "./license.model";

export interface Collaborator{
    code: string;
    name: string;
    birthDate: Date;
    cpf: string;
    email: string;
    phone: string;
    function: string;
    salary: Int32Array;
    commision: Int32Array;
    isAdmin: boolean;

    licenses?: License[];
}