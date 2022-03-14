#!/usr/bin/env bash

set -e

env=${APP_ENV:-production}

echo "Running container in \"$env\" environment. "

if [ "$env" = "production" ]; then

    npm run build:production

elif [ "$env" = "local" ]; then

    npm run build:local

elif [ "$env" = "development" ]; then

    npm run build:development

else

    echo "Could not match the container environment \"$env\""
    exit 1

fi
