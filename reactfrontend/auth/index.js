export const signup=(user)=>{
    
    return(
     fetch(`http://localhost:8080/signup`,{ 
         method: "POST", 
         headers: {
             Accept: "application/json",
             "Content-Type": "application/json" 
         },
         body: JSON.stringify(user)
     }
     )
     .then(response=>{
         return response.json();
     })
     .catch(err=>console.log(err)) 
    );
        
    
 }; 

 export const signin=(user)=>{
    return (
        fetch(`http://localhost:8080/signin`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response=>{
        return response.json();
    })
    .catch(error=>{
        console.log(error);
    })
    );
};

export const authenticate=(jwt,next)=>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(jwt));//storing token(userinfo) in local storage
        next();
    }
};

export const signout=(next)=>{
    if(typeof window !== "undefined")
        localStorage.removeItem("jwt");
    next();
    return (
        fetch(`http://localhost:8080/signout`,{
            method: "GET"
        })
        .then(response=>{
            response.json();
        })
        .catch(error=>{
            console.log(error);
        })
    ); 
};

export const isAuthenticated=()=>{
    if(typeof window !==undefined)
    {
        if(localStorage.getItem("jwt"))
            return JSON.parse(localStorage.getItem("jwt"));
        else 
            return false;
    }
    return false;
};
