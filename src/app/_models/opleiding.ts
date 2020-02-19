import { Afstudeerrichting } from './afstudeerrichting';

export class Opleiding{
    id: string;
    naam: string;
    afstudeerrichtings: [Afstudeerrichting];
}