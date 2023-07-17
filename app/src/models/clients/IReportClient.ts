import { IReport } from '../data';

/** Interface for report clients */
export interface IReportClient {
    /** Create report */
    createReport(
        report: Omit<IReport, 'reportId'>
    ): Promise<IReport | undefined>;
    /** Get report */
    getReport(reportId: string): Promise<IReport | undefined>;
    /** List reports */
    listReports(paginationToken?: string): Promise<{
        reports: IReport[];
        paginationToken: string | undefined;
    }>;
    /** List reports by an category */
    listReportsByCategory(
        category: string,
        paginationToken?: string
    ): Promise<{
        reports: IReport[];
        paginationToken: string | undefined;
    }>;
    /** Put report */
    putReport(report: IReport): Promise<IReport | undefined>;
}
