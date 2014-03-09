#!/bin/sh

#cd `dirname ${0}` && echo "prefix=`pwd`" > .npmrc && echo "{\"directory\": \"lib/bower_modules\"}" > .bowerrc && npm install grunt && grunt install

cd `dirname ${0}` && npm install grunt && grunt install
