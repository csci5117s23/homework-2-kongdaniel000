import Head from 'next/head';
import Link from 'next/link.js';
import {useAuth, useClerk} from "@clerk/clerk-react";
import { useEffect, useState } from 'react';

export default function ToDo() {
    const {signOut} = useClerk();
    const {userId} = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [API_ENDPOINT, API_KEY] = [process.env.NEXT_PUBLIC_API_ENDPOINT, process.env.COHO_SECRET_API_KEY];

    useEffect(() => {
        async function fetchData(){
            let feedUrl = API_ENDPOINT + "?userId=" + userId + "&done=true";
            const response = await fetch(feedUrl, {
                "method" : "GET",
                "headers": {"x-apikey": "a81974f6-0e9b-41b1-938a-fcdefd2fa577"}
            });
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        };

        fetchData();
    }, [loading]);
    
    return (<>
        <Head>
            <title>Todos</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <h1>These are items that are finished!</h1>
            <div>
                <ul>
                    {Object.values(posts).map(value => {
                        const id = value._id
                        if(value.done) {
                            return <li key = {id}><Link href={"/todo/" + id}>{"✓"+value.body.slice(0,30)}</Link></li>
                        }
                    })}
                </ul>
                <input type="text" id="body" name="body" placeholder="New todo here"></input><br></br><br></br>
                <Link href="/todos">Click here to go to see all unfinished items!</Link><br></br><br></br>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        </main>
    </>)
}