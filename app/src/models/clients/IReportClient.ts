import { IReport } from '../data';

/** Interface for report clients */
export interface IReportClient {
    /** Create report */
    createReport(report: Omit<IReport, 'reportId'>): Promise<IReport | undefined>;
    /** Get report */
    getReport(reportId: string): Promise<IReport | undefined>;

    /* List all reports */
    listReports(paginationToken?: string): Promise<{
        messages: IReport[];
        paginationToken: string | undefined;
    }>;

    /** Sort reports alphabetically or by date */

    /** Filter by status, etc.*/
}
