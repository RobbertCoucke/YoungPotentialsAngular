export class UpdateUser {

    constructor(email: string, isStudent: boolean){
        this.email= email;
        this.isStudent = isStudent;
    }




    //user
    email: string;
    telephone: string;
    city: string;
    zipCode: string;
    address: string;
    isStudent: boolean;

    //student
    name: string;
    firstName: string;
    cvUrl: string;


    //company

    description: string;
    url: string;
    companyName: string;



}