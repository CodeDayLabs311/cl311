import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import PageHeader from '@/components/PageHeader';
import Container from 'react-bootstrap/Container';
import Loading from '@/components/Loading';
import Table from '../../components/report/Table';
import { useReports } from '@/hooks/report/useReports';

export default function ReportList() {
    const { reports, isLoading, loadReports, refreshReports } = useReports();
    const isEmpty = useMemo<boolean>(
        () => !isLoading && reports?.length === 0,
        [isLoading, reports]
    );
    return (
        <>
            <Head>
                <title>Report List</title>
            </Head>
            <main>
                <Container>
                    <PageHeader>Report List</PageHeader>
                    <Loading isLoading={isLoading}>Loading reports....</Loading>
                    {isEmpty && <p>No reports yet.</p>}
                    {!isLoading && <Table rows={reports!} />}
                </Container>
            </main>
        </>
    );
}
