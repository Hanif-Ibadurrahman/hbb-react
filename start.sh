#!/usr/bin/env bash

set -e

env=${APP_ENV:-production}

echo "Running container in \"$env\" environment. "

if [ "$env" = "production" ]; then

    echo "Running production environment"
    npm run build:production

elif [ "$env" = "local" ]; then

    echo "Running local environment"
    npm run build:local

elif [ "$env" = "development" ]; then

    echo "Running development environment"
    npm run build:development

elif [ "$env" = "staging" ]; then

    echo "Running staging environment"
    npm run build:staging

else

    echo "Could not match the container environment \"$env\""
    exit 1

fi
