import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export type JwtPayload = {
  mobileNo: string;
  role: string;
}


export const signToken = (reqBody:JwtPayload): string => {
  return jwt.sign({
    mobileNo:reqBody.mobileNo,
    role:reqBody.role

  }, env.JWT_SECRET as string, {
    expiresIn: env.JWT_EXPIRES_IN as any,
  });
};

export const isValidToken=(token:string):boolean=>{
  try{
    jwt.verify(token, env.JWT_SECRET as string);
    return true;
  }catch(error){
    return false;
  }
}

export const decodedToken=(token:string)=>{
  return jwt.decode(token) as JwtPayload
}
  
    
