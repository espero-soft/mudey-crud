var os = require('os');

var referenceType = require('../templates/fieldReferenceType');
var allowedFieldsTypes = {
    'string': String,
    'number': Number,
    'date': Date,
    'boolean': Boolean,
    'object': Object,
    'array': Array,
    'file': String,
    'image': String,
    'video': String,
    'objectId': referenceType
};

/**
 * Format the fields for the model template
 * @param {array} fields fields input
 * @returns {string} formatted fields
 */
function getFieldsForModelTemplate(fields) {
    var lg = fields.length - 1;

    var modelFields = '{' + os.EOL;
    fields.forEach(function(field, index, array) {
        modelFields += '\t' + field.name + ' : ' + (field.isArray ? '[ { type : ' : '{ type : ') + (allowedFieldsTypes[field.type]).name + (field.isArray ? '} ]' : '}');
        
        if (field.reference) {
            modelFields = modelFields.replace(/{ref}/, field.reference);
        }
        modelFields +=  ','+ os.EOL
    });

    modelFields += '\tposition : ' + "{ type: Number }," + os.EOL;
    modelFields += '\tupdatedAt : ' + "{ type: Date }," + os.EOL;
    modelFields += '\tcreatedAt : ' + "{type: Date, default: Date.now }," + os.EOL;

    modelFields += '}';

    return modelFields;
}
/**
 * Format the fields for the model template
 * @param {array} fields fields input
 * @returns {string} formatted fields
 */
function getFieldTypeForModelTemplate(fields) {
    var lg = fields.length - 1;

    var modelFieldTypes = '{' + os.EOL;
    fields.forEach(function(field, index, array) {
        modelFieldTypes += '\t' + field.name + ' : ' + (field.isArray ? '[' : '') + (allowedFieldsTypes[field.type]).name + (field.isArray ? ']' : '');
        
        if (field.reference) {
            modelFieldTypes = modelFieldTypes.replace(/{ref}/, field.reference);
        }
        modelFieldTypes +=  ','+ os.EOL
    });

    modelFieldTypes += '\tposition : ' + "Number," + os.EOL;
    modelFieldTypes += '\tupdatedAt : ' + "Date," + os.EOL;
    modelFieldTypes += '\tcreatedAt : ' + "Date," + os.EOL;

    modelFieldTypes += '}';

    return modelFieldTypes;
}

/**
 * Puts a word with the first letter capital
 * @param {string} str
 * @returns {string}
 */
function capitalizeFirstLetter(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

/**
 * Puts a word in the plural
 * @param {string} word
 * @returns {string}
 */
function pluralize(word) {
    return word + 's';
}

module.exports = {
    getFieldsForModelTemplate: getFieldsForModelTemplate,
    getFieldTypeForModelTemplate: getFieldTypeForModelTemplate,
    pluralize: pluralize,
    capitalizeFirstLetter: capitalizeFirstLetter
};