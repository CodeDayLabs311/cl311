import {
    HttpMethod,
    IApiErrorResponse,
    IReport,
    INTERNAL_SERVER_ERROR,
    METHOD_NOT_ALLOWED,
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
 *  - 405: when non-allowed method is used
 *  - 500: internal server error
 */

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IListReportResponse | IApiErrorResponse>
) {
    if (req.method !== HttpMethod.GET) {
        return res.status(405).send({ message: METHOD_NOT_ALLOWED });
    }

    try {
        const reportClient = new ReportDbClient();

        const { reports, paginationToken } = await reportClient.listReports();

        return res.status(200).json({ reports, paginationToken });
    } catch (err) {
        console.error(err);

        return res.status(500).send({ message: INTERNAL_SERVER_ERROR });
    }
}