import Head from 'next/head';
import styles from '@/styles/Home.module.css';

export default function Home() {
    return (
        <>
            <Head>
                <title>CL311</title>
            </Head>
            <main className={`${styles.main}`}>
                Hello! <a href="/guestbook">Guestbook</a>
            </main>
        </>
    );
}
