#!/usr/bin/env bash

export $(cat .env.local)


contentful login --managementToken $CONTENTFUL_MANAGEMENT_TOKEN
contentful --space-id $NEXT_PUBLIC_CONTENTFUL_SPACE_ID space environment delete --environment-id staging
contentful --space-id $NEXT_PUBLIC_CONTENTFUL_SPACE_ID space environment create --name staging --environment-id staging --source master