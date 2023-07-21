import { IReport } from '../data';

/** Interface for report clients */
export interface IReportClient {
    /** Create report */
    createReport(
        report: Omit<IReport, 'reportId'>
    ): Promise<IReport | undefined>;
    /** Get report */
    getReport(reportId: string): Promise<IReport | undefined>;
    
}
