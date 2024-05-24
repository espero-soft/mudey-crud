/**
 * Generate with Mudey Formation (https://mudey.fr)
 * Created at : {date}
 */
const express = require('express');
const router = express.Router();
const {controllerName} = require({controllerPath});
// const uploadFileConfig = require('../../config/upload.file.config.js');

/*
 * GET 
 */
router.get('/', /*auth.admin,*/ {controllerName}.get{Name}s);

/*
 * GET 
 */
router.get('/by/page', /*auth.admin,*/ {controllerName}.get{Name}sByPage);

/*
 * GET 
 */
router.get('/search', /*auth.admin,*/ {controllerName}.search{Name}ByTag);

/*
 * GET
 */
router.get('/:id', /*auth.admin,*/ {controllerName}.show{Name}ById);

/*
 * POST
 */
router.post('/', /*uploadFileConfig,*/ /*auth.admin,*/ {controllerName}.create{Name});
/*
 * POST
 */
router.post('/sort', /*auth.admin,*/ {controllerName}.sort{Name}ByPosition);

/*
 * PUT
 */
router.put('/:id', /*uploadFileConfig,*/ /*auth.admin,*/ {controllerName}.update{Name}ById);

/*
 * DELETE
 */
router.delete('/:id', /*auth.admin,*/ {controllerName}.remove{Name}ById);

module.exports = router;
