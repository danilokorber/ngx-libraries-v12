import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { NgxFlagsComponent } from './ngx-flags.component';

@NgModule({
  declarations: [NgxFlagsComponent],
  imports: [CommonModule],
  exports: [NgxFlagsComponent],
})
export class NgxFlagsModule {}
