'use strict';

const express = require('express');
const app = express();

app.set('port', 8080);

app.listen(app.get('port'), () => {
  console.log('Express server listening on port... ' + app.get('port'));
});