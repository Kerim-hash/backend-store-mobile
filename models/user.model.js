const mongoose = require("mongoose");


const UserSchema = mongoose.Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: Number},
    street: {type: String, default: ''},
    apartment: {type: String, default: ''},
    city: {type: String, default: ''},
    zip: {type: String, default: ''},
    country: {type: String, default: ''},
    isAdmin: {type: Boolean, default:false},
  },
  {
    timestamps: true,
  }
);


UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
  })
  UserSchema.set('toJSON', {
    virtuals: true,
    transform: function (_, obj,) {
      // delete obj.password;
      delete obj.confirm_hash;
      return obj;
    }
  })


  
  
exports.UserModel = mongoose.model("User", UserSchema);
exports.UserSchema = UserSchema

