import bcryptjs from 'bcryptjs';
export class Password {
  static async toHash(password: string) {
    return bcryptjs.hash(password, 10);
  }

  static async compare(storePassword: string, suppliedPassword: string) {
    return bcryptjs.compare(suppliedPassword, storePassword);
  }
}
