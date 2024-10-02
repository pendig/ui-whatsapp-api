require('dotenv').config({ path: './.env.local' });

module.exports = {
  apps: [
    {
      name: 'kirimy',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
      },
    },
  ],
};
