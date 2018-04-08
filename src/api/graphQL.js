// const API_URL = require('./base')

// const query = 
export const getAllCoders = async ()=>{
    try{
        const response = await fetch( "/graphql", {
                method:'POST',
                headers: {
                        'Content-Type': 'application/json'
                    },
                body: `{"query":"{getAllCoders {id firstName lastName knownFor{name}}}"}`
        });
        const res = await response.json();
        console.log(res)
        return  res.data
    }catch (err){
        console.log( `error: ${err}` )
    }
}