import Head from 'next/head';
import Link from 'next/link.js';
import {useAuth, useClerk} from "@clerk/clerk-react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ToDo() {
    const {signOut} = useClerk();
    const {userId} = useAuth();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [API_ENDPOINT, API_KEY] = [process.env.NEXT_PUBLIC_API_ENDPOINT, process.env.COHO_SECRET_API_KEY];

    useEffect(() => {
        async function fetchData(){
            let feedUrl = API_ENDPOINT + "?userId=" + userId;
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

    const createNew = async () => {
        const content = document.getElementById("body").value;
        if(content.length > 0) {
            const body = '{"userId":"' + userId + '","body": "' + content + '"}';
            console.log(body);
            const response = await fetch(API_ENDPOINT, {
                "method" : "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "x-apikey": "a81974f6-0e9b-41b1-938a-fcdefd2fa577",
                },
                "body": body,
            });
            setLoading(true);
        } else {
            window.alert("Please type something in the input box!");
        }
    }
    
    return (<>
        <Head>
            <title>Todos</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <h1>These are items that still need to be done!</h1>
            <h2>Click on the items to see their full text and modify them!</h2>
            <div>
                <ul>
                    {Object.values(posts).map(value => {
                        const id = value._id
                        if(!value.done) {
                            return <li key = {id}><Link href={"/todo/" + id}>{value.body.slice(0,30)}</Link></li>
                        }
                    })}
                </ul>
                <input type="text" id="body" name="body" placeholder="New todo here"></input>
                <button onClick={() => createNew()}>Create new todo!</button><br></br><br></br>
                {/* https://clerk.com/docs/authentication/sign-out */}
                <Link href="/done">Click here to go to see all finished items!</Link><br></br><br></br>
                <button className="signout" onClick={() => {
                    router.push({pathname:"/todos"}); 
                    signOut()}}>Sign out</button>
            </div>
        </main>
    </>)
}