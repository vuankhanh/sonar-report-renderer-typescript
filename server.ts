import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import { mainMetricKeys, subMetricKeys } from './src/constant/metric_key.constant';
import { SonaQubeResponseData, SonarApiHelper } from './src/utitl/api.helper';
import { SonaQubeMesuresService } from './src/service/sonar_qube_measures.service';
import { TMainMetricKey } from './src/interface/metric_key.interface';
import { IValueGrade, IValueProgress } from './src/interface/value.interface';
import { RenderEjsService } from './src/service/render_ejs.service';
import { HtmlService } from './src/service/html.service';

const sonarQubeUrl = process.env.SONAR_QUBE_URL;
if (!sonarQubeUrl) throw new Error('SONAR_QUBE_URL không được định nghĩa trong biến môi trường.');

const app = express();
app.use(express.json());
app.use('/static', express.static('node_modules/progressbar.js/dist'));

app.post('/api/sonar-report', async (req, res) => {
  try {
    // Xử lý dữ liệu đầu vào
    const { projectKey, token } = req.body;
    if (!projectKey) return res.status(400).json({ error: 'Không có projectKey trong body' });
    if (!token) return res.status(400).json({ error: 'Không có token trong body' });

    const metricKeys: string[] = [...mainMetricKeys, ...subMetricKeys];
    const url = `${sonarQubeUrl}/api/measures/component`;
    const data: SonaQubeResponseData = await SonarApiHelper.fetchSonarMeasures(url, projectKey, metricKeys, token);
    const getProperty: Record<TMainMetricKey, IValueGrade | IValueProgress> = SonaQubeMesuresService.getProperty(data);

    const properties: Record<TMainMetricKey, IValueGrade | IValueProgress> = {
      'security_rating': getProperty.security_rating,
      'reliability_rating': getProperty.reliability_rating,
      'sqale_rating': getProperty.sqale_rating,
      'security_hotspots_reviewed': getProperty.security_hotspots_reviewed, // <-- thêm dòng này!
      'coverage': getProperty.coverage,
      'duplicated_lines_density': getProperty.duplicated_lines_density
    }
    const {html, selector} = await RenderEjsService.renderSonarQubeReport(properties);

    const buffer = await HtmlService.htmlToImageBuffer(html, selector);

    // Trả về ảnh cho client
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.log('Error in /api/sonar-report:', message);
    
    res.status(500).json({ error: message });
  }
});

const port = process.env.APP_PORT || 3900;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});