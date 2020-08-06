import { Component, OnInit } from '@angular/core';
import { CLIENTS } from '../shared/mock-client';
import { StorageService } from 'dist/utils';

interface closest {
  (arg0: string): any;
}

interface target {
  closest: closest;
}

interface event {
  target: target;
}
@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css'],
})
export class ListClientsComponent implements OnInit {
  clients = CLIENTS;
  constructor(private stg: StorageService) {}

  ngOnInit(): void {}

  public showClientDetails(event: event) {
    const parent = event.target.closest('.card');
    const child = parent.querySelectorAll('.content-client')[0];
    child.classList.toggle('show');
  }

  private allowEditClientDetails(event: event) {
    const parent = event.target.closest('.card');
    const child = parent.querySelectorAll('.content-client')[0];
    const fildSetEdit = child.getElementsByTagName('fieldset')[0];

    fildSetEdit.toggleAttribute('disabled');
  }

  public loadClients() {
    console.log(this.stg.get('clients'), 'llll');
    return this.stg.get('clients');
  }
}
