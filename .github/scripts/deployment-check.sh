#!/bin/bash

counter=1

while [ $counter -le 6 ]
do
    status_code=$(curl --write-out %{http_code} --silent --output /dev/null $1)
    if [[ "$status_code" -ne 200 ]]
    then
        sleep 5
        counter=$((counter + 1))
    else
        exit 0
    fi
done

echo "walcron"