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

/** NOTE: function to mock DB lisitng because I don't have access to create report page or permission to create new item in AWS
    TODO: will need to switch to real DB function eventually
*/
const mockListReportsFromDb = (): { reports: IReport[]; paginationToken: string | undefined } => {
    return {
        reports: [
            {
                reportId: 'report1',
                name: 'John Doe',
                emailAddress: 'john.doe@example.com',
                phoneNumber: '123-456-7890',
                reportCategory: 'Illegal Dumping',
                address: '123 Main St',
                gpsCoordinates: '12.34,56.78',
                issueDescription: 'Pls send help, it stinks',
                attachments: ['link to attachments'],
                email: true,
                sms: false,
                statusOfReport: 'Submitted',
                dateTimeOfSubmission: '07/01/2023',
            },

            {
                reportId: 'report2',
                name: 'Jane Doe',
                emailAddress: 'jane.doe@example.com',
                phoneNumber: '206-xxx-xxx',
                reportCategory: 'Clogged Drain',
                address: '456 Main St',
                gpsCoordinates: '21.34,56.60',
                issueDescription: 'Help pls, the street is flooded...',
                attachments: ['image'],
                email: true,
                sms: false,
                statusOfReport: 'In Progress',
                dateTimeOfSubmission: '06/20/2023',
            },
            {
                reportId: 'report3',
                name: '',
                emailAddress: '',
                phoneNumber: '',
                reportCategory: 'Other',
                address: '789 Main St',
                gpsCoordinates: '21.34,56.60',
                issueDescription: 'I trashed and flooded the street >:)',
                attachments: ['image'],
                email: true,
                sms: false,
                statusOfReport: 'Done',
                dateTimeOfSubmission: '06/30/2023',
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
        return res.status(405).send({ report: METHOD_NOT_ALLOWED });
    }

    try {
        /** Uncomment these lines to switch to the real DB */
        const reportClient = new ReportDbClient();

        const { reports, paginationToken } = await reportClient.listReports();

        // const { reports, paginationToken } = mockListReportsFromDb();
        return res.status(200).json({ reports, paginationToken });
    } catch (err) {
        console.error(err);

        return res.status(500).send({ report: INTERNAL_SERVER_ERROR });
    }
}
