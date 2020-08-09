import { NgModule } from '@angular/core';
import { UtilsComponent } from './utils.component';
import { StorageService } from './services/storage.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [UtilsComponent],
  imports: [HttpClientModule, BrowserModule],
  exports: [UtilsComponent],
  providers: [StorageService],
})
export class UtilsModule {}
