import * as mongoose from 'mongoose';

export interface Place {
    _id?: string; // Optional _id field
    title: string;
    content: string;
    author: string; // Reference to the User collection
    reviews?: string[];
    rating: number;
    coords: {
        latitude: number;
        longitude: number;
    };
    photo: string;
    typeOfPlace: {
        bankito: boolean;
        public: boolean; //false = private true = public
        covered: boolean;
    };
    schedule: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
    address: string;
    creation_date: Date;
    modified_date: Date;
    deactivated: boolean;
}