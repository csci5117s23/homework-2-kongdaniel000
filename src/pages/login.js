import { SignIn } from "@clerk/nextjs";
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';

export default function SignUpPage() {
    const router = useRouter();
    const {userId} = useAuth();

    if(!userId) {
        return (
            <SignIn routing="path" path="/" redirectUrl="/todos"/>
        );
    }
    // redirect if logged in
    router.push({pathname:"/todos"});
    return null;
}