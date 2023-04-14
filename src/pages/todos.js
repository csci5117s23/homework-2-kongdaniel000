import Head from 'next/head'
import Link from 'next/link'
import {useClerk} from "@clerk/clerk-react";
import {useState, useEffect} from 'react';

export default function ToDo() {
    const {signOut} = useClerk();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = awaitfetch("https://backend-s11j.api.codehooks.io/dev", {
                "method" : "GET",
                "headers": {"x-apikey": "a81974f6-0e9b-41b1-938a-fcdefd2fa577"}
            });
            const data = await response.json();
            setPosts(data);
            // setLoading(false);
        }
    }, []);
    
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
                    <p>{posts}</p>
                    {/* https://clerk.com/docs/authentication/sign-out */}
                    <button onClick={() => signOut()}>Sign out</button>
                </div>
            </main>
        </>
    )
}