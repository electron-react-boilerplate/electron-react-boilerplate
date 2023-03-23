#!/bin/bash

#LOAD .ENV
if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi

OPERATIONAL_SYSTEM=$(uname)

if [[ $OPERATIONAL_SYSTEM == *"Darwin"* ]]; then
    BREW_DEPENDECIES=$(brew deps --include-build ffmpeg | grep 'nmap');
    if [ -n "$BREW_DEPENDECIES" ]; then
        echo "Already has all required dependecies.";
    else
        brew install nmap
    fi
fi

if [[ $OPERATIONAL_SYSTEM == *"Linux"* ]]; then
    APT_DEPENDECIES=$(apt list --installed nmap | grep nmap);
    if [ -n "$APT_DEPENDECIES" ]; then
        echo "Already has all required dependecies.";
    else
        apt install -y nmap
    fi
fi

awk '!/LAST_UPDATE/' .env >> temp_env.env;
rm -rf .env;
mv ./temp_env.env ./.env;
echo "LAST_UPDATE=$(date +%m-%d-%YT%H:%M:%S)" >> .env