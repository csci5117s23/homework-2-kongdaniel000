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
            let doneConvert = "No";
            const element = document.getElementById("done")
            if(data[0]["done"]) {
                doneConvert = "Yes";
                element.className = 'yes';
            }
            element.innerText = doneConvert;
            setLoading(false);
        };

        fetchData();
    }, [loading]);

    const modifyContent = async () => {
        const content = document.getElementById("body").value;
        if(content.length > 0) {
            const body = ('{"body":"' + content + '"}').replaceAll("\n", "\\n");;
            let modUrl = API_ENDPOINT + id;
            const response = await fetch(modUrl, {
                "method" : "PATCH",
                "headers": {
                    "Content-Type": "application/json",
                    "x-apikey": "a81974f6-0e9b-41b1-938a-fcdefd2fa577",
                },
                "body": body,
            });
            document.getElementById("change").innerText = "Changes saved!";
        } else {
            window.alert("Please type something in the input box!");
        }
    }

    const modifyDone = async () => {
        const done = document.getElementById("done").innerText;
        let returnDone = false;
        if(done === "Yes") {
            returnDone = true;
        }
        const body = '{"done":' + returnDone + '}';
        let modUrl = API_ENDPOINT + id;
        const response = await fetch(modUrl, {
            "method" : "PATCH",
            "headers": {
                "Content-Type": "application/json",
                "x-apikey": "a81974f6-0e9b-41b1-938a-fcdefd2fa577",
            },
            "body": body,
        });
    }

    return (<>
        <Head>
            <title>{content}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <h1>Modify the task by clicking and typing in the box!</h1>
            <textarea id="body" defaultValue={content}></textarea><br></br><br></br>
            <button className='yes' id="change" onClick={() => modifyContent()}>Save changes</button>
            <p>Is this task done? <button className='no' id="done" onClick={() => {
                const element = document.getElementById("done");
                if(element.innerText === "Yes") {
                    element.innerText = "No";
                    element.className ='no'
                }
                else{
                    element.innerText = "Yes";
                    element.className ='yes'
                }
                modifyDone();
            }}>No</button></p>
            <Link href="/todos">Click here to go back!</Link>
        </main>
    </>)
}