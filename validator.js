function isInvalidEmail(usrobj){
   return !usrobj.email.includes("@")
}

function isEmptyPayload(usrobj){
    return Object.keys(usrobj).length===0 
}

module.exports =  {isInvalidEmail,isEmptyPayload} 