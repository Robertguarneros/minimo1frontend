import * as mongoose from 'mongoose';

export interface User {
    _id?: string;
    first_name:string;
    middle_name?:string;
    last_name:string;
    email: string;
    phone_number: string;
    gender: string;
    places?: string[]; // Array to store place IDs
    reviews?: string[]; // Array to store review IDs
    conversations?:string[];
    user_rating?:string;
    photo?:string;
    description?:string;
    dni?:string;
    personality?:string;
    password: string;
    birth_date: Date;
    address?:string;
    housing_offered?:string[];
    emergency_contact?: {
        full_name?: string;
        telephone?: string;
    };
    user_deactivated?:boolean;
    creation_date?: Date;
    modified_date?: Date;
}