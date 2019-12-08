import { Component, OnInit } from '@angular/core';

import { Story } from './story.model';
import { StoriesService } from './stories.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.page.html',
  styleUrls: ['./stories.page.scss'],
})
export class StoriesPage implements OnInit {
  stories: Story[];
  constructor(private storiesService: StoriesService) { }

  ngOnInit() {
    this.storiesService.getStories().subscribe( stories => {
      this.stories = stories;
    });
  }

}
