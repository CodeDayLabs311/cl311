import ReportCardEdit from '@/components/report/ReportCardEdit';
import PageHeader from '@/components/PageHeader';
import { useReportClient } from '@/hooks';
import { IReport } from '@/models';
import { isUndefined } from '@/utils';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

type NewReport = Omit<IReport, 'reportId'>;

const getInitialReport = (): NewReport => ({
    name: '',
    emailAddress: '',
    phoneNumber: '',
    reportCategory: '',
    address: '',
    gpsCoordinates: '',
    issueDescription: '',
    attachments: '',
    email: false,
    sms: false,
    statusOfReport: '',
    dateTimeOfSubmission: '',
    dateTimeLastEdited: '',
});

/** Create a new report */
export default function ReportCreate() {
    const router = useRouter();
    const reportClient = useReportClient();

    const [draftReport, setDraftReport] = useState<NewReport>(getInitialReport());
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const createReport = async (newReport: NewReport): Promise<IReport> => {
        setIsSubmitting(true);
        const createdReport = await reportClient.createReport(newReport);
        setIsSubmitting(false);
        return createdReport!;
    };

    const handleSubmit = async () => {
        if (!isUndefined(draftReport)) {
            // Set the status of the report to 'Submitted' when the report is submitted
            draftReport!.statusOfReport = 'Submitted';
            // Set date and time of submission to current timestamp when the report is submitted
            draftReport!.dateTimeOfSubmission = new Date().toLocaleString('en-US'); 
            const createdReport = await createReport(draftReport!);
            router.push(`/report/${createdReport.reportId}`);
        }
    };

    return (
        <>
            <Head>
                <title>New Report</title>
            </Head>
            <main>
                <Container>
                    <Stack gap={3}>
                        <PageHeader>New Report</PageHeader>
                        <ReportCardEdit
                            report={draftReport!}
                            setReport={setDraftReport}
                            submitLabel="Create"
                            isSubmitLoading={false} // TODO: We need to support a good loading state here
                            onSubmit={handleSubmit}
                            cancelHref={'/report'}
                        />
                    </Stack>
                </Container>
            </main>
        </>
    );
}
