import { Injectable } from '@angular/core';
import { Story } from './story.model';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

const XKCD_LIMIT: number = 2000;

@Injectable({
  providedIn: 'root'
})
export class StoriesService { 
  private stories: Story[] = [];

  constructor(private http: HttpClient) { }

  // XKCD has only one API method which returns only 1 post.
  // And I want to display specifically XKCD posts, 
  // so I'm generating posts' ids, and retrive them one by one.
  getStories(n: number = 5): Observable<any>  { // number of storie to retrieve
    n = n > 0 && n <= 10 ? n : 10; // limit to 10 stories

    let requests: Observable<Object>[] = [];
    for (let i = 0; i < n; i++) {
      const id = this.getRandomInt(1, XKCD_LIMIT)
      requests.push(
        this.http.get(this.generateXkcdUrl(id)).pipe(
          map( rawStory => {
            const story = {
              id: id,
              title: rawStory.title,
              description: rawStory.alt,
              imageUrl: rawStory.img,
              date: new Date(rawStory.year, rawStory.day, rawStory.month)
            };

            this.stories.push(story);

            return story;
          })
        )

      );
    }

    return forkJoin(requests);
  }

  getStory(id: number): Observable<Story> {
    // Check if we have the story in cache
    const story: Story = this.stories.find(
      story => {
      return story.id === id; 
    });
    if (story) return Observable.create((observer) =>
      {
        observer.next(story);
        observer.complete();
      }
    );


    return this.http.get(this.generateXkcdUrl(id)).pipe(
      map( rawStory => {
        return {
          id: id,
          title: rawStory.title,
          description: rawStory.alt,
          imageUrl: rawStory.img,
          date: new Date(rawStory.year, rawStory.day, rawStory.month)
        }
      })
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