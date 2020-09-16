export default function authHeader() {
    // return authorization header with jwt token
    const authorization_token =   localStorage.getItem('accessToken')
   
    if (authorization_token) {
        return { Authorization: `Bearer ${authorization_token}` };
    } else {
        return {};
    }
}