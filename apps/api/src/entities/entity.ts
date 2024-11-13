// global modules
import { Exclude } from 'class-transformer';

const ENTITY_TYPE = Symbol('ENTITY_TYPE');

export class Entity {
  @Exclude()
  [ENTITY_TYPE] = ENTITY_TYPE;
}

export type WithoutEntityType<T> = Omit<T, typeof ENTITY_TYPE>;
