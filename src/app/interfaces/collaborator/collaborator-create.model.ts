export interface CollaboratorForCreation{
    name: string;
    birthDate?: string;
    cpf?: string;
    email: string;
    password: string;
    phone?: string;
    function: string;
    salary: Int32Array;
    commision: Int32Array;
    isAdmin: boolean;
}