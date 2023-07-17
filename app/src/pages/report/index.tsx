import ButtonLink from '@/components/ButtonLink';
import FilterByCategory from '@/components/report/FilterByCategory';
import ReportCard from '@/components/report/ReportCard';
import Loading from '@/components/Loading';
import PageHeader from '@/components/PageHeader';
import { useReports } from '@/hooks';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

/** List existing reports */
export default function ReportListing() {
    const [categoryFilter, setCategoryFilter] = useState<string>('');
    const { reports, isLoading, refreshReports } = useReports(categoryFilter);
    const isEmpty = useMemo<boolean>(
        () => !isLoading && reports?.length === 0,
        [isLoading, reports]
    );

    return (
        <>
            <Head>
                <title>Reports</title>
            </Head>
            <main>
                <Container>
                    <Stack gap={3}>
                        <PageHeader>Reports</PageHeader>

                        <Stack gap={1}>
                            <FilterByCategory
                                categoryFilter={categoryFilter}
                                setCategoryFilter={setCategoryFilter}
                                onSubmitFilter={refreshReports}
                            />
                            <ButtonLink
                                variant="outline-success"
                                href="/report/create"
                                size="sm"
                            >
                                Add report
                            </ButtonLink>
                        </Stack>

                        <Loading isLoading={isLoading}>Loading reports...</Loading>
                        {isEmpty && <p>No reports yet.</p>}
                        {!isLoading &&
                            reports!.map((report) => (
                                <ReportCard key={report.reportId} report={report} />
                            ))}
                    </Stack>
                </Container>
            </main>
        </>
    );
}
