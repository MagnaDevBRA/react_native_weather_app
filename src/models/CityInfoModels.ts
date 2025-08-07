export interface CityData {
  id: number;
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export interface CityResponse {
  message: string;
  cod: string;
  count: number;
  list: CityList[];
}

export interface CityList {
  id: number;
  name: string;
  coord: Coordinates;
  dt: number;
  sys: {
    country: string;
  };
}

export interface Coordinates {
  lat: number;
  lon: number;
}