import { TGrade } from "../interface/grade.interface";

export enum Grade {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E'
};

export const GRADE_COLOR_MAP: Record<TGrade, { color: string; background: string }> = {
  A: { color: '#054f31', background: '#d1fadf' },
  B: { color: '#315516', background: '#e1f5a8' },
  C: { color: '#66400f', background: '#fce9a3' },
  D: { color: '#7a2e0e', background: '#ffd6af' },
  E: { color: '#5d1d13', background: '#fecdca' },
};