import Head from 'next/head';
import Link from 'next/link.js';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

export default function TodoFull() {
    const router = useRouter();
    const id = router.query.id;
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [API_ENDPOINT] = [process.env.NEXT_PUBLIC_API_ENDPOINT];

    useEffect(() => {
        async function fetchData(){
            let feedUrl = API_ENDPOINT + "?_id=" + id;
            const response = await fetch(feedUrl, {
                "method" : "GET",
                "headers": {"x-apikey": "a81974f6-0e9b-41b1-938a-fcdefd2fa577"}
            });
            const data = await response.json();
            setContent(data[0]["body"]);
            setLoading(false);
        };

        fetchData();
    }, [loading]);

    return (<>
        <Head>
            <title>{content}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <p>{content}</p>
        <Link href="/todos">Click here to go back!</Link>
    </>)
}