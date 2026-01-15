import jwt from "jsonwebtoken";

const AUTH_SECRET = process.env.AUTH_SECRET || "fallback-secret-for-dev-replace-me";

export function generateMagicLink(clientId: string, email: string) {
    const token = jwt.sign(
        { clientId, email },
        AUTH_SECRET,
        { expiresIn: "30d" } // Long-lived for convenience, or shorter for security
    );

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return `${baseUrl}/portal/${clientId}?token=${token}`;
}

export function verifyMagicToken(token: string) {
    try {
        return jwt.verify(token, AUTH_SECRET) as { clientId: string; email: string };
    } catch (error) {
        return null;
    }
}
