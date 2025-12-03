#!/usr/bin/env bash

# future procrastinatino - 
#       node cli command
#               create languages within year based on template

current_year=$(date +%Y)
echo "The year is: $current_year, and we are still here to bear witness"

if [ -d "$current_year" ]; then
  echo "$current_year already exists!"
fi

directories=$(find ./ -type d -maxdepth 1)
sorted_directories=$(printf "%s\n" "$directories" | sort -r)
most_recent_directory=$(printf "%s\n" $sorted_directories | head -1)

#   echo $directories
#   echo $sorted_directories
#   echo $most_recent_directory

# this doesn't entirely make sense, copies across day specific
# stuff which will end up deleted
echo "running: cp -prf $most_recent_directory $current_year"
cp -prf $most_recent_directory $current_year

echo "fin"
