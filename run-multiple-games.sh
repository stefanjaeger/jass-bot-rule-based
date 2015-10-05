#!/bin/bash
# run like ./run-multiple-games.sh 20
echo "will run for $1 times"
for i in `seq 1 $1`;
        do
		node node_modules/parallelshell "npm run runBotSimple" "npm run runBotSimple" "npm run runBotComplex" "npm run runBotComplex" | tail -1
done
