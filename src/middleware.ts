import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(req: NextRequest) {
    const {pathname} = req.nextUrl;

    if (pathname.startsWith('/admin')) {
        const sessionToken = req.cookies.get('adminSession')?.value;
        if (!sessionToken) {
            return NextResponse.redirect(new URL('/admin/sign-in', req.url));
        }
        return NextResponse.next();
    }
    else if (pathname.startsWith('/user')) {
        const sessionToken = req.cookies.get('session')?.value;
        if (!sessionToken) {
            return NextResponse.redirect(new URL('/user/sign-in', req.url));
        }
    }

    if (pathname === '/') {
        return NextResponse.redirect(new URL('/user', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/user', '/user/tasks', '/user/add-task', '/user/summary', "/admin"],
};
