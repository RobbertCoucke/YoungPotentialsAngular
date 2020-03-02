import { Vacature } from './vacature';

export class Favoriet{
    id: number;
    vacature: Vacature;

    constructor(id: number, vacature: Vacature)
    {
        this.id = id;
        this.vacature = vacature;
    }
}