#!/bin/bash

dockerize -wait tcp://mysqldb:3306 -timeout 30s

echo "Start Wait Mysql"
