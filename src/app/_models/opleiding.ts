

export class Opleiding{
    id: string;
    naam: string;
    afstudeerrichtings: any[];

    constructor(id: string, name: string, a: any[]){
        this.id = id;
        this.naam = name;
        this.afstudeerrichtings = a;
    };
}