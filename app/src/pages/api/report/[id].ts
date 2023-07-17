import {
    BAD_REQUEST,
    HttpMethod,
    IApiErrorResponse,
    IReport,
    INTERNAL_SERVER_ERROR,
    METHOD_NOT_ALLOWED,
    NOT_FOUND,
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
 *  - 400: when body is invalid or not provided
 *  - 404: when report does not exist
 *  - 405: when non-allowed method is used
 *  - 500: internal server error
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IGetReportResponse | IApiErrorResponse>
) {
    if (req.method !== HttpMethod.GET && req.method !== HttpMethod.PUT) {
        return res.status(405).send({ report: METHOD_NOT_ALLOWED });
    }

    const { id } = req.query;

    try {
        const reportClient = new ReportDbClient();

        if (req.method === HttpMethod.PUT) {
            // PUT request: store the payload in the database
            const params = req.body as IReport;
            const isValidRequest =
                id === params.reportId &&
                !isUndefined(params?.reportId) &&
                !isUndefined(params?.name) &&
                !isUndefined(params?.emailAddress) &&
                !isUndefined(params?.phoneNumber) &&
                !isUndefined(params?.reportCategory) &&
                !isUndefined(params?.address) &&
                !isUndefined(params?.gpsCoordinates) &&
                !isUndefined(params?.issueDescription) &&
                !isUndefined(params?.attachments) &&
                !isUndefined(params?.email) &&
                !isUndefined(params?.sms) &&
                !isUndefined(params?.statusOfReport) &&
                !isUndefined(params?.dateTimeOfSubmission);

            if (!isValidRequest) {
                // Don't store bad data in the database!
                return res.status(400).send({ report: BAD_REQUEST });
            }

            const report = await reportClient.putReport(params);

            if (isUndefined(report)) {
                return res.status(404).send({ report: NOT_FOUND });
            }

            return res.status(200).json({ report: report! });
        } else {
            const report = await reportClient.getReport(id as string);

            if (isUndefined(report)) {report
                return res.status(404).send({ report: NOT_FOUND });
            }

            return res.status(200).json({ report: report! });
        }
    } catch (err) {
        console.error(err);

        return res.status(500).send({ report: INTERNAL_SERVER_ERROR });
    }
}
