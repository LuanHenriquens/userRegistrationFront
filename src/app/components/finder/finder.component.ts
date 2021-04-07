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
  public objModal: BsModalRef;

  constructor(
    private service: FinderService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.find();
  }

  find() {
    this.service.getUser(this.name,this.active).then(c => {
      this.users = c;
    })
    .catch(e => {
      this.error = true;
      this.message = e.error.mensagem;
      console.log('erro',e)
      setTimeout(() => { this.message = ''; this.error = false; }, 4000);
    });
  }

  remove(userId: number) {
    this.service.deleteUser(userId).then(() => {
      this.objModal.hide();
      this.find();
    });
  }

  openModal (template: TemplateRef<any>) {
    this.objModal = this.modalService.show(template);
  }
}
