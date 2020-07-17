function customErrorHandler(err, req, res, next) {
    switch (err.name) {
        case "SequelizeValidationError":
            res.status(400).json({
                code: "400",
                message: err.errors.map(error => error.message)
            })
            break;

        case "Bad Request":
            res.status(400).json({
                code: "400",
                message: "invalid email/password"
            })
            break;

        case "Unauthorized":
            res.status(401).json({
                code: "401",
                message: "Please login to use this application!"
            })
            break;

        case "Unauthorized User":
            res.status(401).json({
                code: "401",
                message: "You are unauthorized to modify this data!"
            })
            break;

        case "Not Found":
            res.status(404).json({
                code: "404",
                message: "Not Found"
            })
            break;

        default:
            res.status(500).json({
                code: "500",
                message: "Internal Server Error"
            })
            break;
    }
}

module.exports = { customErrorHandler }