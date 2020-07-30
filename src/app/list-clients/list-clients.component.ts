import { Component, OnInit } from '@angular/core';
import { CLIENTS } from '../shared/mock-client';
@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css'],
})
export class ListClientsComponent implements OnInit {
  clients = CLIENTS;
  constructor() {}
  // @Input() childItem: string;
  ngOnInit(): void {}

  showClientDetails(event) {
    const parent = event.target.closest('.card');
    const child = parent.querySelectorAll('.content-client')[0];
    child.classList.toggle('show');
  }

  allowEditClientDetails(event) {
    const parent = event.target.closest('.card');
    const child = parent.querySelectorAll('.content-client')[0];
    const fildSetEdit = child.getElementsByTagName('fieldset')[0];

    fildSetEdit.toggleAttribute('disabled');
  }
}
