export class Vacature {

    constructor(title: string, description: string, expirationDate:Date){
        this.title = title;
        this.description = description;
        this.expirationDate = expirationDate;
    }

    title: string;
    description: string;
    email: string;
    name: string;
    address: string;
    expirationDate: Date;
    companyId: number;
    typeId: number;
    zipCode: string;
    city: string;
    //country: string;




}