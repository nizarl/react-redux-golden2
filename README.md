__Prerequisites:__
node/npm: (from command prompt type following commands once only)

__Local dependencies to run web server on workstation:(command line - root directory)__
```
1. npm install -g gulp
2. npm install -g local-web-server
```
__Install project dependencies:(command line - root directory)__
```
npm install
```
__New Aggregator project(first time only):__

1. Branch from develop

2. Open project.properties.json

    a. aggregatorName : update name (single word smallcaps)

    b. aggregatorModuleName: update name (single word camelCase)
3. Prepare source directory and files __(command line - root directory):__ 
```
    gulp prepare-source-files
```

__*Important: The steps above need to be run only once for a new aggregator.  After that just branch and version.  Version aggregator in project.properties.json --> aggregatorVersion.*__


__Build Aggregator Project:__

Required paramaters:  --env: {environment} 

Available environments: dev(local machine), int, qa, prod, {custom environment}

Examples commands: __(command line - root directory)__

```
gulp build --env=dev

gulp build --env=int

gulp build --env=qa

gulp build --env=prod

gulp build --env=justiceleague
```


The environment values are sourced from: project.properties.json --> componentUrls


__Start server and run aggregator locally:(command line - root directory)__
```
1. sudo gulp
```