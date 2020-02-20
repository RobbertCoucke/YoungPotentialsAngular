import { Opleiding } from './Opleiding';

export class Studiegebied{
    id: string;
    naam : string;
    kleur: string;
    opleidings: Opleiding[];

    constructor(id: string, name: string, kleur: string, o: any[]){
        this.id = id;
        this.naam = name;
        this.kleur = kleur;
        this.opleidings = o;
    };
}