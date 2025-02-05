import {google} from "googleapis";
import {GoogleConstants} from "@/constants/google.constants.ts";
import {GoogleAuth} from "google-auth-library";
import type {JSONClient} from "google-auth-library/build/src/auth/googleauth";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";

export namespace GA {
  const PROPERTY_ID = GoogleConstants.GA_PROPERTY_ID;

  let auth: GoogleAuth<JSONClient>

  const getAuth = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const KEY_FILE = path.join(__dirname, '..', '..', '..', 'certificates', 'google.json');

    try {
      await fs.access('myfile');
    } catch (error) {
      throw new Error("Google Certificate not found.\nhttps://www.notion.so/call-saul/Silver-Fox-Inn-Cook-book-185d8046837b80bfa252f662a4bd0963?pvs=4#191d8046837b80a58022e6248ac74070")
    }

    if (!auth) {
      auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
      });
    }

    return auth
  }

  export async function getPageViews() {
    const auth = await getAuth()
    const analyticsDataClient = google.analyticsdata({
      version: 'v1beta',
      auth: auth,
    });

    const response = await analyticsDataClient.properties.runReport({
      property: `properties/${PROPERTY_ID}`,
      requestBody: {
        dateRanges: [{
          startDate: '2025-01-01',
          endDate: 'today',
        }],
        metrics: [{ name: 'screenPageViews' }],
        dimensions: [{ name: 'pagePath' }],
      },
    });

    return response.data!;
  }

  export type QueryPageViewConditions = {
    startDate?: string
    endData?: string
    path: string
  }

  export async function queryPageView() {

  }

  // GA.getPageViews()
  //   .then(data => {
  //     console.log('Page Views Report:');
  //     data.rows.forEach(row => {
  //       console.log(`Path: ${row.dimensionValues[0].value}`);
  //       console.log(`PV: ${row.metricValues[0].value}`);
  //     });
  //   })
  //   .catch(error => {
  //     console.error('Error:', error.message);
  //   });
}
