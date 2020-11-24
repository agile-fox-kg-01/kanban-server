const { User, Task, Group, Comment } = require('../models/index')
const { verifyToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
    const token = req.headers.token
    if (!token) {
        res.status(401).json({ error: 'please login first' })
    } else {
        const payload = verifyToken(token)
        try {
            const user = await User.findOne({
                where: {email: payload.email}
            })
            if (!user) {
                res.status(401).json({ error: 'login first' })
            } else {
                req.userLogin = user
                next()
            }
        } catch (err) {
            res.status(500).json({
                error: 'internal server error'
            })
        }
    }
}

async function isOwner(req, res, next) {
    try {
        const task = await Task.findByPk(req.params.id)
        if (!task) {
            res.status(404).json({ error: 'Task not Found' })
        } else {
            if (task.UserId !== req.userLogin.id) {
                res.status(401).json({ 
                    error: 'Not Authorized to Access this'
                })
            } else {
                req.task = task
                next()
            }
        }
    } catch (err) {
        res.status(500).json({
            error: 'Invalid server error'
        })
    }
}

async function isOwnedByGroup(req, res, next) {
    try {
        const task = await Task.findByPk(req.params.id, {
            include: Comment
        })
        if (!task) {
            res.status(404).json({ error: 'Task not Found' })
        } else {
            if (task.GroupId) {
                const { Groups } = await User.findByPk(req.userLogin.id, {
                    include: [
                        { model: Group, as: 'Groups', through: { attributes: [] }}
                    ]
                })
                if (Groups.length === 0) {
                    if (task.UserId === req.userLogin.id) {
                        req.task = task
                        next()
                    } else {
                        res.status(401).json({ 
                            error: 'Not Authorized to Access this Task'
                        })
                    }
                } else {
                    let groupId = []
                    Groups.forEach(data => {
                        groupId.push(data.id)
                    });
                    for (let i = 0; i < groupId.length; ++i) {
                        if (groupId[i] === task.GroupId) {
                            req.task = task
                            next()
                        } else {
                            res.status(401).json({ error: 'Not Authorized to Access this Task' })
                        }
                    }
                    next()
                }
            } else {
                if (task.UserId === req.userLogin.id) {
                    req.task = task
                    next()
                } else {
                    res.status(401).json({ 
                        error: 'Not Authorized to Access this Task bcause its not your task'
                    })
                }
            }
        }
    } catch (err) {
        res.status(500).json({
            error: 'Invalid server error'
        })
    }
}

async function isMemberGroup(req, res, next) {
    try {
        if (req.params.groupId > 0) {
            const isMember = await User.findOne({
                where: { id: req.userLogin.id },
                include: [
                    { model: Group, as: 'Groups', through: { attributes: [] }, where: { id: req.params.groupId }}
                ]
            })
            if(isMember) {
                next()
            } else {
                res.status(404).json({ error: 'Not Authorized to Access this Group' })
            }
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json({
            error: 'Invalid server error'
        })
    }
}

module.exports = {
    authentication, isOwner, isOwnedByGroup, isMemberGroup
}