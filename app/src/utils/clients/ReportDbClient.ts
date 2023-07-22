
    return {
        reportId: report?.ReportID?.S!,
        name: report?.Name?.S!,
        emailAddress: report?.EmailAddress?.S!,
        phoneNumber: report?.PhoneNumber?.S!,
        reportCategory: report?.ReportCategory?.SS!,
        address: report?.Address?.S!,
        gpsCoordinates: report?.GpsCoordinates?.S!,
        issueDescription: report?.IssueDescription?.S!,
        attachments: report?.Attachments?.S!,
        email: report?.Email?.BOOL!,
        sms: report?.Sms?.BOOL!,
        statusOfReport: report?.StatusOfReport?.S!,
        dateTimeOfSubmission: report?.DateTimeOfSubmission?.S!,
    };
}