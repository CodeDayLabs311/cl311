import {
    HttpMethod,
    IApiErrorResponse,
    IReport,
    INTERNAL_SERVER_ERROR,
    METHOD_NOT_ALLOWED,
} from '@/models';
import { ReportDbClient } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface IListReportsResponse {
    /** Reports */
    reports: IReport[];
    /** Pagination token */
    paginationToken: string | undefined;
}

/**
 * List reports
 *
 * Allowed methods: GET
 *
 * Response: IListReportsResponse
 *
 * Potential errors:
 *  - 405: when non-allowed method is used
 *  - 500: internal server error
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IListReportsResponse | IApiErrorResponse>
) {
    if (req.method !== HttpMethod.GET) {
        return res.status(405).send({ report: METHOD_NOT_ALLOWED });
    }

    try {
        const reportClient = new ReportDbClient();

        const { reports, paginationToken } = await reportClient.listReports();

        return res.status(200).json({ reports, paginationToken });
    } catch (err) {
        console.error(err);

        return res.status(500).send({ report: INTERNAL_SERVER_ERROR });
    }
}
