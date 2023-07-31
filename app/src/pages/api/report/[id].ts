import {
    BAD_REQUEST,
    HttpMethod,
    IApiErrorResponse,
    IReport,
    INTERNAL_SERVER_ERROR,
    METHOD_NOT_ALLOWED,
    NOT_FOUND,
    MULTIPLE_IDS,
    MISSING_ID,
    MISSING_REQUEST_BODY,
    MISSING_REPORT_ID,
} from '@/models';
import { ReportDbClient, isUndefined } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface IGetReportResponse {
    report: IReport;
}

/**
 * Get or update existing report
 *
 * Allowed methods: GET, PUT
 *
 * Parameters:
 *  - id: string, report ID
 *  - body: IReport, new report to pUT
 *
 * Response: IGetReportResponse
 *
 * Potential errors:
 *  - 200: when report is successfully retrieved or updated
 *  - 400: when body is invalid or not provided
 *  - 404: when report does not exist
 *  - 405: when non-allowed method is used
 *  - 500: internal server error
 */

async function validateIdParam(id: string | string[] | undefined): Promise<string> {
    if (Array.isArray(id)) {
        throw new Error(MULTIPLE_IDS);
    }

    const idStr = id!.toString().trim();
    if (!idStr) {
        throw new Error(MISSING_ID);
    }

    return idStr;
}

async function validatePutRequestBody(body: any): Promise<IReport> {
    if (!body || typeof body !== 'object') {
        throw new Error(MISSING_REQUEST_BODY);
    }

    const params = body as IReport;

    if (!params.reportId || isUndefined(params.reportId)) {
        throw new Error(MISSING_REPORT_ID);
    }

    return params;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IGetReportResponse | IApiErrorResponse>
) {
    try {
        switch (req.method) {
            case HttpMethod.GET:
                const id = await validateIdParam(req.query.id);

                const reportClient = new ReportDbClient();
                const report = await reportClient.getReport(id);

                if (isUndefined(report)) {
                    return res.status(404).json({ message: NOT_FOUND });
                }

                return res.status(200).json({ report: report! });

            case HttpMethod.PUT:
                const idForPut = await validateIdParam(req.query.id);
                const body = await validatePutRequestBody(req.body);

                // Don't store bad data in the database!
                if (idForPut !== body.reportId) {
                    return res.status(400).json({ message: BAD_REQUEST });
                }

                const putReportClient = new ReportDbClient();
                const updatedReport = await putReportClient.putReport(body);

                if (isUndefined(updatedReport)) {
                    return res.status(404).json({ message: NOT_FOUND });
                }

                return res.status(200).json({ report: updatedReport! });

            default:
                return res.status(405).json({ message: METHOD_NOT_ALLOWED });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
    }
}
