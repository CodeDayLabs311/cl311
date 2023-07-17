import ReportCard from '@/components/report/ReportCard';
import Loading from '@/components/Loading';
import PageHeader from '@/components/PageHeader';
import { useReport } from '@/hooks';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

const BASE_PAGE_TITLE = 'Report';

/** View an existing report */
export default function ReportDetail() {
    const router = useRouter();
    const { report, isLoading } = useReport(router.query.id as string);

    const pageTitle = isLoading
        ? BASE_PAGE_TITLE
        : `${BASE_PAGE_TITLE} - Report for ${report?.reportCategory!}`;

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
                        {!isLoading && <ReportCard report={report!} />}
                    </Stack>
                </Container>
            </main>
        </>
    );
}
