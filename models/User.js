// const { Schema, model } = require('mongoose');

// const UserSchema = new Schema(
//     {
//         username: {
//             type: String,
//             required: true,
//             unique: true
//         },
//         password: {
//             type: String,
//             required: true,
//         },
//         firstname: {
//             type: String,
//             required: true,
//         },
//         lastname: {
//             type: String,
//             required: true,
//         },
//         email: {
//             type: String,
//             required: true
//         },
//         avatar: {
//             type: String,
//             default: "https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png"
//         },
//         bio: {
//             type: String,
//             default: ""
//         },
//         followers: [{
//             type: Schema.Types.ObjectId,
//             ref: 'user'
//         }],
//         followings: [{
//             type: Schema.Types.ObjectId,
//             ref: 'user'
//         }],
//         posts: [{
//             type: Schema.Types.ObjectId,
//             ref: 'post'
//         }],
//         isAdmin: {
//             type: Boolean,
//             default: false
//         },
//         isMod: {
//             type: Boolean,
//             default: false
//         }
//     },
//     { timestamps: true }
// )

// const UserModel = model('user', UserSchema);

// module.exports = UserModel;