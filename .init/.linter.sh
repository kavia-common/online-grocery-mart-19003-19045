#!/bin/bash
cd /home/kavia/workspace/code-generation/online-grocery-mart-19003-19045/ProductListingService
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

