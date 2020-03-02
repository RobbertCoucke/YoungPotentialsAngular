export class Vacature
{
    id: number;
    title: string;
    description: string;
    email: string;
    name: string;
    companyName: string;
    address: string;
    created: Date;
    updated: Date;
    expirationDate: Date;
    code: string;
    companyId: number;
    typeId: number;
    zipCode: number;
    city: string;
    country: string;

    constructor(object: any)
    {
        this.id = object.id;
        this.title = object.title;
        this.description = object.description;
        this.email = object.email;
        this.name = object.name;
        this.companyName = object.companyName;
        this.address = object.address;
        this.created = object.created;
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