export const list=()=>{
    return fetch(`http://localhost:8080/users`,{
        method: "GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}