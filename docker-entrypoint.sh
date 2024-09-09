#!/bin/bash
set -e

# Your commands here
npx prisma migrate dev

exec "$@"
