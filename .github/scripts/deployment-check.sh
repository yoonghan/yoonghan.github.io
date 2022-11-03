#!/bin/bash

i=0

while [ $i -lt 4 ] 
do
    #sleep to allow vercel to deploy
    sleep 5
    httpresponse=$(curl --write-out '%{http_code}' --silent --output /dev/null $1)
    if [ $httpresponse != '200' ]
    then
        i=$[$i+1]
    else
        exit 0
    fi
done

echo "Fail to find $1"
exit 1