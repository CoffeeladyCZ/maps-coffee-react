import { FieldError } from 'react-hook-form';

type districtType = {
  name: string
}

export type cityLocations = districtType[];

export type FormValues = {
  name: string;
  street: string;
  city: string;
  postCode: string;
  description: string;
  time: string;
  phone?: string;
  web?: string;
  location: string[];
  image?: string[];
  type?: string;
  content?: string;
  lat: number;
  lng: number;
}

export type FieldErrors = {
  [fieldName: string]: FieldError | undefined;
};
