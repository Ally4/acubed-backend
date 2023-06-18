exports.token = {
    admin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjA3NTA3NTU0LCJleHAiOjE2MzkwNDM1NTR9.W7XUTEnp_TE12w04K8SpJK4mfS7x9a2PjA9YpJ3qb-k",
    operator: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA3NTA4Nzk2LCJleHAiOjE2MzkwNDQ3OTZ9.p58CnwiVtvYLlytb80XKV9xSVtDsFc6wx72E76E0P-M",
    NotCorrect: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjAyNTkyMzU1LCJleHAiOjE2MTAzNjgzNTV9.jaTYL-S7lkBdrsG-_tVYwzVxwjj4ClevfbC14UNdjrw`
}

exports.NotExistEmail = {
    email: "ncuti@gmail.com",
    role: "operator"
}
exports.isNotInSystem = {
    email: "ncuti@gmail.com",
    password:"password",
    confirmPassword:"password"
}
exports.InvalidEmail = {
    email: "ncutigmail.com"
}
exports.requiredRole = {
    email: "emmanuelnkubito2@gmail.com"
}

exports.roleNotIncluded = {
    email: "emmanuelnkubito2@gmail.com",
    role: "pointer"
}

exports.rightInput = {
    email: "emmanuelnkubito2@gmail.com",
    role: "operator"
}

exports.requiredEmail = {
    role: "pointer"
}

exports.rightEmail ={
    email: "emmanuelnkubito2@gmail.com"
}

exports.invalidPassword ={
    password: "asd"
}
exports.shortPassword ={
    email:"emmanuelnkubito2@gmail.com",
    password: "asd"
}
exports.validPasswords ={
    password: "password",
    confirmPassword: "password"
}
exports.unMatchedPasswords ={
    password: "password",
    confirmPassword: "passwordryus"
}
exports.confirmPassword ={
    confirmPassword: "password"
}
exports.emptyconfirmPassword ={
    password:"password",
    confirmPassword: ""
}
exports.emptyPassword ={
    email:"emmanuelnkubito2@gmail.com",
    password:""
 }
exports.emptyEmail ={
   email:""
}
 exports.isNotRegistared ={
    email:"karigirwa@yahoo.fr"
 }
 exports.correctInfo = {
    email: "admin@phantom.com",
    password:"admin"
 }
 exports.inCorrectInfo = {
    email: "emmanuelnkubito2@gmail.com",
    password:"adminds"
 }
