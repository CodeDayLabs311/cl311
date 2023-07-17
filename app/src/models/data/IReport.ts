/** Report (application model) */
export interface IReport {
    /** Unique report ID */
    reportId: string;
    name: string;
    emailAddress: string;
    phoneNumber: string;
    reportCategory: string;
    address: string;
    gpsCoordinates: string;
    issueDescription: string;
    attachments: string;
    email: string;
    sms: string;
    statusOfReport: string;
    dateTimeOfSubmission: string;
}

/** Report (DynamoDB model) */
export interface IDBReport {
    /** Unique report ID */
    ReportID: { S: string };
    Name: { S: string };
    EmailAddress: { S: string };
    PhoneNumber: { S: string };
    ReportCategory: { S: string };
    Address: { S: string };
    GpsCoordinates: { S: string };
    IssueDescription: { S: string };
    Attachments: { S: string };
    Email: { S: string };
    Sms: { S: string };
    StatusOfReport: { S: string };
    DateTimeOfSubmission: { S: string };
}
