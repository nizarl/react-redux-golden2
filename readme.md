Prerequisites:
node/npm: (from command prompt type following commands once only)

Local dependencies to run web server on workstation:
1. npm install -g gulp
2. npm install -g local-web-server

Install project dependencies(root directory)

1. npm install

For a new Aggregator project(first time only):
1. Branch from develop
2. Open project.properties.json
    </br> a. aggregatorName : update name (single word smallcaps)
    </br> b. aggregatorModuleName: update name (single word camelCase)
3. Prepare source directory and files, (root directory) command: 
</br> gulp prepare-source-files

Important: The steps above need to be run only once for a new aggregator.  After that just branch and version.  Version aggregator in project.properties.json --> aggregatorVersion.


Build Aggregator Project:
</br> Required paramaters:
 --env: {environment} 
 </br> Available environments: dev(local machine), int, qa, prod, {custom environment}

Examples:
</br> gulp build --env=dev
</br> gulp build --env=int
</br> gulp build --env=qa
</br> gulp build --env=prod
</br> gulp build --env=justiceleague

The environment values are sourced from: project.properties.json --> componentUrls


To start server and run aggregator locally:
1. sudo gulp

