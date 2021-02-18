import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { View1Component } from "./view1/view1.component";
import { View2AnzeigeStichprobenComponent } from "./view2-anzeige-stichproben/view2-anzeige-stichproben.component";
import { PopUpComponent } from "./pop-up/pop-up.component";

const routes: Routes = [
  {
    path: 'calculator', component: View1Component, children: [
      { path: 'popup', component: PopUpComponent }
    ]
  },
  { path: 'results', component: View2AnzeigeStichprobenComponent },
  { path: '', redirectTo: '/calculator', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
