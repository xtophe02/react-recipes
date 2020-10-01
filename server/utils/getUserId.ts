import jwt from 'jsonwebtoken';

interface UserJwtPayload {
  id: string;
  email: string;
}
export const getUserId = (req: any) => {
  try {
    if (req.headers.cookie) {
      const payload = jwt.verify(
        req.headers.cookie.split('=')[1],
        process.env.JWT_SECRET!
      ) as UserJwtPayload;

      return { ...payload };
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};
