import { UserModel } from "./../models/User";
import { NavigationGuardNext } from "vue-router";
import { MoralisObject } from "../config/moralis";
import { userModule } from "../store/user";

const CheckLogin = async () => {
  const user: UserModel = await MoralisObject.User.current();
  if (!user) throw new Error("Unauthorized");
  userModule.SET_USER(user);
};

export default class RouterGuard {
  static async App(
    _: unknown,
    __: unknown,
    next: NavigationGuardNext
  ): Promise<void> {
    try {
      await CheckLogin();
      next();
    } catch (error) {
      next("/login");
    }
  }

  static async Login(
    _: unknown,
    __: unknown,
    next: NavigationGuardNext
  ): Promise<void> {
    try {
      await CheckLogin();
      next("/");
    } catch (error) {
      next();
    }
  }
}
