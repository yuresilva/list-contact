export interface IContact {
    id: number;
    name: string;
    email: string;
    numbers: INumber[];
    cpf: string;
    date_born : Date;
}

export interface INumber {
    id: number;
    id_schedule: number;
    number: string;
}