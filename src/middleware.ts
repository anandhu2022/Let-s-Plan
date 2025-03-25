import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {cookies} from "next/headers";

export const middleware = async (req: NextRequest) => {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sessionId');
    if (!sessionId) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }
    const {pathname} = req.nextUrl;
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard', '/project/:pathname*'],
};
