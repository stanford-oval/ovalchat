#!/bin/bash
# This script is used to tell Vercel which branch it should build

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]] ; then
  # Proceed with the build
  echo "✅ - Branch name check passed. Build can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Branch name check failed. Build cancelled because this branch is not for deployment"
  exit 0;
fi