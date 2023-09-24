export interface LatLonObject {
    lat: number;
    lon: number;
}

export interface ILocation extends LatLonObject {
    name: string;
}
