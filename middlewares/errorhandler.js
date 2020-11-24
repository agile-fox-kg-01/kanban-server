const errorHandler = (err, req, res, next) => {
    if (err.name == 'ValidationError') {
        return res.status(400).json({
            error: err.error
        })
    } else if (err.name == 'Unauthorized') {
        return res.status(401).json({
            error: err.error
        })
    } else if (err.name == 'NotFound') {
        return res.status(404).json({
            error: err.error
        })
    } else {
        return res.status(500).json({error: 'internal server error'})
    }
}
module.exports = errorHandler