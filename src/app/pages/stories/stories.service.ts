import { Injectable } from '@angular/core';
import { Story } from './story.model';


@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  private stories: Story[] = [
    {
      id: 2238,
      title: 'Flu Shot',
      description: `"Wait, how often are you getting bitten by snakes? And why are you boiling water?" "Dunno, the CDC people keep showing up with complicated questions about the 'history of the property' and 'possible curses' but I kinda tune them out. At least one of them offered me the flu shot."`,
      imageUrl: 'https://imgs.xkcd.com/comics/flu_shot.png',
      date: new Date(2019, 12, 6)
    },
    {
      id: 2000,
      title: 'xkcd Phone 2000',
      description: `Our retina display features hundreds of pixels per inch in the central fovea region.`,
      imageUrl: 'https://imgs.xkcd.com/comics/xkcd_phone_2000.png',
      date: new Date(2018, 5, 30)
    },
  ]

  getStories(num: number = 5) { // TODO: number of storie to retrieve
    return [...this.stories];
  }
  
  constructor() { }
}