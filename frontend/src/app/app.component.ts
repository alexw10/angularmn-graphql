import { Component, OnInit, Input } from '@angular/core';
import { Hero } from './hero.model';
import { HeroService } from './hero.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  searchTerm = '';
  heroes: Observable<Hero[]>;

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.heroes = this.heroService.getAllHeroes(this.searchTerm);
  }

  onKeyUp() {
    this.heroes = this.heroService.getAllHeroes(this.searchTerm);
  }

  upvote(id: string) {
    this.heroService.upvoteHero(id).subscribe(
      data => {
        console.log('Upvoted', data);
      },
      error => {
        console.log('Failed to upvote the hero', error);
      }
    );
  }

  downvote(id: string) {
    this.heroService.downvoteHero(id).subscribe(
      data => {
        console.log('Downvoted', data);
      },
      error => {
        console.log('Failed to upvote the hero', error);
      }
    );
  }
}
