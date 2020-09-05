import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  BasicDemoComponent,
  NotfoundComponent,
  ReactiveFormDemoComponent,
  DynamicConfigDemoComponent,
  MaterialTabDemoComponent,
  InlineDemoComponent
} from './pages';

const routes: Routes = [
  { path: '', component: BasicDemoComponent },
  { path: 'form', component: ReactiveFormDemoComponent },
  { path: 'dynamic-config', component: DynamicConfigDemoComponent },
  { path: 'material-tab', component: MaterialTabDemoComponent },
  { path: 'inline', component: InlineDemoComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      errorHandler() {
        console.log('路由匹配失败！');
      }
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
