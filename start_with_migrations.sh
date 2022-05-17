#!/bin/sh

set -ex
npx prisma migrate deploy
npx ts-node prisma/seed.ts
npm run start
