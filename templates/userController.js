/**
 * Generate with Mudey Formation (https://mudey.fr)
 * Created at : {date}
 */
const moment = require('moment')
const bcrypt = require('bcrypt')
const {modelName} = require({modelPath});


/**
 * {controllerName}.js
 *
 * @description :: Server-side logic for managing {pluralName}.
 */
module.exports = {
    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * {controllerName}.signup{Name}()
     */
    signup{Name}: async (req, res, next) => {

        try {
            let { firstname, lastname, fullName, receivePromoMessage, email, password, created_at } = req.body

            firstname = firstname ? firstname.toUpperCase() : null
            lastname = lastname ? lastname[0].toUpperCase() + lastname.slice(1) : null
            fullName = fullName ? fullName[0].toUpperCase() + fullName.slice(1) : null
            // REGEX for E-mail validation
            const reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/

            if (fullName === '' || fullName == null) {
                return res.status(422).json({
                    status: 422,
                    'error': 'fullNameError',
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                })
            }
            if (email === '' || email == null || !reg.test(email)) {
                return res.status(422).json({
                    status: 422,
                    'error': 'emailError',
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                })
            }
            if (password.length < 6 || password == null) {
                return res.status(422).json({
                    status: 422,
                    'error': 'passwordError',
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                })
            }

            const {name}EmailExist = await {modelName}.findOne({ email: email })

            if ({name}EmailExist) {
                return res.status(422).json({
                    status: 422,
                    'error': 'Cet email est déjà utilisé, Merci de le changer.',
                    request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                })
            }
            // If {name}name or email is not used
            bcrypt.hash(password, 10, async (err, password) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        'message': "Erreur serveur. Veuillez réessayer plus tard.",
                        request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                    })
                }

                const profile = new profileModel({ firstname, fullName, lastname, email,  created_at })
                const {name} = new {modelName}({ firstname, fullName, lastname, email, password, created_at })
                // const networkInformation = await getIpData(req)

                // if (receivePromoMessage) {
                //     {name}.receivePromoMessage = receivePromoMessage
                // }

                profile.{name}Id = {name}._id
                {name}.profile = profile._id

                const token = randomToken(152);
                {name}.verifyAccountToken = token
                {name}.verifyAccountExpires = Date.now() + 3600000

                if (networkInformation.status !== "fail") {
                    {name}.networkInformation = networkInformation
                }
                await {name}.save()
                await profile.save()

                // Welcome Email
                // const data = await getClientData(req)
                // emailSender.welcome{name}({name}, data)
                
                // ///verify Account
                // emailSender.verifyEmail({name}, data)

                res.status(200).json({
                    status: 200,
                    isSuccess: true,
                    'message': 'Inscription réussie.',
                    request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                })

            })



        } catch (error) {

            console.log(error)

            res.status(500).json({
                status: 500,
                isSuccess: false,
                error: error,
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            })
        }
    },

    signin{Name}: (req, res) => {
        {modelName}.findOne({ email: req.body.email }, (err, {name}) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: err.message,
                    request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                });
            }
            if (!{name}) {
                return res.status(404).json({
                    status: 404,
                    message: '{Name} not found !',
                    request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                });
            }
            bcrypt.compare(req.body.password, {name}.password, (err, valid) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        message: err.message,
                        request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                    });
                }
                if (!valid) {
                    return res.status(401).json({
                        status: 401,
                        message: "Bad Password !",
                        request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                    });
                }

                return res.status(200).json({
                    {name}Id: {name}._id,
                    token: jwt.sign(
                        { {name}Id: {name}._id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: process.env.TOKEN_EXPIRATION }
                    )
                })

            })
        })
    },
       /**
     * Generate By Mudey Formation (https://mudey.fr)
     * {controllerName}.get{Name}s()
     */
       get{Name}sByPage: async (req, res) => {
        try {
            let pageNumber = req.query?.pageNumber ? parseInt(req.query?.pageNumber) : 1
            let pageLimit = req.query?.pageLimit ? parseInt(req.query?.pageLimit) : 5

            let allCount = await {modelName}.find({}).count()

            if(pageNumber >  Math.ceil(allCount/pageLimit)){
                const value = Math.ceil(allCount/pageLimit)
                pageNumber = value > 0 ? value : 1
            }

            let {name}s = await {modelName}.find({})
                // .populate("name")
                .skip((pageNumber - 1) * pageLimit).limit(pageLimit)

            {name}s = {name}s.map((item) => {
                item.created_formatted_with_time_since = moment(item?.created_at).fromNow()
                return item
            })

            return res.status(200).json({
                isSuccess: true,
                status: 200,
                allCount: allCount,
                resultCount: {name}s.length,
                current: pageNumber,
                next: allCount > (pageNumber*pageLimit) ? pageNumber + 1 : null,
                previous: pageNumber - 1 > 0 ? pageNumber - 1 : null,
                results: {name}s.slice(0, pageLimit),
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            })
            

    } catch(error) {

        console.log(error);

        return res.status(500).json({
            isSuccess: false,
            status: 500,
            message: 'Error when getting {name}.',
            error: error,
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
        });
    }
},
    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * {controllerName}.get{Name}s()
     */
    get{Name}s: async (req, res) => {
        try {
            const {name}s = await {modelName}.find({})

            return res.json({
                isSuccess: true,
                status: 200,
                resultCount: {name}s.length,
                results: {name}s,
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });

    } catch(error) {

        console.log(error);

        return res.status(500).json({
            isSuccess: false,
            status: 500,
            message: 'Error when getting {name}.',
            error: error,
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
        });
    }
},

    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * {controllerName}.show{Name}ById()
     */
    search{Name}ByTag: async (req, res) => {
        try {

            let filter = {}
            let pageNumber = req.query?.pageNumber ? parseInt(req.query?.pageNumber) : 1
            let pageLimit = req.query?.pageLimit ? parseInt(req.query?.pageLimit) : 5

            

            const email = req.query?.email ? new RegExp(req.query.email, 'i') : null
            const name = req.query?.name ? new RegExp(req.query.name, 'i') : null
            const content = req.query?.content ? new RegExp(req.query.content, 'i') : null
            const description = req.query?.description ? new RegExp(req.query.content, 'i') : null
            const startDate = req.query?.startDate ? new Date(req.query?.startDate) : null
            const endDate = req.query?.endDate ? new Date(req.query?.endDate) : null

            if(email){
                filter.email = email
            }
            if(name){
                filter.name = name
            }
            if(content){
                filter.content = content
            }
            if(description){
                filter.description = description
            }
            if (startDate) {
                filter.created_at = { $gt: startDate }
            }

            if (endDate) {
                if (filter.created_at) {
                    filter.created_at = { ...filter.created_at, $lt: endDate }
                } else {
                    filter.created_at = { $lt: endDate }
                }
            }

            let allCount = await {modelName}.find(filter).count()

            if(pageNumber >  Math.ceil(allCount/pageLimit)){
                const value = Math.ceil(allCount/pageLimit)
                pageNumber = value > 0 ? value : 1
            }
                // .populate({ path: "account", options: { sort: { 'created_at': -1 } } })
                // .sort('-created_at')
                // .skip((pageNumber - 1) * pageLimit).limit(pageLimit)

            let {name}s = await {modelName}.find(filter)
                // .populate({ path: "account", options: { sort: { 'created_at': -1 } } })
                .sort('-created_at')
                .skip((pageNumber - 1) * pageLimit).limit(pageLimit)

            {name}s = {name}s.map((item) => {
                    item.created_formatted_with_time_since = moment(item?.created_at).fromNow()
                    return item
            })

            return res.status(200).json({
                isSuccess: true,
                status: 200,
                filter: req.query,
                resultCount: allCount,
                allCount: allCount,
                current: pageNumber,
                next: allCount > (pageNumber*pageLimit) ? pageNumber + 1 : null,
                previous: pageNumber - 1 > 0 ? pageNumber - 1 : null,
                results: {name}s.slice(0, pageLimit),
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            isSuccess: false,
            status: 500,
            message: 'Error when getting {name}.',
            error: error,
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
        });

    }
    },
    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * {controllerName}.show{Name}ById()
     */
    show{Name}ById: async (req, res) => {
        try {
            const id = req.params.id;
            const {name} = await {modelName}.findOne({ _id: id })

            if (!{name}) {
                return res.status(404).json({
                    isSuccess: false,
                    status: 404,
                    message: 'No such {name}',
                    request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                });
            }

            return res.status(200).json({
                isSuccess: true,
                status: 200,
                result: {name},
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            isSuccess: false,
            status: 500,
            message: 'Error when getting {name}.',
            error: error,
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
        });

    }
    },

    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * {controllerName}.create{Name}()
     */
    create{Name}: async (req, res) => {
    try {

        
        if(req.file){
            var  {name}  = JSON.parse(req.body.{name})
        }else{
            var { {name} } = req.body
        }

        if(!{name}){
            return res.status(500).json({
                isSuccess: false,
                status: 422,
                message: 'Missing params of {name}.',
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });
        }

        if(!Object.keys({name}).length){
            return res.status(422).json({
                isSuccess: false,
                status: 422,
                message: 'Empty {name} !',
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });
        }

        // if (req.file) {
        //     {name}.imageUrl = `${req.protocol}://${req.get('host')}/assets/files/${req.file.filename}`
        // }

        {name} = new {modelName}({ ...{name} })

        {name}.created_at = {name}?.created_at ? {name}.created_at : new Date()

        await {name}.save()

        return res.status(201).json({
            isSuccess: true,
            status: 201,
            message: "{name} is saved !",
                {name},
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                isSuccess: false,
                status: 500,
                message: 'Error when creating {name}.',
                error: error,
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });
        }
    },

    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * {controllerName}. update{Name}ById()
     */
    update{Name}ById: async (req, res) => {
    try {
        const id = req.params.id;
        if(req.file){
            var  {name}  = JSON.parse(req.body.{name})
        }else{
            var { {name} } = req.body
        }

        if(!{name}){
            return res.status(500).json({
                isSuccess: false,
                status: 422,
                message: 'Missing params of {name}.',
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });
        }
        if(!Object.keys({name}).length){
            return res.status(500).json({
                isSuccess: false,
                status: 422,
                message: 'Empty {name} !',
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });
        }
        // if (req.file) {
        //     console.log({ imageUrl: {name}.imageUrl });
        //     const old_image = {name}.imageUrl
        //     {name}.imageUrl = `${req.protocol}://${req.get('host')}/assets/files/${req.file.filename}`

        //     if (old_image) {
        //         const filename = "public/assets/" + old_image.split('/assets/')[1];
        //         console.log({ filename });
        //         fs.unlink(filename, (err) => {
        //             if (err) {
        //                 console.log(err.message);
        //             }
        //         });
        //     }
        // }

        {name}.updated_at = {name}?.updated_at ? {name}.updated_at : new Date()

        delete {name}?._id
        await {modelName}.updateOne({ _id: id }, { ...{name} })

        return res.status(200).json({
            isSuccess: true,
            status: 200,
            message: "{name} is updated !",
                {name},
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            isSuccess: false,
            status: 500,
            message: 'Error when updating {name}.',
            error: error,
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
        });
    }
    },
    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * {controllerName}.sort{Name}ByPosition
     */
    sort{Name}ByPosition: (req, res) => {
    try {

        const { datas } = req.body

        datas.forEach(async (elt) => {
            await {modelName}.updateOne({ _id: elt._id }, {
                $set: { position: elt.position }
            })
        });


        return res.status(200).json({
            status: 200,
            isSuccess: true,
            message: "{name} sorted !",
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            status: 500,
            isSuccess: false,
            error: error,
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
        })

        }
    },

    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * {controllerName}.remove{Name}ById()
     */
    remove{Name}ById: async (req, res) => {
        try {
            var id = req.params.id;

            const {name} = await {modelName}.findOne({ _id: id }, { imageUrl: true })
            if ({name}) {
                // const old_image = {name}.imageUrl
                // if (old_image) {
                //     const filename = "public/assets/" + old_image.split('/assets/')[1];
                //     console.log({ filename });
                //     fs.unlink(filename, (err) => {
                //         if (err) {
                //             console.log(err.message);
                //         }
                //     });
                // }
                await {modelName}.deleteOne({ _id: id })


                return res.status(204).json({
                    // 204 No Content
                    // isSuccess: true,
                    // status: 204,
                    // message: 'Data deleted ! .',
                });

            }

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
                message: 'Error when deleting {name}.',
                error: error,
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });

        }
    }
};
