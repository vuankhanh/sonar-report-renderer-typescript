import { Value } from "../constant/value.constant";
import { TGrade } from "./grade.interface";

export type TValue = `${Value}`;

export interface IValueProgress {
  value: string;
  progress: number;
  color: string;
  trailColor: string;
}

export interface IValueGrade {
  value: string;
  grade: TGrade;
  color: string;
  background: string;
}