import Head from 'next/head'

export default function ToDo({ Component, pageProps }) {
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
                </div>
            </main>
        </>
    )
}