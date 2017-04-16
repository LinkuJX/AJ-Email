#!/bin/bash
for i in "eu" "na" "lpl" "lck" "lms"
do
	python $i"_standings.py" > $i"_standings.txt"
	echo "Generated $i standings to .txt"
done