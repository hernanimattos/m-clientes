import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { NewClientComponent } from './new-client/new-client.component';

@NgModule({
  declarations: [
    AppComponent,
    ListClientsComponent,
    NewClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
