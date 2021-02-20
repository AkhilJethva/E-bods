export const  fileUpload = (file) =>{
    return (dispatch, getState , { getFirebase,getFirestore }) =>{
        const firebase = getFirebase();
        
        const storageRef = firebase.storage().ref()
        const fileRef = storageRef.child(`images/${file.name}`)
        fileRef
            .put(file)
            .then((snap) => console.log('upload successful', snap))
            .catch((err) => console.error('error uploading file', err))

        // firebase.auth().createUserWithEmailAndPassword(
        //     newUser.email,
        //     newUser.password
        // ).then((resp) => {
        //     return firestore.collection('users').doc(resp.user.uid).set({
        //         firstName: newUser.firstName,
        //         lastName: newUser.lastName,
        //         initials: newUser.firstName[0] + newUser.lastName[0]
        //     })
        // }).then(()=>{
        //     dispatch({ type: 'SIGNUP_SUCCESS' })
        // }).catch((err)=>{
        //     dispatch({type: 'SIGNUP_ERROR', err})
        // })
    }
}