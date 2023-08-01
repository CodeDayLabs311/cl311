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
 *  - 400: when body is invalid or not provided
 *  - 405: when non-allowed method is used
 *  - 500: internal server error
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ICreateReportResponse | IApiErrorResponse>
) {
    if (req.method !== HttpMethod.POST) {
        return res.status(405).send({ message: METHOD_NOT_ALLOWED });
    }

    try {
        const reportClient = new ReportDbClient();

        const params = req.body as IReport;
        const isValidRequest =
            isUndefined(params?.reportId); 

        if (!isValidRequest) {
            // Don't store bad data in the database!
            return res.status(400).send({ message: BAD_REQUEST });
        }
        
        const report = await reportClient.createReport(params);

        if (isUndefined(report)) {
            // Report was successfully created but could not be found
            return res.status(500).send({ message: INTERNAL_SERVER_ERROR });
        }

        return res.status(200).json({ report: report! });
    } catch (err) {
        console.error(err);

        return res.status(500).send({ message: INTERNAL_SERVER_ERROR });
    }
}
