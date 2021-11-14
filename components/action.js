export function addCurrentUser(currentUser){
    return{
        type : 'CURRENTUSER',
        currentUser
    }
}