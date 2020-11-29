# Entity Labeler

Label hierarchial entities using the new Slate.js

## Requirements

Support same functionality as the Labeler in LUIS.ai

## Links

- https://docs.slatejs.org/

## Update deploy site

Current it is manually run locally so that updated /docs folder will be included in push
Perhaps it could be automated with github action

1. npm run build
1. rm -r -fo -ErrorAction ignore docs
1. mv build docs
1. Commit updated /docs
1. git push
