import {
    BAD_REQUEST,
    HttpMethod,
    IApiErrorResponse,
    IReport,
    INTERNAL_SERVER_ERROR,
    METHOD_NOT_ALLOWED,
} from '@/models';
import { ReportDbClient, isUndefined } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface IListReportsByCategoryResponse {
    /** Reports by the category */
    reports: IReport[];
    /** Pagination token */
    paginationToken: string | undefined;
}

/**
 * List reports by category
 *
 * Allowed methods: GET
 *
 * Parameters:
 *  - category: string, category filter value
 *
 * Response: IListReportsByCategoryResponse
 *
 * Potential errors:
 *  - 400: when category parameter is invalid or not provided
 *  - 405: when non-allowed method is used
 *  - 500: internal server error
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IListReportsByCategoryResponse | IApiErrorResponse>
) {
    if (req.method !== HttpMethod.GET) {
        return res.status(405).send({ report: METHOD_NOT_ALLOWED });
    }

    const { category } = req.query;

    if (isUndefined(category) || typeof category !== 'string') {
        // Do not perform search when category is invalid or not provided
        return res.status(400).send({ report: BAD_REQUEST });
    }

    try {
        const reportClient = new ReportDbClient();

        const { reports, paginationToken } = await reportClient.listReportsByCategory(
            category as string
        );

        return res.status(200).json({ reports, paginationToken });
    } catch (err) {
        console.error(err);

        return res.status(500).send({ report: INTERNAL_SERVER_ERROR });
    }
}
