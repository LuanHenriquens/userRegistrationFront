import { User } from "../User";
import { UserPhone } from "../UserPhone";

export class UserDto {
  user: User;
  phone: UserPhone[];
}
