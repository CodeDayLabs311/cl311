import React from 'react';
import Head from 'next/head';
import PageHeader from '@/components/PageHeader';
import Container from 'react-bootstrap/Container';
import Loading from '@/components/Loading';
import Table from '../../components/report/Table';
export default function ReportList() {
    return (
        <>
            <Head>
                <title>Report List</title>
            </Head>
            <main>
                <Container>
                    <PageHeader>Report List</PageHeader>
                    {/* <Loading isLoading={isLoading}>Loading reports....</Loading>
                    {isEmpty && <p>No reports yet.</p>} */}
                    <Table />
                </Container>
            </main>
        </>
    );
}
