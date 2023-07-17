//import Report model
import { IReport } from '../data';

/* Interface for all API calls of ReportClient */
export interface IReportClient {
    /* List all reports */
    listReports(paginationToken?: string): Promise<{
        messages: IReport[];
        paginationToken: string | undefined;
    }>;

    /** Sort reports alphabetically or by date */

    /** Filter by status, etc.*/
}
