import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { Story } from '../story.model';
import { StoriesService } from '../stories.service';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.page.html',
  styleUrls: ['./story-detail.page.scss'],
})
export class StoryDetailPage implements OnInit {
  story: Story;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storiesService: StoriesService,
    ) {
      this.story = {};
    }

  ngOnInit() {
    this.storiesService.getStory(2000).subscribe( story => {
      this.story = story;
    });
  }

}
