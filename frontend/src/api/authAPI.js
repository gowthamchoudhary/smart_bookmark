const BASE_URL = " http://127.0.0.1:8000/auth";

export async function registerUser(email,password){
    const res = await fetch(`${BASE_URL}/register`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({email,password}),
        }

    );
    const data =await res.json();
    if(!res.ok){
        throw new Error(data.detail||"registration failed");
    }
   return data;
}

export async function loginUser(email,password) {
    const formData = new URLSearchParams()
    formData.append("username",email);
    formData.append("password",password)
    const res = await fetch(`${BASE_URL}/login`,{
        method:"POST",
        headers:{
            "content-type": "application/x-www-form-urlencoded",
        },
        body:formData,
    });    
    const data =  await res.json();
    if (!res.ok){
        throw new  Error(data.detail||"Login failed");
    }
    localStorage.setItem("access_token",data.access_token);
    localStorage.setItem("refresh_token",data.refresh_token);
    return data;
}
export async function getme() {
    const token=localStorage.getItem("access_token");
    const res = await fetch(`${BASE_URL}/me`,{
        headers:{
            Authorization:`Bearer ${token}`,
        },
    });
    const data = await res.json();
    if(!res.ok){
        throw new Error(data.detail||"Unauthorization");
    }
    return data;

}
export function logoutLocal(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
}