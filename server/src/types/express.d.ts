import { JwtPayload } from "../services/auth.service";

declare global {
  namespace Express {
    interface Request {
      tokenProperties?: JwtPayload;
    }
  }
}
