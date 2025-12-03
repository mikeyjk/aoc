#!/usr/bin/env bash

find . -type f -name package.json \
  -not -path "*/node_modules/*" \
  -print0 |
while IFS= read -r -d '' file; do
  dir=$(dirname "$file")
  echo "==> Upgrading in $dir"
  (cd "$dir" && npm upgrade)
done

