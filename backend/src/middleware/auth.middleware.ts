import { NextFunction, Response } from "express";
import * as UserService from "../services/user.service";
import { RequestI } from "../types/request";

export async function userAuth(req: RequestI, res: Response, next: NextFunction): Promise<void> {
	//try to get auth jwt from cookies and load user object into req
	try {
		const jwt = req.cookies["user"];
		const user = await UserService.getUserFromJwt(jwt);
		if (!user) throw "Unauthorized";
		req.user = user;
		return next();
	} catch (e) {
		//unauthorized
		return res.status(401).send(e + ", " +  req.url).end();
	}
}
