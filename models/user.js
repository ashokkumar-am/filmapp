const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        status: { type: Number, default: 1 },

    }, {
    timestamps: true,
},
);

//method to encrypt password
UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//method to decrypt password
UserSchema.methods.validatePassword = function (password) {
    var userData = this;
    return bcrypt.compareSync(password, userData.password);
};

module.exports = mongoose.model("user", UserSchema);
