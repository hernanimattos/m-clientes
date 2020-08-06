import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { NewClientComponent } from './new-client/new-client.component';
import { TextMaskModule } from 'angular2-text-mask';
import { InputValidateComponent } from './shared/validations/input-validate/input-validate.component';

import { UtilsModule, StorageService } from 'dist/utils';

console.log(UtilsModule);
@NgModule({
  declarations: [
    AppComponent,
    ListClientsComponent,
    NewClientComponent,
    InputValidateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    UtilsModule,
  ],
  providers: [StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
