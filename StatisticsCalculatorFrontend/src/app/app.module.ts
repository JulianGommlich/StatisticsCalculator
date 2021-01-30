import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { View1Component } from './view1/view1.component';
import { View2AnzeigeStichprobenComponent } from './view2-anzeige-stichproben/view2-anzeige-stichproben.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopUpComponent } from './pop-up/pop-up.component';
import { PopUpInvalidComponent } from './pop-up-invalid/pop-up-invalid.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Stichprobe } from './stichprobe';

@NgModule({
  declarations: [
    AppComponent,
    View1Component,
    View2AnzeigeStichprobenComponent,
    HeaderComponent,
    PopUpComponent,
    PopUpInvalidComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
