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
      return heroModel.findOne({ id: id });
    }
  },
  Mutation: {
    upvote: (root, { id }) => {
      const hero = courseData.filter(hero => {
        return hero.id === id;
      })[0];
      hero.voteCount++;
      return hero;
    },
    downvote: (root, { id }) => {
      const hero = courseData.filter(hero => {
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
