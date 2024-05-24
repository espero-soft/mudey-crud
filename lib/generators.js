/**
 * Module dependencies
 */
var ft = require('./fileTools');
var formatTools = require('./formatTools');
var os = require('os');

/**
 * Generate a Mongoose model
 * @param {string} path
 * @param {string} modelName
 * @param {array} modelFields
 * @param {string} generateMethod
 * @param {boolean} ts generating code in TS
 * @param {function} cb
 */
function generateModel(path, modelName, modelFields, generateMethod, ts, cb) {
    ft.createDirIfIsNotDefined(path, 'src', null)
    var fields = formatTools.getFieldsForModelTemplate(modelFields);
    var fieldTypes = formatTools.getFieldTypeForModelTemplate(modelFields);
    var schemaName = modelName + 'Schema';

    var extension = (ts) ? 'ts' : 'js';

    let date = new Date()
    let time = date.toLocaleString()

    var model = ft.loadTemplateSync('model.' + extension);
    model = model.replace(/{date}/, time);
    model = model.replace(/{modelName}/, modelName);
    model = model.replace(/{schemaName}/g, schemaName);
    model = model.replace(/{Name}/g, formatTools.capitalizeFirstLetter(modelName));
    model = model.replace(/{name}/g, modelName.toLowerCase());
    model = model.replace(/{fields}/, fields);
    model = model.replace(/{fieldTypes}/, fieldTypes);

    if (generateMethod === 't') {
        ft.createDirIfIsNotDefined(path, '/src/models', function() {
            ft.writeFile(path + '/src/models/' + modelName + '.' + extension, model, null, cb);
        });
    } else {
        ft.createDirIfIsNotDefined(path, modelName, function() {
            ft.writeFile(path + '/' + modelName + '/' + modelName + 'Model.' + extension, model, null, cb);
        });
    }
}

/**
 * Generate a Express router
 * @param {string} path
 * @param {string} modelName
 * @param {string} generateMethod
 * @param {boolean} ts generating code in TS
 * @param {function} cb
 */
function generateRouter(path, modelName, generateMethod, ts, cb) {
    ft.createDirIfIsNotDefined(path, 'src', null)
    var extension = (ts) ? 'ts' : 'js';

    if(ts){
        return;
    }

    let date = new Date()
    let time = date.toLocaleString()
    let router

    if(modelName.toLowerCase().search("user") > -1){
        router = ft.loadTemplateSync('userRouter.' + extension);
    }else{
        router = ft.loadTemplateSync('router.' + extension);
    }
    router = router.replace(/{date}/g, time);
    router = router.replace(/{controllerName}/g, modelName + 'Controller');

    if (generateMethod === 't') {
        ft.createDirIfIsNotDefined(path, '/src/routes', function() {
            router = router.replace(/{Name}/g, formatTools.capitalizeFirstLetter(modelName));
            router = router.replace(/{controllerPath}/g, '\'../controllers/' + modelName + 'Controller.' + extension + '\'');
            ft.writeFile(path + '/src/routes/' + modelName + 'Routes.' + extension, router, null, cb);
        });
    } else {
        ft.createDirIfIsNotDefined(path, modelName, function() {
            router = router.replace(/{controllerPath}/g, '\'./' + modelName + 'Controller.' + extension + '\'');
            ft.writeFile(path + '/' + modelName + '/' + modelName + 'Routes.' + extension, router, null, cb);
        });
    }
}

/**
 * Generate Controller
 * @param {string} path
 * @param {string} modelName
 * @param {array} modelFields
 * @param {string} generateMethod
 * @param {boolean} ts generating code in TS
 * @param {function} cb
 */
function generateController(path, modelName, modelFields, generateMethod, ts, cb) {
    ft.createDirIfIsNotDefined(path, 'src', null)
    var extension = (ts) ? 'ts' : 'js';
    let date = new Date()
    let time = date.toLocaleString()

    if(modelName.toLowerCase().search("user") > -1){
        controller = ft.loadTemplateSync('userController.' + extension);
        let auth = ft.loadTemplateSync('auth.' + extension);
        let env = ft.loadTemplateSync('env.' + extension);
        let connection = ft.loadTemplateSync('connection.' + extension);
        auth = auth.replace(/{modelName}/g, formatTools.capitalizeFirstLetter(modelName) + 'Model');
        auth = auth.replace(/{modelPath}/g, '\'../models/' + modelName + 'Model.' + extension + '\'')
        auth = auth.replace(/{date}/g, time);

        ft.createDirIfIsNotDefined(path, 'config', null)
        ft.createDirIfIsNotDefined(path, 'src/helpers', null)
        ft.writeFile(path + '/src/helpers/auth.' + extension, auth, null, null);
        ft.writeFile(path + '/config/connection.' + extension, connection, null, null);
        ft.writeFile(path + 'env', env, null, null);

    }else{
        controller = ft.loadTemplateSync('controller.' + extension);
    }


    controller = controller.replace(/{modelName}/g, formatTools.capitalizeFirstLetter(modelName) + 'Model');
    controller = controller.replace(/{Name}/g, formatTools.capitalizeFirstLetter(modelName));
    controller = controller.replace(/{name}/g, modelName.toLowerCase());
    controller = controller.replace(/{date}/g, time);
    controller = controller.replace(/{pluralName}/g, formatTools.pluralize(modelName));
    controller = controller.replace(/{controllerName}/g, modelName + 'Controller');

    if (generateMethod === 't') {
        ft.createDirIfIsNotDefined(path, '/src/controllers', function() {
            controller = controller.replace(/{modelPath}/g, '\'../models/' + modelName + 'Model.' + extension + '\'');
            ft.writeFile(path + '/src/controllers/' + modelName + 'Controller.' + extension, controller, null, cb);
        });
    } else {
        ft.createDirIfIsNotDefined(path, modelName, function() {
            controller = controller.replace(/{modelPath}/g, '\'./' + modelName + 'Model.' + extension + '\'');
            ft.writeFile(path + '/' + modelName + '/' + modelName + 'Controller.' + extension, controller, null, cb);
        });
    }
}

module.exports = {
    generateModel: generateModel,
    generateRouter: generateRouter,
    generateController: generateController
};