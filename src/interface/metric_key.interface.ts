import { MainMetricKey, SubMetricKey } from "../constant/metric_key.constant";

export type TMainMetricKey = `${MainMetricKey}`;
export type TSubMetricKey = `${SubMetricKey}`;

export interface IMeasureUnit {
  metric: TMainMetricKey & TSubMetricKey;
  value: string;
  bestValue: boolean;
}