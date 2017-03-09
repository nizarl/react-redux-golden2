Prerequisites:
node/npm: (from command prompt type following commands once only)
1. npm install -g gulp
2. npm install -g local-web-server

To start project: From command prompt (root directory)
1. npm install

Required paramaters:
- --env: {environment}

Optional Parameters:
- --theme: {theme} (default is: legacy)

environments available: [dev (local machine), int, qa, prod] 

themes available:
- legacy = myNotes
- cure = new ctech app themes (WIP)


To build this project:
gulp build --env={environment} [--theme={theme}]

Example Build Commands:
1. gulp build --env=dev 
2. gulp build --env=int --theme=cure
3. gulp build --env=prod --theme=legacy

To start server and run locally:
1. sudo gulp

