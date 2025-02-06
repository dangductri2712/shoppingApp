import axios from "axios";
async function APIAccesser(endpoint, method="", body={}, others = {}){
    const domain = "https://backend-version1-4.onrender.com/";
    console.log("Accessing API");
    console.log(endpoint)
    let result = {data: "", status: "success"};
    try{

        if(method == "GET"){
            await axios.get(domain+endpoint)
            .then(res=>{
                console.log(res.data);
                result.data = res.data;
            })
        }
        else if(method == "POST"){
            if(others == {}){
                await axios.post(domain+endpoint, body)
                .then(res=>{
                    console.log(res.data);
                    result.data = res.data;
                })
            }
            else{
                await axios.post(domain+endpoint, body, others)
                .then(res=>{
                    console.log(res.data);
                    result.data = res.data;
                })
            }
            
        }
         
        else if(method == "PUT"){
            await axios.put(domain+endpoint, body)
            .then(res=>{
                console.log(res.data);
                result.data = res.data;
            })
        }
    }
    catch(err){
        result.status = "failed";
        result.data = err;
        console.log(err);
        alert(err);
    }
    console.log(result);
    return result;
}

export default APIAccesser;