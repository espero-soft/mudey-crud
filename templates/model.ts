/**
 * Generate with Mudey Formation (https://mudey.fr)
 * Created at : {date}
 */


import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Contact
export interface I{Name} extends Document {fieldTypes}

const {schemaName} = new Schema({fields});

// Create and export Contact model
const {Name}: Model<I{Name}> = mongoose.model<I{Name}>('{Name}', {schemaName});

export default {Name};
