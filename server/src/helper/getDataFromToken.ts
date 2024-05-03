import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export const getDataFromToken = async (req: Request) => {
    try {
        const token = req.cookies.get("token")?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error: any) {
        console.log(`error in get Data From Token`)
        console.log(error)
        throw new Error(error.message);
    }
}