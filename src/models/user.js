import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email Already Registered!"],
        required: [true, "Email is Required!"]
    },
    username: {
        type: String,
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
        unique: [true, "Username Already in Use!"],
        required: [true, "Username is Required!"]
    },
    image: String
})

const User = models.User || model("User", UserSchema)
export default User