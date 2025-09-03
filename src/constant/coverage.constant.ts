import { TCoverage } from "../interface/coverage.interface";

export enum Coverage {
  '80.0' = '80.0',
  '70.0' = '70.0',
  '50.0' = '50.0',
  '30.0' = '30.0',
  '0.0' = '0.0',
  '-1.0' = '-1.0',
};

export const coverageColor: { color: string; trailColor: string } = {
  color: '#12b76a',
  trailColor: '#b42318'
};

export const COVERAGE_PROGRESS_MAP: Record<TCoverage, number> = {
  '80.0': 0.85,
  '70.0': 0.75,
  '50.0': 0.6,
  '30.0': 0.4,
  '0.0': 0.2,
  '-1.0': 0,
};