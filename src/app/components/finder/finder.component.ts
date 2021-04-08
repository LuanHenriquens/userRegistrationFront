import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/User';
import { FinderService } from 'src/app/services/finder.service';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent implements OnInit {
  name: string = '';
  active: boolean = true;
  users: User[] = [];
  error: boolean = false;
  message: string = '';
  loading: boolean = false;
  public objModal: BsModalRef;

  constructor(
    private service: FinderService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.find();
  }

  find() {
    this.loading = true;
    this.service.getUser(this.name,this.active).then(c => {
      this.users = c;
      this.loading = false;
    })
    .catch(e => {
      this.error = true;
      this.message = e.error.mensagem;
      this.loading = false;
      setTimeout(() => { this.message = ''; this.error = false; }, 4000);
    });
  }

  remove(user: User) {
    this.loading = true;
    this.service.deleteUser(user).subscribe(() => {
      this.objModal.hide();
      this.find();
    });
  }

  openModal (template: TemplateRef<any>) {
    this.objModal = this.modalService.show(template);
  }
}
