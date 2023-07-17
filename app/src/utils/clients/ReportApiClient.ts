import { HttpMethod, IReportClient, IReport } from '@/models';
import { IListReportsResponse } from '@/pages/api/report/list';
import { IListReportsByCategoryResponse } from '@/pages/api/report/list/[category]';
import { IGetReportResponse } from '@/pages/api/report/[id]';

const CREATE_REPORT_ENDPOINT = '/api/report/create';
const GET_REPORT_BASE_ENDPOINT = '/api/report';
const LIST_REPORTS_ENDPOINT = '/api/report/list';
const PUT_REPORT_BASE_ENDPOINT = '/api/report';

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

    /** List reports */
    async getReport(reportId: string) {
        const response = await fetch(`${GET_REPORT_BASE_ENDPOINT}/${reportId}`);
        const json: IGetReportResponse = await response.json();

        return json.report;
    }

    /** List reports */
    async listReports(paginationToken?: string) {
        const response = await fetch(
            `${LIST_REPORTS_ENDPOINT}?paginationToken=${paginationToken}`
        );
        const json: IListReportsResponse = await response.json();

        return json;
    }

    /** List reports by category */
    async listReportsByCategory(category: string, paginationToken?: string) {
        const response = await fetch(
            `${LIST_REPORTS_ENDPOINT}/${category}?paginationToken=${paginationToken}`
        );
        const json: IListReportsByCategoryResponse = await response.json();

        return json;
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
