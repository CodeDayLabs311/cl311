import { HttpMethod, IReportClient, IReport } from '@/models';
import { IGetReportResponse } from '@/pages/api/report/[id]';

const CREATE_REPORT_ENDPOINT = '/api/report/create';
const GET_REPORT_BASE_ENDPOINT = '/api/report';

/** Client to interact with report API */
// TODO implement error handling
export class ReportApiClient implements IReportClient {
    /** Create report */
    async createReport(report: Omit<IReport, 'reportId'>) {
        const response = await fetch(CREATE_REPORT_ENDPOINT, {
            method: HttpMethod.POST,
            body: JSON.stringify(report),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const json: IGetReportResponse = await response.json();

        return json.report;
    }

    /** Get report */
    async getReport(reportId: string) {
        const response = await fetch(`${GET_REPORT_BASE_ENDPOINT}/${reportId}`);
        const json: IGetReportResponse = await response.json();

        return json.report;
    }

    /** Put report */
    async putReport(report: IReport) {
        const response = await fetch(`${PUT_REPORT_BASE_ENDPOINT}/${report.reportId}`, {
            method: HttpMethod.PUT,
            body: JSON.stringify(report),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const json: IGetReportResponse = await response.json();

        return json.report;
    }
}
