import {
    BAD_REQUEST,
    HttpMethod,
    IApiErrorResponse,
    IReport,
    INTERNAL_SERVER_ERROR,
    METHOD_NOT_ALLOWED,
    MISSING_REQUEST_BODY,
} from '@/models';
import { ReportDbClient, isUndefined } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface ICreateReportResponse {
    report: IReport;
}

/**
 * Create new report
 *
 * Allowed methods: POST
 *
 * Parameters:
 *  - body: IReport, new report to pUT
 *
 * Response: IGetReportResponse
 *
 * Potential errors:
 *  - 200: when report is successfully created
 *  - 400: when body is invalid or not provided
 *  - 405: when non-allowed method is used
 *  - 500: internal server error
 */

async function validateRequestBody(body: any): Promise<IReport> {
    if (!body || typeof body !== 'object') {
        throw new Error(MISSING_REQUEST_BODY);
    }

    return body as IReport;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ICreateReportResponse | IApiErrorResponse>
) {
    try {
        switch (req.method) {
            case HttpMethod.POST:
                const params = await validateRequestBody(req.body);
                const reportClient = new ReportDbClient();
                const isValidRequest = isUndefined(params.reportId);

                if (!isValidRequest) {
                    // Don't store bad data in the database!
                    return res.status(400).json({ message: BAD_REQUEST });
                }

                const report = await reportClient.createReport(params);

                if (isUndefined(report)) {
                    // Report was successfully created but could not be found
                    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
                }

                return res.status(200).json({ report: report! });

            default:
                return res.status(405).json({ message: METHOD_NOT_ALLOWED });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
    }
}
