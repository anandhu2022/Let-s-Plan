import {createHmac, randomBytes} from "node:crypto";

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