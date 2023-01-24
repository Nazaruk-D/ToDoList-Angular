import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NotifyComponent } from './components/notify/notify.component';


@NgModule({
  declarations: [
    NotifyComponent
  ],
  exports: [
    NotifyComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
