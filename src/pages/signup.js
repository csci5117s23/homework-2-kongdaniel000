import { SignUp } from "@clerk/nextjs";
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';

export default function SignUpPage() {
    const router = useRouter();
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    if(!userId) {
        return (
            <SignUp path="/signup" routing="path" signInUrl="/" redirectUrl="/todos"/>
        );
    }
    // redirect if logged in
    router.push({pathname:"/todos"});
    return null;
}