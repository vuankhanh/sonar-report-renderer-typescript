import { MainMetricKey, SubMetricKey } from "../constant/metric_key.constant";
import { IMeasureUnit, TMainMetricKey } from "../interface/metric_key.interface";
import { IValueGrade, IValueProgress } from "../interface/value.interface";
import { SonaQubeResponseData } from "../utitl/api.helper";
import { PropertyReportHepler } from "../utitl/property_report.helper";

function buildMetricParams(measureUnit: IMeasureUnit) {
  switch (measureUnit.metric) {
    case MainMetricKey.SecurityRating:
    case MainMetricKey.ReliabilityRating:
    case MainMetricKey.SqaleRating:
      return PropertyReportHepler.getValueGrade(measureUnit);
    case MainMetricKey.SecurityHotspotsReviewed:
      return PropertyReportHepler.getHospotsReviewed(measureUnit);
    case MainMetricKey.Coverage:
      return PropertyReportHepler.getCoverageProgress(measureUnit);
    case MainMetricKey.DuplicatedLinesDensity:
      return PropertyReportHepler.getDuplications(measureUnit);
    default: return null;
  }
}

export class SonaQubeMesuresService {
  static getProperty(data: SonaQubeResponseData) {
    const measures = data.component.measures;

    const securityValue = measures.find(m => m.metric === SubMetricKey.SoftwareQualitySecurityIssues)!.value;
    const reliabilityValue = measures.find(m => m.metric === SubMetricKey.SoftwareQualityReliabilityIssues)!.value;
    const maintainabilityValue = measures.find(m => m.metric === SubMetricKey.SoftwareQualityMaintainabilityIssues)!.value;
    let result: Record<TMainMetricKey, IValueGrade | IValueProgress> = {} as any;
    for (const measureUnit of measures) {
      const buildMetric = buildMetricParams(measureUnit);
      if (!buildMetric) continue;
      switch (measureUnit.metric) {
        case MainMetricKey.SecurityRating:
          buildMetric.value = securityValue;
          result[MainMetricKey.SecurityRating] = buildMetric;
          break;
        case MainMetricKey.ReliabilityRating:
          buildMetric.value = reliabilityValue;
          result[MainMetricKey.ReliabilityRating] = buildMetric;
          break;
        case MainMetricKey.SqaleRating:
          buildMetric.value = maintainabilityValue;
          result[MainMetricKey.SqaleRating] = buildMetric;
          break;
        case MainMetricKey.SecurityHotspotsReviewed:
          buildMetric.value = buildMetric.value + '%';
          result[MainMetricKey.SecurityHotspotsReviewed] = buildMetric;
          break;
        case MainMetricKey.Coverage:
          buildMetric.value = buildMetric.value + '%';
          result[MainMetricKey.Coverage] = buildMetric;
          break;
        case MainMetricKey.DuplicatedLinesDensity:
          buildMetric.value = buildMetric.value + '%';
          result[MainMetricKey.DuplicatedLinesDensity] = buildMetric;
          break;
        default: break;
      }
    }
    return result;
  }
}