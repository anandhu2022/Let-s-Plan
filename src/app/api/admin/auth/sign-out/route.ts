import {NextResponse} from 'next/server';
import {serialize} from "cookie";

export async function GET() {
    const cookie = serialize("adminSession", "", {
        path: '/',
        httpOnly: true,
        expires: new Date(0)
    })
    return new NextResponse(JSON.stringify({
        status: true,
        message: "Cookie expired",
        user: null
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': cookie
        }
    })
}
