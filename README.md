 __*All commands (highlighted in code blocks below) are run from root directory of project unless specified otherwise.*__

__Prerequisites:__ __*https://confluence.chenmed.com/display/MAINT/Developer+Environment+Setup+-+Frontend*__ 

```
1. npm install -g gulp
2. npm install -g local-web-server
```

Install Ruby (latest version):  http://rubyinstaller.org/  (Make sure Ruby is in the environment path)

*Once Ruby is installed open command prompt:*
```
1. Install Sass.  From command line: gem install sass
2. Install Compass: From command line: gem install compass
```

__Install project dependencies:__
```
npm install
```
__New Aggregator project (first time only):__

1. Branch from develop

2. Open project.properties.json

    a. aggregatorName : update name (single word smallcaps)

    b. aggregatorModuleName: update name (single word camelCase)


3. Prepare source directory and files:
```
gulp prepare-source-files
```

__*Important: The steps above need to be run only once for a new aggregator.  After that just branch and version.  Version aggregator in project.properties.json --> aggregatorVersion.*__


__Build Aggregator Project:__

Required paramaters:  --env: {environment} 

Available environments: dev(local machine), int, qa, prod, {custom environment}

Examples commands:

```
gulp build --env=dev

gulp build --env=int

gulp build --env=qa

gulp build --env=prod

gulp build --env=justiceleague
```


The environment values are sourced from: project.properties.json --> componentUrls


__Start server and run aggregator locally:__
```
1. gulp
```