module.exports = {
  apps: [
    {
      name: 'API CyberCafe',
      script: 'server.js',
      cwd: './',
      watch: true,
      env: {
        SERVER_PORT: 3333,
        DATABASE_PORT: 5432,
        DATABASE_HOST: 'localhost',
        DATABASE_NAME: 'cybercafe',
        DATABASE_USER: 'postgres',
        DATABASE_PASSWORD: '58310502',
      },
      env_production: {
        SERVER_PORT: 3333,
        DATABASE_PORT: 5432,
        DATABASE_HOST: 'localhost',
        DATABASE_NAME: 'cybercafe',
        DATABASE_USER: 'postgres',
        DATABASE_PASSWORD: '58310502',
      },
    },
  ],
  
}