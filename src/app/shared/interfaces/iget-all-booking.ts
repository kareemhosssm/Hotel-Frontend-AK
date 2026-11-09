export interface IgetAllBooking {
    bookingId:    number;
    userId:       string;
    roomId:       number;
    room:         Room;
    checkInDate:  Date;
    checkOutDate: Date;
    createdAt:    Date;
    expiresAt:    Date;
    status:       string;
}

export interface Room {
    roomId:        number;
    number:        string;
    type:          string;
    pricePerNight: number;
    isAvailable:   boolean;
    bookedUntil:   null;
    description:   string;
    images:        string[];
}
