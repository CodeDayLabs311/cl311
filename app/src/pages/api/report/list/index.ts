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

const mockListReportsFromDb = (): { reports: IReport[]; paginationToken: string | undefined } => {
    return {
        reports: [
            {
                reportId: 'report1',
                name: 'John Doe',
                emailAddress: 'john.doe@example.com',
                phoneNumber: '123-456-7890',
                reportCategory: ['category1'],
                address: '123 Main St',
                gpsCoordinates: '12.34,56.78',
                issueDescription: 'Description of the issue',
                attachments: 'link to attachments',
                email: true,
                sms: false,
                statusOfReport: 'Submited',
                dateTimeOfSubmission: '07/01/2023',
            },

            {
                reportId: 'report2',
                name: 'Jane Doe',
                emailAddress: 'Jane.doe@example.com',
                phoneNumber: '206-xxx-xxx',
                reportCategory: ['category2'],
                address: '456 Main St',
                gpsCoordinates: '21.34,56.60',
                issueDescription: 'Help pls',
                attachments: 'image',
                email: true,
                sms: false,
                statusOfReport: 'Pending',
                dateTimeOfSubmission: '06/20/2023',
            },
        ],
        paginationToken: undefined,
    };
};

// TODO: need to import ReportDbClient from Sophie
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
        // const reportClient = new ReportDbClient();

        // const { reports, paginationToken } = await reportClient.listReports();

        const { reports, paginationToken } = mockListReportsFromDb();
        return res.status(200).json({ reports, paginationToken });
    } catch (err) {
        console.error(err);

        return res.status(500).send({ message: INTERNAL_SERVER_ERROR });
    }
}
