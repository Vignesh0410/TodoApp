import jwt from "jsonwebtoken";

export class JwtService {
  private JWT_SECRET = process.env.JWT_SECRET || "default-secret";

  createToken(payload: Record<string, any>, expiresIn: string = "3m") {
    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: expiresIn,
      issuer: "Vignesh",
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.JWT_SECRET, { issuer: "Vignesh" });
  }
}
