import { HttpMethod, IReportClient, IReport } from '@/models';
import { IListReportResponse } from '@/pages/api/report/list';
// TODO: import IGetReportResponse, ICreateReportResponse, etc.

const LIST_REPORTS_ENDPOINT = '/api/report/list';

/** Implementation of IReportClient interface */
export class ReportApiClient implements IReportClient {
    /** List all reports */
    async listReports(paginationToken?: string) {
        const response = await fetch(`${LIST_REPORTS_ENDPOINT}?paginationToken=${paginationToken}`);
        const json: IListReportResponse = await response.json();

        return json;
    }

    async listReportsByStatus(status: string, ascending?: boolean, paginationToken?: string) {
        const response = await fetch(
            `${LIST_REPORTS_ENDPOINT}?paginationToken=${paginationToken}&status=${status}&ascending=${ascending}`
        );
        const json: IListReportResponse = await response.json();
        return json;
    }
}
