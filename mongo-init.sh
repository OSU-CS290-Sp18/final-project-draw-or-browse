#!/bin/bash

export MONGO_HOST="classmongo.engr.oregonstate.edu"
export MONGO_USER="cs290_"$USER
export MONGO_PASSWORD="cs290_"$USER
export MONGO_DB_NAME="cs290_"$USER

mongoimport --host classmongo.engr.oregonstate.edu \
  --username $MONGO_USER                 \
  --db $MONGO_DB_NAME                        \
  --password $MONGO_PASSWORD                 \
  --collection people --jsonArray  mongo-db-init.json