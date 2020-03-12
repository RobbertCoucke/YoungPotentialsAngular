import { Vacature } from './vacature';

export class Company{
    id: number;
    email: string;
    telephone: string;
    zipCode : number;
    city: string;
    address : string;
    isStudent: boolean;

    userId: number;
    description: string;
    url: string;
    companyName: string;
    verified: boolean;
    offers : Vacature[];
    sector: any;


}