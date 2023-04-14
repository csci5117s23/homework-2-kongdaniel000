import Head from 'next/head'
import Link from 'next/link'
import { useClerk } from "@clerk/clerk-react";

export default function ToDo() {
    const { signOut } = useClerk();
    return (
        <>
            <Head>
                <title>Todos</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div>
                    <p>Test</p>
                    <p>This page should be visible now</p>
                    {/* https://clerk.com/docs/authentication/sign-out */}
                    <button onClick={() => signOut()}>Sign out</button>
                </div>
            </main>
        </>
    )
}