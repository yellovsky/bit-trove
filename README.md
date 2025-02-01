# Bit Trove

A repository for the BitTrove personal blog – part playground, part showcase. Not a fancy project, just a space to experiment and build.

## How to Run
```sh
# Install dependencies
yarn

# Start services in separate terminal windows

# 1. Start the database
docker-compose up

# 2. Initialize, seed, and start the API
cd ./apps/api
yarn prisma:generate
yarn prisma:dev:push
yarn prisma:seed
yarn dev

# 3. Start the frontend
cd ./apps/frontend
yarn dev
```