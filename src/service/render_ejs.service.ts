import ejs from 'ejs';
import path from 'path';
import { TMainMetricKey } from '../interface/metric_key.interface';
import { IValueGrade, IValueProgress } from '../interface/value.interface';

import moment from 'moment';
// ...existing code...
function getVNDateString() {
  return moment().format('DD/MM/YYYY HH:mm:ss');
}

export class RenderEjsService {
  static async renderSonarQubeReport(resultReportData: Record<TMainMetricKey, IValueGrade | IValueProgress>) {
    const templatePath = path.join(__dirname, '../template/report.ejs');
    const data = { ...resultReportData, currentDate: getVNDateString() };
    const htmlContent = await ejs.renderFile(templatePath, data);
    // Thêm thẻ script CDN vào cuối HTML
    const html = htmlContent;
    console.log(html);
    return {
      html,
      selector: '#report-root'
    }
  }
}