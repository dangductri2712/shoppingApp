import axios from 'axios';
export async function findUserInfo(email){
    var selectedUser = {};
    await axios.get(`http://localhost:8080/user/${email}`)
    .then(res=>{
        console.log(res.data);
        selectedUser = res.data;
    })  
    .catch(err=>{
        console.log("Something wrong at findUserInfo.js: "+err);
    })

    return selectedUser;
}

