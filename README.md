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

__Install project dependencies:__
```
npm install
```

__Build Aggregator Project:__

Required parameters:  --env: {environment} 

*Available environments: dev(local machine), cdn, {custom environment}. The environment values are sourced from: project.properties.json --> componentUrls*

Optional parameter:  --usemin: true | false 

*Aggregator can use minified files from CDN (you should use this switch in aggregator qa and prod environments)*

Note: If you just type __gulp build__ the default environment is (dev) and usemin is false

Examples commands:

```
gulp build 

gulp build --env=dev

gulp build --env=cdn

gulp build --env=cdn --usemin=true

gulp build --env=justiceleague
```

__Start server and run aggregator locally:__
```
gulp
```

## Unit Tests__

Note: Local dev server is not used and does not need to run for Unit test. Unit test use file(s) in __/dist__ directory.

1. Make sure the following two files located in /unitTests/deps are using the same version of shared library that configured in project.properties.json __sharedLibTopLevel__ properties. These shared library file are loaded on CDN. Copy locally 2 files locally.

    a. uic-core.js

    b. uic-thirdparty.js


```js
gulp build
gulp test
```