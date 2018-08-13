const { spawn }       = require('child_process');

spawn('cat package.json | grep \'\"name\"\' | sed -E \'s/\"name\": \"(.*)\",/\1/g\' | sed -E \'s/(\t| )//g\'', null, { stdio: 'inherit' });
