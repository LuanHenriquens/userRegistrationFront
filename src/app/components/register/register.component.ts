import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from 'src/app/models/dtos/UserDto';
import { UserInsertDto } from 'src/app/models/dtos/UserInsertDto';
import { User } from 'src/app/models/User';
import { UserPhone } from 'src/app/models/UserPhone';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  userPhone: UserPhone[] = [];
  userDto: UserDto = new UserDto();
  userPhoneMask: string[] = [];
  userInsertDto: UserInsertDto = new UserInsertDto();
  userId: number = 0;
  phone: string = '';
  message: string = '';
  success: boolean = false;
  error: boolean = false;
  isNew: boolean = true;
  loading: boolean = false;

  constructor(
    private service: RegisterService,
    private router: ActivatedRoute,
    private routerNavigate: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(data => {
      console.log(data);
    })
  }

  ngOnInit(): void {
    const par = this.activatedRoute.snapshot.paramMap.get('parametro');
    console.log(par);

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.loading = true;
        this.userId = Number(c.get('id'));

        this.service.getById(this.userId).then(c => {
          this.user = c.user;
          console.log('user', this.user)
          this.isNew = false;
          this.userPhone = c.phone;
          this.userPhone.forEach(u => {
            this.userPhoneMask.push(`(${u.phone.substr(0,2)}) ${u.phone.substr(2,5)}-${u.phone.substr(6,4)}`);
          });
          this.loading = false;
        });
      }
    })
  }

  save() {
    this.loading = true;
    if (this.user.personType == 'f' && this.validateCpf() == false)
    {
      this.error = true;
      this.message = 'Informe um CPF válido para continuar.';
      this.user.cpf = '';
      setTimeout(() => { this.message = ''; this.error = false; }, 4000);
      this.loading = false;
      return;
    }

    if (this.isNew) {
      this.userInsertDto = {
        name: this.user.name,
        personType: this.user.personType,
        cpf: this.user.cpf == undefined || this.user.cpf == null ? '' : this.user.cpf,
        cnpj: this.user.cnpj == undefined || this.user.cnpj == null ? '' : this.user.cnpj,
        rg: this.user.rg == undefined || this.user.rg == null ? '' : this.user.rg,
        ie: this.user.ie == undefined || this.user.ie == null ? '' : this.user.ie,
        active: this.user.active,
        phone: this.userPhone
      };
      this.service.postUser(this.userInsertDto).then(c => {
        this.success = true;
          this.message = "Registro incluido com sucesso !";
          this.routerNavigate.navigate([`finder`]);
          this.loading = false;
          setTimeout(() => { this.success = false; this.message = ''; }, 4000);
      })
      .catch(c => {
        this.error = true;
        this.message = c.error.mensagem;
        this.loading = false;
        setTimeout(() => { this.message = ''; this.error = false; }, 4000);
      });
    } else {
      this.userDto = {
        user: this.user,
        phone: this.userPhone
      };
      this.service.putUser(this.userDto).then(c => {
        this.success = true;
          this.message = "Registro atualizado com sucesso !";
          this.routerNavigate.navigate([`finder`]);
          this.loading = false;
          setTimeout(() => { this.success = false; this.message = ''; }, 4000);
      })
      .catch(c => {
        this.error = true;
        this.message = c.error.mensagem;
        this.loading = false;
        setTimeout(() => { this.message = ''; this.error = false; }, 4000);
      });
    }
  }

  addPhone() {
    let valid = true;
    console.log('this.phone',this.phone)
    console.log('this.userPhone',this.userPhone)
    if (this.phone === '') return;

    for (const phone of this.userPhone) {
      if (this.phone === phone.phone)
      {
        this.error = true;
        this.message = 'Telefone já adicionado';
        valid = false;
        setTimeout(() => { this.error = false; this.message = ''; }, 4000);
        break;
      }
    }
    if (valid)
    {
      if(this.user.id > 0) this.userPhone.push({ id: null, userId: this.user.id, phone: this.phone });
      else this.userPhone.push({ id: null, userId: null, phone: this.phone });
      this.userPhoneMask.push(`(${this.phone.substr(0,2)}) ${this.phone.substr(2,5)}-${this.phone.substr(6,4)}`);

      this.phone = '';
    }
  }

  removePhone(index: number) {
    this.loading = true;
    if (this.isNew) {
      this.userPhoneMask.splice(index, 1);
    } else {
      console.log(this.userPhone[index].id > 0, this.userPhone[index].id)
      if(this.userPhone[index].id > 0)
        this.service.deletePhone(this.userPhone[index]).then(() => { });
      this.userPhoneMask.splice(index, 1);
      this.userPhone.splice(index, 1);
    }
    this.loading = false;
  }

  validateCpf() {
    var Soma = 0;

    if (this.user.cpf === '00000000000' || this.user.cpf === '11111111111' || this.user.cpf === '22222222222' ||
    this.user.cpf === '33333333333' || this.user.cpf === '44444444444' || this.user.cpf === '55555555555' ||
    this.user.cpf === '66666666666' || this.user.cpf === '77777777777' || this.user.cpf === '88888888888' ||
    this.user.cpf === '99999999999' || this.user.cpf.length !== 11)
      return false;

    for (let i = 1; i <= 9; i++)
      Soma = Soma + parseInt(this.user.cpf.substring(i - 1, i)) * (11 - i);

    var Resto = (Soma * 10) % 11;
    if ((Resto === 10) || (Resto === 11))
      Resto = 0;

    if (Resto !== parseInt(this.user.cpf.substring(9, 10))) return false;

    Soma = 0;
    for (let k = 1; k <= 10; k++)
      Soma = Soma + parseInt(this.user.cpf.substring(k - 1, k)) * (12 - k)

    Resto = (Soma * 10) % 11;
    if ((Resto === 10) || (Resto === 11))
      Resto = 0;

    if (Resto !== parseInt(this.user.cpf.substring(10, 11))) return false;

    return true;
  }
}
