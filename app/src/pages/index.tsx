import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <Head>
                <title>CL311</title>
            </Head>
            <main className={`${styles.main}`}>
                Hello!
                <Link href="/guestbook">Guestbook</Link>
            </main>
        </>
    );
}
