#!/bin/sh

set -ex
npx prisma migrate reset --force
npx ts-node prisma/seed.ts
npm run start
