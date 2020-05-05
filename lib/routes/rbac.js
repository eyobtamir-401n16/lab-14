'use strict';
const auth = require('../middleware/auth.js');
const roles = require('../../docs/roles.json');
const express = require('express');
const router = express.Router();


router.get('/public',auth, (req, res, next) => {
  res.send('this is public route');
});


router.get('/private', auth, (req, res, next) => {
  if (req.user && req.user._id) {
    res.send('for the private users only!!');
  } else {
    next({ err: 404, msg: 'Not authorized!!' });
  }
});
router.get('/readonly',auth, (req, res, next) => {
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].roles === req.user.roles) {
      if (roles[i].roles.capabilities.includes('read')) {
        res.send('you have read capabilities!!!');
      } else {
        break;
      }
    }
  }
  next({ err: 404, msg: 'wrong capabilities' });
});
router.get('/create',auth, (req, res, next) => {
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].roles === req.user.roles) {
      if (roles[i].role.capabilities.includes('create')) {
        res.send('you have create capabilities');
      } else {
        break;
      }
    }
  }
  next({ err: 404, msg: 'Wrong capabilities' });
});
router.get('/update',auth, (req, res, next) => {
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].roles === req.user.roles) {
      if (roles[i].role.capabilities.includes('update')) {
        res.send('you have update capabilities');
      } else {
        break;
      }
    }
    next({ err: 404, msg: 'wrong capabilities' });
  }
});
router.get('/delete',auth,  (req, res, next) => {
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].roles === req.user.roles) {
      if (roles[i].role.capabilities.includes('delete')) {
        res.send('you have delete capabilities');
      }
    }
  }
  next({ err: 404, msg: 'wrong capabilities' });
});
router.get('./everything', (req, res, next) => {
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].roles === req.user.roles) {
      if (roles[i].roles.capabilities.includes('superuser')) {
        res.send('you have everything capabilities ');
      } else {
        break;
      }
    }
  }
  next({ err: 404, msg: 'wrong capabilities' });
});

module.exports = router;