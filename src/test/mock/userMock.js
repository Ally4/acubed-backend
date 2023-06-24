import { encode } from '../../utils/jwt';

exports.token = {
    admin: encode({email: "Josh@gmail.com",role:"admin"}),
    operator: encode({email: "Josh123@gmail.com",role:"operator"}),
    driver: encode({email: "Josh1234@gmail.com",role:"driver"}),
    NotCorrect: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiSm9zaEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjA5NDE0asaMjIzLCJleHAiOjE2MDk0MTc4MjN9.VsryK_CeXlejW7hGcNabWge2h_vyK_MXLquvuW0_cc`,
}
exports.NotExistEmail = {
    email: "kamali@gmail.com",
    role: "operator"
}
exports.isNotInSystem = {
    email: "kamali@gmail.com",
    password:"password",
    confirmPassword:"password"
}
exports.InvalidEmail = {
    email: "kamaligmail.com"
}
exports.requiredRole = {
    email: "mugemaleo@gmail.com"
}

exports.roleNotIncluded = {
    email: "mugemaleo@gmail.com",
    role: "dancer"
}

exports.rightInput = {
    email: "mugemaleo@gmail.com",
    role: "operator"
}

exports.requiredEmail = {
    role: "dancer"
}

exports.rightEmail ={
    email: "mugemaleo@gmail.com"
}

exports.invalidPassword ={
    password: "kiki"
}
exports.shortPassword ={
    email:"mugemaleo@gmail.com",
    password: "ki"
}
exports.validPasswords ={
    password: "password",
    confirmPassword: "password"
}
exports.unMatchedPasswords ={
    password: "password",
    confirmPassword: "passwordkiki"
}
exports.confirmPassword ={
    confirmPassword: "password"
}
exports.emptyconfirmPassword ={
    password:"password",
    confirmPassword: ""
}
exports.emptyPassword ={
    email:"mugemaleo2@gmail.com",
    password:""
 }
exports.emptyEmail ={
   email:""
}
 exports.isNotRegistared ={
    email:"andela@yahoo.fr"
 }
 exports.correctInfo = {
    email: "Josh@phantom.com",
    password:"admin"
 }
 exports.inCorrectInfo = {
    email: "mugemale@gmail.com",
    password:"adm123"
 }
