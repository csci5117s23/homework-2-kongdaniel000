import Head from 'next/head'
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';

export default function ToDo({ Component, pageProps }) {
    const router = useRouter();
    const { userId } = useAuth();
    if(!userId) {
        router.push({pathname:"/"});
        return null;
    }
    return (
        <>
            <Head>
                <title>Done</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div>
                    <p>Test</p>
                    <p>This page should be visible now</p>
                </div>
            </main>
        </>
    )
}