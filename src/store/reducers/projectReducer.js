const initState = {

};

const projectReducer = ( state = initState, action) =>{
    switch(action.type){
        case 'FILE_UPLOADED':
            console.log("FILE_UPLOADED");
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log("created project",action.err);
            return state   
        default:
            return state
            
    }
    
}

export default projectReducer;