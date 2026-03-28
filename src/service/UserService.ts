import { IUserAuth } from "../interface/UserAuth";
import { UserAuthRepo } from "../repository/UserAuthRepo";
import bcrypt from "bcrypt";
import { JwtService } from "./JwtService";

export class UserService {
  private userAuthRepo = new UserAuthRepo();
  private jwtService = new JwtService();

  async login(userData: IUserAuth) {
    const user = await this.userAuthRepo.findUserByUserName(userData.userName);
    if (!user) throw new Error("Not Found");
    const passwordCheck = await bcrypt.compare(
      userData.password,
      user.password,
    );
    if (user.userName === userData.userName && passwordCheck) {
      return this.jwtService.createToken({ userId: user.id });
    }
    throw new Error("Invalid Credentials");
  }
  async signUp(userData: IUserAuth) {
    const user = await this.userAuthRepo.findUserByUserName(userData.userName);
    if (user) throw new Error("User Found");
    const password = await bcrypt.hash(userData.password, 10);
    const hashData: IUserAuth = {
      ...userData,
      password,
    };
    const result = await this.userAuthRepo.createUser(hashData);
    return this.jwtService.createToken({ userId: result.id });
  }
}
