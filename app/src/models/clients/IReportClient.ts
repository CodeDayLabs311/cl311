//import Report model
import { IReport } from '../data';

/* Interface for all API calls of ReportClient */
export interface IReportClient {
    /* List all reports */
    listReports(paginationToken?: string): Promise<{
        reports: IReport[];
        paginationToken: string | undefined;
    }>;

    /** Filter by status, etc.*/
    listReportsByStatus(
        status: string,
        ascending?: boolean,
        paginationToken?: string
    ): Promise<{
        reports: IReport[];
        paginationToken: string | undefined;
    }>;
}
