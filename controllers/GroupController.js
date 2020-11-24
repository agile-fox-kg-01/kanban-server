const { Task, User, Group, GroupUser } = require('../models/index')

class GroupController {
    static async browse(req, res, next) {
        try {
            const usergroup = await User.findByPk(req.userLogin.id, {
                include: [
                    { model: Group, as: 'Groups', through: { attributes: [] },
                    include: [
                        { model: Task, include: { model: User, attributes: ['username', 'avatar'] } }
                    ]}
                ]
            })
            res.status(200).json(usergroup.Groups)
        } catch (err) {
            next(err)
        }
    }
    static async read(req, res, next) {
        try {
            const usergroup = await User.findOne({
                where: { id: req.userLogin.id },
                include: [
                    { model: Group, as: 'Groups', through: { attributes: [] }, where: { id: req.params.groupId }, 
                    include: [
                        { model: Task, include: { model: User, attributes: ['username', 'avatar'] } }
                    ]}
                ]
            })
            if (usergroup.Groups.length > 0) {
                res.status(200).json(usergroup.Groups[0])
            } else {
                next({
                    name: 'NotFound',
                    error: 'Group not found'
                })
            }
        } catch (err) {
            next(err)
        }
    }
    static async add(req, res, next) {
        try {
            const { ...data } = req.body
            const group = await Group.create({ ...data, adminId: req.userLogin.id })
            group.setUsers([req.userLogin.id])
            res.status(201).json(group)
        } catch (err) {
            if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
                next({
                    name: 'ValidationError',
                    error: err.errors[0].message
                })
            } else {
                next(err)
            }
        }
    }
    static async join(req, res, next) {
        try {
            const group = await Group.findAll({
                where: { groupCode: req.body.groupCode },
                include: [
                    { model: User, as: 'Users', through: { attributes: [] }}
                ]
            })
            if (group.length === 0) {
                next({
                    name: 'NotFound',
                    error: 'code is wrong or group is not exist'
                })
            } else {
                group[0].Users.forEach(user => {
                    if (user.id === req.userLogin.id) {
                        next({
                            name: 'ValidationError',
                            error: 'you already join in this group'
                        })
                    } else {
                        GroupUser.create({ GroupId: group[0].id , UserId: req.userLogin.id})
                        res.status(201).json({ id: group[0].id, message: 'success join group' })
                    }
                });
            }
        } catch (err) {
            next(err)
        }
    }
    static async out(req, res, next) {
        try {
            const group = await Group.findByPk(req.params.groupId)
            if (group) {
                if (group.adminId === req.userLogin.id) {
                    next({
                        name: 'Unauthorized',
                        error: 'you are admin in this group, try delete it'
                    })
                } else {
                    const data = await GroupUser.destroy({
                        where: { GroupId: req.params.groupId, UserId: req.userLogin.id }
                    })
                    if(data == 0) {
                        next({
                            name: 'Unauthorized',
                            error: 'You havent joined this group yet'
                        })
                    } else {
                        res.status(201).json('success out from group')
                    }
                }
            } else {
                next({
                    name: 'NotFound',
                    error: 'group not found'
                })
            }
        } catch (err) {
            next(err)
        }
    }
    static async delete(req, res, next) {
        try {
            const group = await Group.findByPk(req.params.groupId)
            if (group) {
                if (group.adminId !== req.userLogin.id) {
                    next({
                        name: 'Unauthorized',
                        error: 'Not Authorized to Access this'
                    })
                } else {
                    await Group.destroy({where: {id: req.params.groupId}})
                    res.status(200).json('success delete this group')
                }
            } else {
                next({
                    name: 'NotFound',
                    error: 'group not found'
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = GroupController