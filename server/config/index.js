require('dotenv').config('');

const config = {
  server: {
    port: process.env.SERVER_PORT || 3000,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  pagination: {
    limit: 1,
    skip: 0,
    page: 1,
  },
  sort: {
    sortBy: {
      default: 'createdAt',
      fields: ['createdAt', 'updatedAt'],
    },
    direction: {
      default: 'desc',
      fields: ['asc', 'desc'],
    },
  },
  token: {
    secret: process.env.TOKEN_SECRET,
  },
};

module.exports = config;