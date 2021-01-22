import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { View1Component } from './view1/view1.component';
import { View2AnzeigeStichprobenComponent } from './view2-anzeige-stichproben/view2-anzeige-stichproben.component';

@NgModule({
  declarations: [
    AppComponent,
    View1Component,
    View2AnzeigeStichprobenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
