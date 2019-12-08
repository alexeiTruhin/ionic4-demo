import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'app',
    component: MenuPage,
    children: [
      {
        path: 'stories',
        loadChildren: () => import('../stories/stories.module').then( m => m.StoriesPageModule)
      },
      {
        path: 'story/:storyId',
        loadChildren: () => import('../stories/story-detail/story-detail.module').then( m => m.StoryDetailPageModule)
      }

    ]
  },
  { 
    path: '', 
    redirectTo: 'app/stories'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
