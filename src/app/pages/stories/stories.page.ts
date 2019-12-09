import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Story } from './story.model';
import { StoriesService } from './stories.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.page.html',
  styleUrls: ['./stories.page.scss'],
})
export class StoriesPage implements OnInit {
  stories: Story[];

  constructor(
    private storiesService: StoriesService,
    public loadingController: LoadingController
  ) {
    
  }

  ngOnInit() {
    this.showLoader();
    this.storiesService.getStories().subscribe( 
      stories => {
        this.stories = stories;
      },
      err => {
        // TODO
      },
      () => {
        this.hideLoader();
      }
    );
  }

  loadData(event) {
    this.storiesService.getStories().subscribe( stories => {
      this.stories.push(...stories);
      event.target.complete();

      // Disable if too many stories
      // if (this.stories.length === 30) {
      //   event.target.disabled = true;
      // }
    });
  }


  showLoader() {
    this.loadingController.create({
      message: 'Loading content...'
    }).then((res) => {
      res.present();
    });
  }

  hideLoader() {
    this.loadingController.dismiss();
  }

}
