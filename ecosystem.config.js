module.exports = {
  apps: [
    {
      name: 'API CyberCafe',
      script: 'server.js',
      cwd: './',
      watch: true,
      ignore_watch: [
        '.git',
        '.vscode',
        '.editorconfig',
        '.eslintrc.js',
        '.prettierrc.js',
        'README.md'
      ],
      env: {
        SERVER_PORT: 3333,
        DATABASE_PORT: 5432,
        DATABASE_HOST: 'localhost',
        DATABASE_NAME: 'cybercafe',
        DATABASE_USER: 'postgres',
        DATABASE_PASSWORD: '58310502',
        API_VERSION: '1.0.0',
        SECRET_JWT_ACCESS_TOKEN: 'fabio_professor'
      },
      env_production: {
        SERVER_PORT: 3333,
        DATABASE_PORT: 5432,
        DATABASE_HOST: 'localhost',
        DATABASE_NAME: 'cybercafe',
        DATABASE_USER: 'postgres',
        DATABASE_PASSWORD: '58310502',
        API_VERSION: '1.0.0',
        SECRET_JWT_ACCESS_TOKEN: 'fabio_professor'
      }
    }
  ]

}
