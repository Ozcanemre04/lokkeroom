import jwt from 'jsonwebtoken';

export default function jwtTokens({id,name,email}){
    const user = {id,name,email};
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"12h"});
    const refreshToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"2h"});
    return ({accessToken,refreshToken})   
}