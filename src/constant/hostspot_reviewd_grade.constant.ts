import { TCoverage } from "../interface/coverage.interface";
import { TGrade } from "../interface/grade.interface";
import { Grade } from "./grade.constant";

export const HOSTSPLOT_REVIEWD_GRADE_MAP: Record<TCoverage, TGrade> = {
  '80.0': Grade.A,
  '70.0': Grade.B,
  '50.0': Grade.C,
  '30.0': Grade.D,
  '0.0': Grade.E,
  '-1.0': Grade.E,
};