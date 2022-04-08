export const getToken = () =>{
    return localStorage.getItem('token')
} 

export const getAuthHeader = ( )=>{
    const token = getToken()
    return { 
            headers: {
            Authorization: 'Bearer ' + token
        }
    }
}