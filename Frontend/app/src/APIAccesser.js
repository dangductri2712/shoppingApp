import axios from "axios";
async function APIAccesser(endpoint, method="", body={}){
    const domain = "http://localhost:8080/";
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
            await axios.post(domain+endpoint, body)
            .then(res=>{
                console.log(res.data);
                result.data = res.data;
            })
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
    }
    console.log(result);
    return result;
}

export default APIAccesser;