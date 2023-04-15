import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//https://beta-docs.clerk.com/quickstarts/nextjs/app-router

export default withClerkMiddleware((request) => {
    // if the user is not signed in redirect them to the sign in page.
    const { userId } = getAuth(request);
   
    if (!userId) {
      const signInUrl = new URL("/", request.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
});
 
export const config = {
  matcher: [
    "/todos/",
    "/todo/:path*",
    "/done"
  ],
}