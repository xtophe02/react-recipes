import jwt from 'jsonwebtoken';

export const getUser = (req: any) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      return jwt.verify(
        token!,
        process.env.JWT_SECRET!,
        (err: any, decoded: any): any => {
          if (err) console.log(err);
          return decoded;
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};
