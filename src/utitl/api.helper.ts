import axios, { AxiosError } from 'axios';
import { IMeasureUnit } from '../interface/metric_key.interface';

const url = process.env.SONAR_QUBE_URL;

export class SonarApiHelper {
  static async fetchSonarMeasures(
    url: string,
    component: string,
    metricKeys: string[],
    token: string
  ): Promise<SonaQubeResponseData> {
    const params = {
      component,
      metricKeys: metricKeys.join(','),
    };

    const headers = { Authorization: `Basic ${Buffer.from(token + ':').toString('base64')}` }

    try {
      const response = await axios.get(url, { params, headers });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === 'ECONNREFUSED') {
          throw new Error('Không thể kết nối đến SonarQube. Vui lòng kiểm tra lại URL và trạng thái của SonarQube server.');
        }
        // console.error('AxiosError:', error.message, error.response?.data);
        throw error;
      }
      throw error;
    }
  }
}

export interface SonaQubeResponseData {
  component: {
    key: string;
    name: string;
    qualifier: string;
    measures: IMeasureUnit[];
  }
}