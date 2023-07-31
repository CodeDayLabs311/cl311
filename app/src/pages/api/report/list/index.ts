import {
    HttpMethod,
    IApiErrorResponse,
    IReport,
    INTERNAL_SERVER_ERROR,
    METHOD_NOT_ALLOWED,
    INVALID_PAGINATION_TOKEN
} from '@/models';
import { ReportDbClient } from '@/utils/clients/ReportDbClient';
import type { NextApiRequest, NextApiResponse } from 'next';

/** Return a list of report and pagination token upon a LIST request */
export interface IListReportResponse {
    /** Reports */
    reports: IReport[];
    /** Pagination token */
    paginationToken: string | undefined;
}

/**
 * List Reports
 *
 * Allowed methods: GET
 *
 * Response: IListReportResponse
 *
 * Potential errors:
 *  - 200: when report is successfully listed
 *  - 400: invalid pagination token (if provided)
 *  - 405: when non-allowed method is used
 *  - 500: internal server error
 */

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IListReportResponse | IApiErrorResponse>
) {
    try {
        switch (req.method) {
            case HttpMethod.GET:
                const reportClient = new ReportDbClient();
                const { reports, paginationToken } = await reportClient.listReports();

                // Validate pagination token (if provided)
                const { paginationToken: providedToken } = req.query;
                if (providedToken && typeof providedToken !== 'string') {
                    return res.status(400).json({ message: INVALID_PAGINATION_TOKEN });
                }

                return res.status(200).json({ reports, paginationToken });

            default:
                return res.status(405).json({ message: METHOD_NOT_ALLOWED });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
    }
}