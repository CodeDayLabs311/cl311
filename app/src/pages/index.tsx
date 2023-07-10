import PageHeader from '@/components/PageHeader';
import Head from 'next/head';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Home() {
    return (
        <>
            <Head>
                <title>CL311</title>
            </Head>
            <main>
                <Container>
                    <Stack gap={3}>
                        <PageHeader>CL311 Home Page</PageHeader>
                        <p>Welcome to CodeDay Labs 311!</p>
                        <DeleteIcon/><DeleteIcon color="primary" /><DeleteIcon color="secondary" /><DeleteIcon color="success" /><DeleteIcon color="action" /><DeleteIcon color="disabled" />
                        <p>
                            While we get set up, take a look at our{' '}
                            <Link href="/guestbook">guestbook</Link>.
                        </p>
                    </Stack>
                </Container>
            </main>
        </>
    );
}
