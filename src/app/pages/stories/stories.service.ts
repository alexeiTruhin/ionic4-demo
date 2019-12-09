import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Story } from './story.model';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';

interface RawStory {
  id: number;
  title: string;
  alt: string;
  img: string;
  year: number;
  day: number;
  month: number;
  author_id: number;
}

const XKCD_LIMIT: number = 2000;
const USER_LIMIT: number = 10;

@Injectable({
  providedIn: 'root'
})
export class StoriesService { 
  private stories: Story[] = [];

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
  ) { }

  // XKCD has only one API method which returns only 1 post.
  // And I want to display specifically XKCD posts, 
  // so I'm generating posts' ids, and retrive them one by one.
  getStories(n: number = 5): Observable<any>  { // number of storie to retrieve
    n = n > 0 && n <= 10 ? n : 10; // limit to 10 stories

    let requests: Observable<Object>[] = [];
    for (let i = 0; i < n; i++) {
      const story_id = this.getRandomInt(1, XKCD_LIMIT);
      requests.push(
        this.requestStory(story_id)
      );
    }

    return forkJoin(requests);
  }

  getStory(story_id: number): Observable<Story> {
    // Check if we have the story in cache
    const story: Story = this.stories.find(
      story => {
      return story.id === story_id; 
    });
    if (story) return Observable.create((observer) =>
      {
        observer.next(story);
        observer.complete();
      }
    );


    return this.requestStory(story_id);
  }

  private requestStory(story_id: number) {
    return this.http.get(this.generateXkcdUrl(story_id)).pipe(
      mergeMap( (rawStory: RawStory) => {
        // The author_id should be provided by XKCD response,
        // as a part of rawStory object.
        // It doesn't exist so a random id is generated.
        rawStory.author_id = this.getRandomInt(1, USER_LIMIT);
        return this.usersService.getUser(rawStory.author_id).pipe(
          map( user =>
            {
              const story = {
                id: story_id,
                title: rawStory.title,
                description: rawStory.alt,
                imageUrl: rawStory.img,
                date: new Date(rawStory.year, rawStory.day, rawStory.month),
                author: user
              };

              this.stories.push(story);

              return story;
            }
          )
        )}
      )
    ) 
  }

  private generateXkcdUrl(id: number) {
    if (id > 0 && id <= XKCD_LIMIT) { 
      // There are only 2000+ xkcd posts
      return `https://xkcd.now.sh/?comic=${id}`;
    } else {
      // Get the url for the last post. Could also throw an error.
      return `https://xkcd.now.sh/?comic=latest`; 
    }
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}