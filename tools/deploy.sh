#/bin/bash
rm -rf lib/es
rm -rf www/build
docker-compose run label-build npm run build
docker-compose run label npm run build
aws s3 sync ./www/build s3://labellab-components --acl public-read
npm publish
