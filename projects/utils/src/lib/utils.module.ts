import { NgModule } from '@angular/core';
import { UtilsComponent } from './utils.component';
import { StorageService } from './services/storage.service';
@NgModule({
  declarations: [UtilsComponent],
  imports: [],
  exports: [UtilsComponent],
  providers: [StorageService],
})
export class UtilsModule {}
