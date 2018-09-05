export interface Hero {
  id: string;
  name: string;
  voteCount: number;
}

export interface Query {
  allHeroes: Hero[];
}
