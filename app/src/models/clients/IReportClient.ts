import { IReport } from '../data';

/** Interface for report clients */
export interface IReportClient {
    /** Create report */
    createReport(report: Omit<IReport, 'reportId'>): Promise<IReport | undefined>;
    /** Get report */
    getReport(reportId: string): Promise<IReport | undefined>;
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
