export default function currentUserReducer(currentUser={}, action){
    switch(action.type){
        case 'CURRENTUSER':
            return action.currentUser
        default:
            return currentUser
    }
}