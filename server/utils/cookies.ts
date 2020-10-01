import { serialize, parse } from 'cookie';

const TOKEN_NAME = 'token';
const MAX_AGE = 60 * 60 * 3; // 3 hours

export class Cookies {
  static async setCookie(userJwt: any, res: any) {
    const cookie = serialize(TOKEN_NAME, userJwt, {
      maxAge: MAX_AGE,
      expires: new Date(Date.now() + MAX_AGE * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    });

    res.setHeader('Set-Cookie', cookie);
  }
  static async removeTokenCookie(res: any) {
    const cookie = serialize(TOKEN_NAME, '', {
      maxAge: -1,
      path: '/',
    });

    res.setHeader('Set-Cookie', cookie);
  }
}
