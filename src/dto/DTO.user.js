export default class UserDTO {
    constructor({ fullname, email, phone, username, password, role, cart_id }) {
        this.fullname = fullname
        this.email = email
        this.phone = phone
        this.username = username
        this.password = password
        this.role = role
        this.cart_id = cart_id
    }
}

