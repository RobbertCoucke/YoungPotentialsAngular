import { Studiegebied } from './studiegebied';



export class Vacature
{
    id: number;
    title: string;
    description: string;
    email: string;
    name: string;
    companyName: string;
    address: string;
    created: string;
    updated: string;
    expirationDate: Date;
    code: string;
    companyId: number;
    typeId: number;
    zipCode: number;
    city: string;
    country: string;
    tags: Studiegebied[];

    constructor(object: any)
    {
        this.id = object.id;
        this.title = object.title;
        this.description = object.description;
        this.email = object.email;
        this.name = object.name;
        this.companyName = object.companyName;
        this.address = object.address;
        if(object.created){
        this.created = JSON.stringify(object.created).substring(0,6);
        }
        this.updated = object.updated;
        this.expirationDate = object.expirationDate;
        this.code = object.code;
        this.companyId = object.companyId;
        this.typeId = object.typeId;
        this.zipCode = object.zipCode;
        this.city = object.city;
        this.country = object.country;
    }

}