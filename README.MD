# mudey-crud

This package of models receives your database and structures your project with architecture MVC as REST controller and Express router code generator for Express.js 4.0.17 application.
Full support for type script and defining files as base class

```
Note that the package must be installed globally on your system
```

## Installation
```bash
$ npm install -g mudey-crud
```

## Usage
```bash
$ mudey-crud -m user -f firstName:number,lastName:string -r
        create: ./src/controllers/userController.js
        create: ./src/routes/userRoutes.js
        create: ./src/models/userModel.js
```

##### Options

  - `-m, --model <modelName>` - the model name.
  - `-f, --fields  <fields>` - the fields (name1:type,name2:type).
  - `-r, --rest` - enable generation REST.
  - `-t, --tree <tree>`        files tree generation grouped by (t)ype or by (m)odule

##### Available types
  - string
  - number
  - date
  - boolean
  - array
  - objectId

### Interactive mode
```bash
$ mudey-crud
Model Name : user
Available types : string, number, date, boolean, array
Field Name (press <return> to stop adding fields) : firstName
Field Type [string] : string
Field Name (press <return> to stop adding fields) : lastName
Field Type [string] : 
Field Name (press <return> to stop adding fields) : email
Field Type [string] : string
Field Name (press <return> to stop adding fields) : password
Field Type [string] : string
Generate Rest (yes/no) ? [yes] : 
Files tree generation grouped by Type or by Module (t/m) ? [t] : 
        create: ./src/controllers/userController.js
        create: ./src/routes/userRoutes.js
        create: ./src/models/userModel.js
```

## Package output in your project
### Model

models/userModel.js :
```javascript
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
	'firstName' : String,
	'lastName' : String,
	'email' : String,
	'password' : String,
	'position ' : Number,
	'updated_at ' : Date,
	'created_at ' : {type: Date, default: new Date()},
	'created_formatted_with_time_since ' : String,
	'updatedd_formatted_with_time_since ' : String
});

module.exports = mongoose.model('user', userSchema);
```

### Router
routes/userRoutes.js :
```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

/*
 * GET 
 */
router.get('/', /*auth.admin,*/ userController.getUsers);

/*
 * GET 
 */
router.get('/by/page', /*auth.admin,*/ userController.getUsersByPage);

/*
 * GET
 */
router.get('/:id', /*auth.admin,*/ userController.showUserById);

/*
 * POST
 */
router.post('/', /*auth.admin,*/ userController.createUser);
/*
 * POST
 */
router.post('/sort', /*auth.admin,*/ userController.sortUserByPosition);

/*
 * PUT
 */
router.put('/:id', /*auth.admin,*/ userController.updateUserById);

/*
 * DELETE
 */
router.delete('/:id', /*auth.admin,*/ userController.removeUserById);

module.exports = router;

```

### Controller
controllers/userController.js :
```javascript
const moment = require('moment')
const UserModel = require('../models/userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * userController.getUsers()
     */
    getUsersByPage: async (req, res) => {
        try {
            const pageNumber = req.query?.pageNumber ? parseInt(req.query?.pageNumber) : 1
            const pageLimit = req.query?.pageLimit ? parseInt(req.query?.pageLimit) : 5

            let userCount = await UserModel.find({}).count()

            let users = await UserModel.find({})
                .skip((pageNumber - 1) * pageLimit).limit(pageLimit+1)

            users = users.map((item) => {
                item.created_formatted_with_time_since = moment(item?.createdAt).fromNow()
                return item
            })

            return res.status(200).json({
                isSuccess: true,
                status: 200,
                userCount: userCount,
                count: users.length - 1,
                current: pageNumber,
                next: users[10] ? pageNumber + 1 : null,
                previous: pageNumber - 1 > 0 ? pageNumber - 1 : null,
                results: users.slice(0, 10)
            })
            

    } catch(error) {

        console.log(error);

        return res.status(500).json({
            isSuccess: false,
            status: 500,
            message: 'Error when getting user.',
            error: error
        });
    }
},
    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * userController.getUsers()
     */
    getUsers: async (req, res) => {
        try {
            const User = await UserModel.find({})

            return res.json({
                isSuccess: true,
                status: 200,
                User
            });

    } catch(error) {

        console.log(error);

        return res.status(500).json({
            isSuccess: false,
            status: 500,
            message: 'Error when getting user.',
            error: error
        });
    }
},

    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * userController.showUserById()
     */
    showUserById: async (req, res) => {
        try {
            const id = req.params.id;
            const User = await UserModel.findOne({ _id: id })

            if (!User) {
                return res.status(404).json({
                    isSuccess: false,
                    status: 404,
                    message: 'No such user'
                });
            }

            return res.status(200).json({
                isSuccess: true,
                status: 200,
                User
            });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            isSuccess: false,
            status: 500,
            message: 'Error when getting user.',
            error: error
        });

    }
    },

    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * userController.createUser()
     */
    createUser: async (req, res) => {
    try {
        let User = req.body
        User = new UserModel({ ...User })
        User.created_at = User?.created_at ? User.created_at : new Date()

        await User.save()

        return res.status(201).json({
            isSuccess: true,
            status: 201,
            message: "user is saved !",
                User
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                isSuccess: false,
                status: 500,
                message: 'Error when getting user.',
                error: error
            });
        }
    },

    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * userController. updateUserById()
     */
    updateUserById: async (req, res) => {
    try {
        const id = req.params.id;
        let User = req.body

        delete User?._id
        await UserModel.updateOne({ _id: id }, { ...User })

        return res.status(200).json({
            isSuccess: true,
            status: 200,
            message: "user is updated !",
                User
            });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            isSuccess: false,
            status: 500,
            message: 'Error when updating user.',
            error: error
        });
    }
    },
    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * userController.sortUserByPosition
     */
    sortUserByPosition: (req, res) => {
    try {

        const { datas } = req.body

        datas.forEach(async (elt) => {
            await UserModel.updateOne({ _id: elt._id }, {
                $set: { position: elt.position }
            })
        });


        return res.status(200).json({
            status: 200,
            isSuccess: true,
            message: "user sorted !"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            status: 500,
            isSuccess: false,
            error: error
        })

        }
    },

    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * userController.removeUserById()
     */
    removeUserById: async (req, res) => {
        try {
            var id = req.params.id;

            await UserModel.deleteOne({ _id: id })


            return res.status(204).json({
                // 204 No Content
                // isSuccess: true,
                // status: 204,
                // message: 'Data deleted ! .',
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                isSuccess: false,
                status: 500,
                message: 'Error when deleting user.',
                error: error
            });

        }
    }
};

```

### With files tree generation by module
```bash
Files tree generation grouped by Type or by Module (t/m) ? [t] : m
        create: ./user
        create: ./user/userModel.js
        create: ./user/userController.js
        create: ./user/userRoutes.js
```

You then only have to add router in app.js file and MongoDB connection whit Mongoose.
app.js :
```javascript
const routes = require('./src/routes/index');
const users = require('./src/routes/userRoutes');
 ...

app.use('/', routes);
app.use('/users', users);
 ...
 
```

## Licence

Licensed under the [MIT license](LICENSE).