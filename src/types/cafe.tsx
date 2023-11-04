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
  mondayOpen: string;
  mondayClose: string;
  phone?: string;
  web?: string;
  location: string;
  image?: string[];
  type?: string;
  content?: string;
  lat: number;
  lng: number;
}

export type FieldErrors = {
  [fieldName: string]: FieldError | undefined;
};

export type openTime = {
  day_of_week: string;
  open_time: string;
  close_time: string;
}

type addressType = {
  street: string;
  city: string;
  post_code: string;
}

type coordintesType = {
  lat: number;
  lng: number;
}

type contactType = {
  web?: string;
  email?: string;
  phone?: string;
}

export type CafeDetailResponse = {
  name: string;
  location: string[],
  address?: addressType;
  description: string;
  opening_hours: openTime[];
  phone?: string;
  web?: string;
  image?: string[];
  coordinates: coordintesType;
  contact: contactType;
};