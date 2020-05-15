export const create=(userId,token,post)=>{
    return fetch(`http://localhost:8080/post/new/${userId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));
}

export const list=(token)=>{
    return fetch(`http://localhost:8080/posts`,{
        method: "GET",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}