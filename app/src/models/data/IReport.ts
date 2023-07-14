/** Report (application model) */
export interface IReport {
    /** Unique report ID */
    reportId: string;
    contactInformation: {
        name: string;
        emailAddress?: string;
        phoneNumber?: string;
    };
    reportCategory: string[];
    issueLocation: {
        address?: string;
        gpsCoordinates?: string;
    };
    issueDescription: string;
    attachments: string[];
    statusUpdates: {
        email: boolean;
        sms: boolean;
    };
    statusOfReport: string;
    dateTimeOfSubmission: string;
}

/** Report (DynamoDB model) */
export interface IDBReport {
    /** Unique report ID */
    ReportID: { S: string };
    ContactInformation: {
        Name: { S: string };
        EmailAddress?: { S: string };
        PhoneNumber?: { S: string };
    };
    ReportCategory: { SS: string[] };
    IssueLocation: {
        Address?: { S: string };
        GpsCoordinates?: { S: string };
    };
    IssueDescription: { S: string };
    Attachments: { SS: string[] };
    StatusUpdates: {
        Email: { BOOL: boolean };
        Sms: { BOOL: boolean };
    };
    StatusOfReport: { S: string };
    DateTimeOfSubmission: { S: string };
}
