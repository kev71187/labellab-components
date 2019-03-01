#/bin/bash

rm -rf lib/es
rm -rf www/build
docker-compose run label-build npm run build
docker-compose run label-build npm run dist
docker-compose run label npm run build
npm publish
aws s3 sync ./www/build s3://labellab-components --acl public-read

set -e

VERSION=$(node -p -e "require('./package.json').version")
CURRENT_BRANCH="$(git symbolic-ref --short -q HEAD)"

success() {
  echo -e "\033[32;1m$1"
}

error() {
  echo -e "\033[31;1m$1"
}

if [ -z "$VERSION" ]; then
  error "Unable to get current npm version of this package"
  exit 1
fi

git tag -a $VERSION -m "release $VERSION"
git push --set-upstream origin $CURRENT_BRANCH > /dev/null 2>&1
git push --tags > /dev/null 2>&1

success "pushed $VERSION tag to GitHub."
