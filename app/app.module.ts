import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { EmployeelistComponent } from './home_emp/employeelist/employeelist.component';
import { AddempdetailsComponent } from './home_emp/addempdetails/addempdetails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeadersComponent } from './headers/headers.component';
import { HighlightDirective } from './highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    EmployeelistComponent,
    AddempdetailsComponent,
    HeadersComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
