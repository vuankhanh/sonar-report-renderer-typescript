import { TMainMetricKey, TSubMetricKey } from "../interface/metric_key.interface";

export enum MainMetricKey {
  SecurityRating = 'security_rating',
  ReliabilityRating = 'reliability_rating',
  SqaleRating = 'sqale_rating',
  SecurityHotspotsReviewed = 'security_hotspots_reviewed',
  Coverage = 'coverage',
  DuplicatedLinesDensity = 'duplicated_lines_density',
}

export const mainMetricKeys: TMainMetricKey[] = Object.values(MainMetricKey);

export enum SubMetricKey {
  SoftwareQualitySecurityIssues = 'software_quality_security_issues',
  SoftwareQualityReliabilityIssues = 'software_quality_reliability_issues',
  SoftwareQualityMaintainabilityIssues = 'software_quality_maintainability_issues',
}

export const subMetricKeys: TSubMetricKey[] = Object.values(SubMetricKey);