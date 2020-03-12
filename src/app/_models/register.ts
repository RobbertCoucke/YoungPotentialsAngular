
export class Register {

    constructor(email: string, password: string, isStudent: boolean){
        this.email= email;
        this.password = password;
        this.isStudent = isStudent;
    }

    //user
    email: string;
    password: string;
    telephone: string;
    city: string;
    zipCode: string;
    address: string;
    isStudent: boolean;

    //student
    name: string;
    firstName: string;

    //company
    sectorId: number;
    description: string;
    url: string;
    companyName: string;
    serctor: string;

}