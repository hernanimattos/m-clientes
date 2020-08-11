import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StorageService } from 'utils-clientes';

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
  constructor(private fb: FormBuilder, private stg: StorageService) {}

  ngOnInit(): void {}

  public loadClients() {
    return this.stg.get('clients');
  }
}
