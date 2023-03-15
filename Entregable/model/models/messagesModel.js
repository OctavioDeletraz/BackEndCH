import Joi from 'joi'


class Messages {

    constructor(user, avatar, msg) {
        this.user = user
        this.avatar = avatar
        this.message = msg
    }

    equals(message) {
        if (!(message instanceof Messages)) {
            return false
        }
        if (this.tittle != message.user) {
            return false
        }
        if (this.desc != message.avatar) {
            return false
        }
        if (this.img != message.msg) {
            return false
        }
        return true
    }

    static validar(message, required) {
        const MessageSchema = Joi.object({
            user: required ? Joi.string().required() : Joi.string(),
            avatar: required ? Joi.string().required() : Joi.string(),
            msg: required ? Joi.string().required() : Joi.string()
        })

        const { error } = MessageSchema.validate(message)
        if (error) {
            throw error
        }
    }
}

export default Messages