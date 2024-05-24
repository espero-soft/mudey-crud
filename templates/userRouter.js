/**
 * Generate with Mudey Formation (https://mudey.fr)
 * Created at : {date}
 */
const express = require('express');
const { admin, auth } = require('../helpers/auth');
const router = express.Router();
const {controllerName} = require({controllerPath});

/*
 * GET 
 * Get all {Name}s
 */
router.get('/', /*auth.admin,*/ {controllerName}.get{Name}s);

/*
 * GET 
 * Get all {Name}s by page
 */
router.get('/by/page', /*auth.admin,*/ {controllerName}.get{Name}sByPage);

/*
 * GET 
 * Get one {Name}
 */
router.get('/:id', /*auth.admin,*/ {controllerName}.show{Name}ById);

/*
 * POST  
 * Create one {Name}s
 */
router.post('/', /*auth.admin,*/ {controllerName}.create{Name});

/*
 * POST
 * Signin one {Name}
 */
router.post('/signin', {controllerName}.signin{Name});

/*
 * POST
 * Signup one {Name}
 */
router.post('/signup', {controllerName}.signup{Name});

/*
 * POST
 * Sort {Name}s data by position
 */
router.post('/sort', auth, {controllerName}.sort{Name}ByPosition);

/*
 * PUT
 * Update one {Name}
 */
router.put('/:id', auth, {controllerName}.update{Name}ById);

/*
 * DELETE
 * Delete one {Name}
 */
router.delete('/:id', admin, {controllerName}.remove{Name}ById);

module.exports = router;
