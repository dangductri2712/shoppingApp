import axios from 'axios';
export async function findUserInfo(uid){
    var selectedUser = {};
    await axios.get(`http://localhost:8080/user/${uid}`)
    .then(res=>{
        console.log(res.data);
        selectedUser = res.data;
    })  
    .catch(err=>{
        console.log("Something wrong at findUserInfo.js: "+err);
    })

    return selectedUser;
}

