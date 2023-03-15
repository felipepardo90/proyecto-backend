export default class UserDTO {
    constructor({ id, fullname, email, phone, username, password }, cart) {
        this.id = id
        this.fullname = fullname
        this.email = email
        this.phone = phone
        this.username = username
        this.password = password
        this.cart = cart
    }
}