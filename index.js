var express = require('express'),
		expressSession = require('express-session'),
		path = require('path'),
		pug = require('pug'),
		bodyParser = require('body-parser'),
		bcrypt = require('bcrypt-nodejs'),
        mongoose = require('mongoose');