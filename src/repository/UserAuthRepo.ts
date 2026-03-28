import { IUserAuth } from "../interface/UserAuth";
import userModel from "../model/UserModal";

export class UserAuthRepo {
  async findUserByUserName(name: string) {
    return await userModel.findOne({ userName: name });
  }

  async createUser(userData: IUserAuth) {
    return await userModel.create(userData);
  }
}
