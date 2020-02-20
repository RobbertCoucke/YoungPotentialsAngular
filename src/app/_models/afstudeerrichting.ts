import { Keuze } from './Keuze';

export class Afstudeerrichting{
    id: string;
    naam: string;
    keuzes: Keuze[];

    constructor(id:string, naam:string, keuzes:any[]){
        this.id = id;
        this.naam = naam;
        this.keuzes = keuzes;

    }
}