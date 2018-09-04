import mongoose from 'mongoose';
import heroModel from './models/hero';

let heroData = [
  {
    id: '1',
    name: 'Superman',
    voteCount: 0
  },
  {
    id: '2',
    name: 'Spiderman',
    voteCount: 0
  },
  {
    id: '3',
    name: 'Batman',
    voteCount: 0
  }
];

const RESOLVERS = {
  Query: {
    allHeroes: (root, { searchTerm }) => {
      //return heroData;

      if (searchTerm !== '') {
        return heroModel
          .find({ $text: { $search: searchTerm } })
          .sort({ voteCount: 'desc' });
      } else {
        return heroModel.find().sort({ voteCount: 'desc' });
      }
    },
    hero: (root, { id }) => {
      // return heroData.filter(hero => {
      //   return hero.id === id;
      // })[0];
      return heroModel.findOne({ id: id });
    }
  },
  Mutation: {
    upvote: (root, { id }) => {
      // const hero = heroData.filter(hero => {
      //   return hero.id === id;
      // })[0];
      // hero.voteCount++;
      // return hero;
      return heroModel.findOneAndUpdate({ id: id }, { $inc: { voteCount: 1 } });
    },
    downvote: (root, { id }) => {
      // const hero = heroData.filter(hero => {
      //   return hero.id === id;
      // })[0];
      // hero.voteCount--;
      // return hero;
      return heroModel.findOneAndUpdate(
        { id: id },
        { $inc: { voteCount: -1 } }
      );
    },
    addHero: (root, { name }) => {
      const hero = new heroModel({ name: name });
      return hero.save();
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
	hero(id: "3") {
    id
    name
  }
}


Dynamic GraphQL Playground Queries
Utilize this query with the QUERY VARIABLES at the bottom of GraphQL Playground
query Hero($id: String!) {
  hero(id: $id) {
    id
    name
    voteCount
  }
}


Aliases and Fragement GraphQL Playground Queries
Without utilizing fragments
query Heroes {
  myFirstHero: hero(id: "1") {
    id
    name
		voteCount
  }
  
  mySecondHero: hero (id: "2") {
    id
    name
    voteCount
  }
}

With utilizing fragments
query Heroes {
  myFirstHero: hero(id: "1") {
		...heroFields
  }
  
  mySecondHero: hero (id: "2") {
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
  upvote(id: "1") {
    id
    name
    voteCount
  }
}

mutation downvoteHero {
  downvote(id: "1") {
    id
    name
    voteCount
  }
}

Let's say we want to upvote multiple heroes
mutation downvoteHero {
  first: upvote(id: "1") {
		...heroFields
  }
  
  second: upvote(id: "2") {
		...heroFields
  }
}

fragment heroFields on Hero {
  id
  name
  voteCount
}

Setting up MongoDB and mongoose
Start with command mongod
MongoDB management tool Robo 3T (free and lightweight mongodb management tool)
https://robomongo.org/

npm install mongoose
npm install cors

npm run server 
show that mongodb connection has been established successfully


Creating a model
Updating hero.js to utilize a UUID and automatically update ID.
Refactor resolvers to utilize Mongoose
Testing Server with GraphQL playground

add heroes to mongodb
mutation AddHero {
  addHero(name: "Superman") {
    id
  	name
    voteCount
  }
}

Add Batman/Spiderman one at a time then show each document in Robo 3T

Query in playgroubd for all heroes:
query AllHeroes {
  allHeroes(searchTerm: "") {
    id
    name
    voteCount
  }
}

Do above with a searchTerm as well

Query for just a hero with uuid:
query hero {
  hero(id: "REPLACE WITH UUID") {
    id
    name
    voteCount
  }
}

mutation upvote hero with
mutation VoteHero {
  upvote(id: "REPLACE WITH UUID") {
    id
    name
    voteCount
  }
}
*/
