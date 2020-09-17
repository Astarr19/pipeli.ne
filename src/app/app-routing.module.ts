import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectModuleComponent } from './project-module/project-module.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';


const routes: Routes = [
  //We are not using routing
  //{ path: '', component: ProjectModuleComponent},
  //{ path: 'projects', component: ProjectDetailComponent}
  //{path: '**', component: 404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
