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
        return "walcron-git-${GITHUB_HEAD_REF:${GITHUB_HEAD_REF//\//\\/}"
    fi
done

return "walcron"