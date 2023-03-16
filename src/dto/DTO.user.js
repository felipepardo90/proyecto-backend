export default class UserDTO {
    constructor({ _id, fullname, email, phone, username, password, cartId, role }) {
        this.id = _id
        this.fullname = fullname
        this.email = email
        this.phone = phone
        this.username = username
        this.password = password
        this.cartId = cartId
        this.role = role
    }
}

