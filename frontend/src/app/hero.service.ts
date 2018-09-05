import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Query, Hero } from './hero.model';
import gql from 'graphql-tag';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private apollo: Apollo) {}

  getAllHeroes(searchTerm: string) {
    return this.apollo
      .watchQuery<Query>({
        pollInterval: 500,
        query: gql`
          query allHeroes($searchTerm: String) {
            allHeroes(searchTerm: $searchTerm) {
              id
              name
              voteCount
            }
          }
        `,
        variables: {
          searchTerm: searchTerm
        }
      })
      .valueChanges.pipe(map(result => result.data.allHeroes));
  }

  upvoteHero(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation upvote($id: String!) {
          upvote(id: $id) {
            id
            name
            voteCount
          }
        }
      `,
      variables: {
        id: id
      }
    });
  }

  downvoteHero(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation downvote($id: String!) {
          downvote(id: $id) {
            id
            name
            voteCount
          }
        }
      `,
      variables: {
        id: id
      }
    });
  }
}
