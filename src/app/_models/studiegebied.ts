import { Opleiding } from './opleiding';

export class Studiegebied{
    id: string;
    naam : string;
    kleur: string;
    opleidings: [Opleiding];

    constructor(studiegebiedResponse: any){
        this.id = studiegebiedResponse.Id;
        this.naam = studiegebiedResponse.studiegebied1;
        this.kleur = studiegebiedResponse.kleur;
        this.opleidings = studiegebiedResponse.opleidings;
    };
}