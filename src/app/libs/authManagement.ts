import {createHmac, randomBytes} from "node:crypto";
import {NextRequest} from "next/server";
import {cookies} from "next/headers";

export const getSessionId: () => string = () => {
    return randomBytes(32).toString("hex");
}

export const getHashedSessionId = (sessionId: string) => {
    if (process.env.SESSION_SECRET) {
        const SECRET_KEY: string = process.env.SESSION_SECRET;
        return createHmac("sha256", SECRET_KEY)
            .update(sessionId)
            .digest("hex");
    }
    return sessionId;

}

export const getIpAddress = (req: NextRequest) => {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "Unknown IP";
    return ip.startsWith("::ffff:") ? ip.substring(7) : ip
}

export const getCookieValue = async (cookie: string) => {
    const cookieStore = await cookies();
    return cookieStore.get(cookie)?.value;
}