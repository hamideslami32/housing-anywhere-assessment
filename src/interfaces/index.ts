import { UNUSED_KEYS } from '../components/characters/Characters';

export interface IInfo<T> {
  info?: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results?: T;
}

export interface ICharacterLocation {
  name: string;
  url: string;
}

export interface ICharacterBase {
  id: number;
  url: string;
  name: string;
  image: string;
  status: 'Dead' | 'Alive' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: ICharacterLocation;
  location: ICharacterLocation;
  created: string;
  episode: string[];
}

export type TCharacter = Omit<ICharacterBase, typeof UNUSED_KEYS[number]>;
