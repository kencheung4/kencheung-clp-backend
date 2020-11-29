const { v4: uuidv4 } = require('uuid');

const InMemoryStore = {
  // [id]: [clicks]
}

const calculateGame = (id) => {
  const red = InMemoryStore[id].clicks.filter(click => click.color === 'red').length;;
  const blue = InMemoryStore[id].clicks.filter(click => click.color === 'blue').length;
  InMemoryStore[id].red = red;
  InMemoryStore[id].blue = blue;
  InMemoryStore[id].black = blue - red;
  return InMemoryStore[id];
}

const Query = {
  getGame: async () => {
    if (Object.keys(InMemoryStore).length !== 0) {
      const id = Object.keys(InMemoryStore)[0];
      return InMemoryStore[id];
    }
    const id = uuidv4();
    InMemoryStore[id] = {
      id: id,
      red: 0,
      blue: 0,
      black: 0,
      clicks: [],
      createdAt: (new Date()).toISOString(),
    }
    return InMemoryStore[id];
  }
};

const Mutation = {
  resetGame: async () => {
    const id = Object.keys(InMemoryStore).length > 0 ? Object.keys(InMemoryStore)[0].id : null;
    InMemoryStore = {};
    return { id };
  },
  clickBlue: async ({ id }) => {
    InMemoryStore[id].clicks.push({
      color: 'blue',
      createdAt: (new Date()).toISOString(),
    })
    return calculateGame(id);
  },
  clickRed: async ({ id }) => {
    InMemoryStore[id].clicks.push({
      color: 'red',
      createdAt: (new Date()).toISOString(),
    })
    return calculateGame(id);
  },
};

module.exports = { Query, Mutation };
