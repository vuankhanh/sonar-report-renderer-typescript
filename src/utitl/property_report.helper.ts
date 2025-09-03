import { GRADE_COLOR_MAP } from "../constant/grade.constant";
import { Value, VALUE_GRADE_MAP } from "../constant/value.constant";
import { TGrade } from "../interface/grade.interface";
import { IMeasureUnit } from "../interface/metric_key.interface";
import { IValueGrade, IValueProgress, TValue } from "../interface/value.interface";
import { TCoverage } from "../interface/coverage.interface";
import { HOSTSPLOT_REVIEWD_GRADE_MAP } from "../constant/hostspot_reviewd_grade.constant";
import { Coverage, COVERAGE_PROGRESS_MAP, coverageColor } from "../constant/coverage.constant";
import { duplicationsColorMap } from "../constant/duplications_color.constant";

export class PropertyReportHepler {
  static getValueGrade(measureUnit: IMeasureUnit): IValueGrade {
    const value: TValue = measureUnit.value as TValue || Value['5.0'];
    const grade: TGrade = VALUE_GRADE_MAP[value];

    if (grade) {
      const gradeColor = GRADE_COLOR_MAP[grade];
      return {
        value: measureUnit.value,
        grade,
        color: gradeColor.color,
        background: gradeColor.background
      }
    }
    throw new Error(`Lỗi không map được dữ liệu ${JSON.stringify(measureUnit)}`)
  }

  static getHospotsReviewed(measureUnit: IMeasureUnit): IValueGrade {
    const value = Number.parseFloat(measureUnit.value) || 0;
    const arrayMin = Object.values(Coverage);

    let itemMin: TCoverage = Coverage['-1.0'];
    for (const item of arrayMin) {
      const min = Number.parseInt(item);
      if (value >= min) {
        itemMin = item;
        break;
      }
    }
    const grade: TGrade = HOSTSPLOT_REVIEWD_GRADE_MAP[itemMin];
    const gradeColor = GRADE_COLOR_MAP[grade];
    return {
      value: measureUnit.value,
      grade,
      color: gradeColor.color,
      background: gradeColor.background
    }
  }

  static getCoverageProgress(measureUnit: IMeasureUnit): IValueProgress {
    const value = Number.parseFloat(measureUnit.value) || 0;
    const arrayMin = Object.values(Coverage);

    let itemMin: TCoverage = Coverage['-1.0'];
    for (const item of arrayMin) {
      const min = Number.parseInt(item);
      if (value > min) {
        itemMin = item;
        break;
      }
    }

    const progress = COVERAGE_PROGRESS_MAP[itemMin];
    return {
      value: measureUnit.value,
      progress,
      ...coverageColor
    }
  }

  static getDuplications(measureUnit: IMeasureUnit): IValueProgress {
    const value = Number.parseFloat(measureUnit.value) || 0;
    let result: IValueProgress ={
      value: measureUnit.value,
      progress: 0,
      color: '#12b76a',
      trailColor: '#eff2f9'
    };
    for (const item of duplicationsColorMap) {
      result = {
        value: measureUnit.value,
        progress: item.progress,
        color: item.color,
        trailColor: item.trailColor
      }
      if (isFinite(item.max)) return result;
      if (value <= item.max) return result;
    }
    return result;
  }
}