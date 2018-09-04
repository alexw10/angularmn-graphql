let heroData = [
  {
    id: 1,
    name: 'Superman',
    voteCount: 0
  },
  {
    id: 2,
    name: 'Spiderman',
    voteCount: 0
  },
  {
    id: 3,
    name: 'Batman',
    voteCount: 0
  }
];

const RESOLVERS = {
  Query: {
    allHeroes: (root, { searchTerm }) => {
      return heroData;
    },
    hero: (root, { id }) => {
      return heroData.filter(hero => {
        return hero.id === id;
      })[0];
      // return heroModel.findOne({ id: id });
    }
  },
  Mutation: {
    upvote: (root, { id }) => {
      const hero = heroData.filter(hero => {
        return hero.id === id;
      })[0];
      hero.voteCount++;
      return hero;
    },
    downvote: (root, { id }) => {
      const hero = heroData.filter(hero => {
        return hero.id === id;
      })[0];
      hero.voteCount--;
      return hero;
    },
    addHero: (root, { name }) => {
      return null;
    }
  }
};

export default RESOLVERS;

/*
GraphQL Playground Queries
{
  allHeroes {
    id
  }
}

{
  allHeroes {
    id
    name
  }
}

{
	hero(id: 3) {
    id
    name
  }
}


Dynamic GraphQL Playground Queries
Utilize this query with the QUERY VARIABLES at the bottom of GraphQL Playground
query Hero($id: Int!) {
  hero(id: $id) {
    id
    name
    voteCount
  }
}


Aliases and Fragement GraphQL Playground Queries
Without utilizing fragments
query Heroes {
  myFirstHero: hero(id: 1) {
    id
    name
		voteCount
  }
  
  mySecondHero: hero (id: 2) {
    id
    name
    voteCount
  }
}

With utilizing fragments
query Heroes {
  myFirstHero: hero(id: 1) {
		...heroFields
  }
  
  mySecondHero: hero (id: 2) {
		...heroFields
  }
}

fragment heroFields on Hero {
    id
    name
		voteCount
}


Mutations GraphQL Playground Queries
mutation upvoteHero {
  upvote(id: 1) {
    id
    name
    voteCount
  }
}

mutation downvoteHero {
  downvote(id: 1) {
    id
    name
    voteCount
  }
}

Let's say we want to upvote multiple heroes
mutation downvoteHero {
  first: upvote(id: 1) {
		...heroFields
  }
  
  second: upvote(id: 2) {
		...heroFields
  }
}

fragment heroFields on Hero {
  id
  name
  voteCount
}
*/
