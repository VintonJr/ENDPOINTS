const data = require('../users.json')
const mssql = require('mssql')
const sqlConfig = require('../config/config');
const { user } = require('../config/config');
const poolPromise = require('../config/poolPromise')


module.exports = {
    home: (req, res) => res.send("Welcome"),

    getUsers: async(req, res) => {
        let pool = await poolPromise()
        pool.query(`select * from usersData`).then(results => {
            console.log(results.recordset)
            res.json({
                status: 200,
                success: true,
                message: "success",
                results: results.recordset
            })
        })
    },



    // const users = {
    //    status:200,
    /*  success:true,
        message:"Here are the users",
        data:data
    }
    res.send(users)
    const fail= {
        status:200,
        success:true,
        message:"Here are the users",
        data:[]
    }
    res.send()
}*/
    getUser: async(req, res) => {
        const { email } = req.params
        let pool = await poolPromise()
        pool.query(`SELECT * FROM usersData WHERE email='${email}'`).then(results => {
            let user = results.recordset[0]
            if (user) {
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "The user is:",
                    results: user
                })
            }

            res.status(404).json({
                status: 404,
                success: false,
                message: "not found",
                results: {}
            })

        })
    },


    create: async(req, res) => {
        let { id, first_name, last_name, email, gender, Password } = req.body
        let pool = await poolPromise()
        pool.query(`insert into usersData 
                    VALUES('${id}', '${first_name}', '${last_name}', '${email}', '${gender}', '${Password}')`)
            .then(results => {
                if (results.rowsAffected) {
                    res.send("user added")
                    console.log("user added")
                }
            })

    }
}
const login = async(req, res) => {
    const { email, Password } = req.body
    let pool = await poolPromise()
    pool.query(`SELECT * FROM USERS WHERE email='${email}'`).then(results => {
        let user = results.recordset[0]
        if (user) {
            let pass = user.Password
            if (Password === pass) {
                return res.json({
                    status: 200,
                    success: true,
                    message: "Logged in successfully",
                    results: user
                })
            } else {
                res.status(403).json({
                    status: 404,
                    success: false,
                    message: "Wrong credentials",
                    results: {}
                })
            }
        }
    })

}