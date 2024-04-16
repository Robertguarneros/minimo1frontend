
export interface PointOfInterest {
    _id?: string;
    title: string;
    reviews?: string[]; // Array to store review IDs
    coords: {
        latitude: string;
        longitude: string;
    };
    creation_date?: Date;
    modified_date?: Date;
}