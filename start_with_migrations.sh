#!/bin/sh

set -ex
npx prisma migrate reset --force
npx prisma db push
npx ts-node prisma/seed.ts
npm run start
