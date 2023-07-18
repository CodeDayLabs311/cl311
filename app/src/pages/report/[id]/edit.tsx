import ReportEdit from '@/components/report/ReportEdit';
import Loading from '@/components/Loading';
import PageHeader from '@/components/PageHeader';
import { useReport } from '@/hooks';
import { IReport } from '@/models';
import { isUndefined } from '@/utils';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

const BASE_PAGE_TITLE = 'Edit Report';

/** Edit an existing report */
export default function ReportReportEdit() {
    const router = useRouter();
    const {
        report,
        isLoading: isReportLoading,
        updateReport,
        isSubmitting,
    } = useReport(router.query.id as string);
    const detailsHref = `/report/${report?.reportId}`;

    const [draftReport, setDraftReport] = useState<IReport>();
    const isLoading = isReportLoading || isUndefined(draftReport);

    // `report` is the unaltered report originally fetched from the API
    // `draftReport` is the report object being modified by the user
    // When `report` loads for the first time, store it in `draftReport`
    useEffect(() => {
        if (!isUndefined(report) && isUndefined(draftReport)) {
            setDraftReport(report);
        }
    }, [report, draftReport]);

    const pageTitle = isLoading
        ? BASE_PAGE_TITLE
        : `${BASE_PAGE_TITLE} - Report From ${report?.name!}`;

    const handleSubmit = async () => {
        if (!isUndefined(draftReport)) {
            await updateReport(draftReport!);
            router.push(detailsHref);
        }
    };

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <main>
                <Container>
                    <Stack gap={3}>
                        <PageHeader>{pageTitle}</PageHeader>
                        <Loading isLoading={isLoading}>Loading report...</Loading>
                        {!isLoading && (
                            <ReportEdit
                                report={draftReport!}
                                setReport={setDraftReport}
                                submitLabel="Save"
                                isSubmitLoading={isSubmitting}
                                onSubmit={handleSubmit}
                                cancelHref={detailsHref}
                            />
                        )}
                    </Stack>
                </Container>
            </main>
        </>
    );
}
