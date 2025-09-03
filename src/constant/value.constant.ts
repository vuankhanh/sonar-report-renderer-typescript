import { TGrade } from "../interface/grade.interface";
import { TValue } from "../interface/value.interface";
import { Grade } from "./grade.constant";

export enum Value {
  '1.0' = '1.0',
  '2.0' = '2.0',
  '3.0' = '3.0',
  '4.0' = '4.0',
  '5.0' = '5.0'
};

export const VALUE_GRADE_MAP: Record<TValue, TGrade> = {
  '1.0': Grade.A,
  '2.0': Grade.B,
  '3.0': Grade.C,
  '4.0': Grade.D,
  '5.0': Grade.E,
};