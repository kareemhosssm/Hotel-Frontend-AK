export interface IRoom {
    roomId:        number;
    number:        string;
    type:          string;
    pricePerNight: number;
    isAvailable:   boolean;
    bookedUntil:   null;
    description:   string;
    images:        string[];
}
