module.exports = {
  apps: [
    {
      name: 'bite-size-server',
      cwd: './server',
      script: 'src/app.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        PGUSER: 'turner',
        PGPASSWORD: 'your_secure_password',
        PGHOST: '127.0.0.1',
        PGPORT: '5432',
        PGDATABASE: 'bitesizedb',
        JWT_SECRET: 'super_secret_jwt_key',
        API_CLIENT_SECRET: 'matching_internal_shared_secret_key'
      }
    },
    {
      name: 'bite-size-client',
      cwd: './client',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3001', 
      env: {
        NODE_ENV: 'production',
        EXPRESS_API_KEY: 'matching_internal_shared_secret_key',
        NEXT_PUBLIC_EXPRESS_API_KEY: 'matching_internal_shared_secret_key'
      }
    }
  ]
};
