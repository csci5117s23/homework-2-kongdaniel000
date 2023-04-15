import {useAuth} from "@clerk/clerk-react";

export default function CreateButton() {
    const {userId} = useAuth();
    const [API_ENDPOINT, API_KEY] = [process.env.NEXT_PUBLIC_API_ENDPOINT, process.env.COHO_SECRET_API_KEY];

    const createNew = async () => {
        const content = document.getElementById("body").value;
        if(content.length > 0) {
            const body = '{"userId": "' + userId + '", "body": "' + content + '"}';
            const response = await fetch(API_ENDPOINT, {
                "method" : "POST",
                "headers": {"x-apikey": API_KEY},
                "body": body
            });
        } else {
            window.alert("Please type something in the input box!");
        }
    }

    return(<>
        <input type="text" id="body" name="body" placeholder="New todo here"></input>
        <button onClick={() => createNew()}>Create new todo!</button>
    </>)
}