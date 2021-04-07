import { UserPhone } from "../UserPhone"

export class UserInsertDto {
  name: string;
  personType: string;
  cpf: string;
  cnpj: string;
  rg: string;
  ie: string;
  active: boolean;
  phone: UserPhone[] = [];
}
