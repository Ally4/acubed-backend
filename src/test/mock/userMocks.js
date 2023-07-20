import { encode } from '../../utils/jwt';

exports.token = {
    admin: encode({email: "Josh@gmail.com"}),
    operator: encode({email: "Josh123@gmail.com"}),
    NotCorrect: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiSm9zaEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjA5NDE0asaMjIzLCJleHAiOjE2MDk0MTc4MjN9.VsryK_CeXlejW7hGcNabWge2h_vyK_MXLquvuW0_cc`,
}

exports.NotExistEmail = {
    email: "kamali@gmail.com",
    role: "operator"
}

exports.InvalidEmail = {
    email: "kamaligmail.com"
}

exports.requiredRole = {
    email: "Josh@phantom.com"
}

exports.roleNotIncluded = {
    email: "Josh@phantom.com",
    role: "dancer"
}

exports.rightInput = {
    email: "Josh@phantom.com",
    role: "operator"
}

exports.requiredEmail = {
    role: "dancer"
}