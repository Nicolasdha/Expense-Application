import {firebase, googleAuthProvider, facebookAuthProvider, twitterAuthProvider} from '../firebase/firebase'


export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLoginGoogle = () =>{
    return (dispatch) =>{
        return firebase.auth().signInWithPopup(googleAuthProvider)
    };
};

export const startLoginFacebook = () =>{
    return (dispatch) =>{
        return firebase.auth().signInWithPopup(facebookAuthProvider)
    };
};

export const startLoginTwitter = () =>{
    return (dispatch) =>{
        return firebase.auth().signInWithPopup(twitterAuthProvider)
    };
};


export const startLogout = () =>{
    return () =>{
        return firebase.auth().signOut()
    };
};