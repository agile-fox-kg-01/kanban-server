const errorHandler = (err, req, res, next) => {
    console.log(err);
    if(err.name === 'SequelizeValidationError') {
        err = err.errors.map(error => error.message);
        
        res.status(400).json({message: err});
    } else if(err.name === 'SequelizeUniqueConstraintError') {
        err = err.errors.map(error => error.message);
        
        res.status(400).json({message: err.join('')});
    } else if(err.name === '401 Unauthorized') {
        let message = err.errors.message;

        res.status(401).json({message: message})
    } else if(err.name === '403 Forbidden') {
        let message = err.errors.message;

        res.status(403).json({message: message})
    } else if(err.name === '404 Not Found') {
        let message = err.errors.message;

        res.status(404).json({message})
    } else if(err.name === '400 Bad Request') {
        let message = err.errors.message;

        res.status(400).json({message: message});
    } else {
        res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = {errorHandler};