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
    this.activatedRoute.paramMap.subscribe(paramMap => {
      
      if (!paramMap.has('storyId')) {
        // redirect
        this.router.navigate(['/app/', 'stories']);
        return;
      }
      
      const storyId: number = +paramMap.get('storyId');
      console.log(storyId);
      this.storiesService.getStory(storyId).subscribe( story => {
        this.story = story;
      });
    })

  }

}
