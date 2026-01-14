import router from "@/router";

export const authToken = async () => {
    //Hämtar token
    const token = localStorage.getItem('token')
    //Om det inte finns token så skickas användaren till logga in
    if(!token){
        router.push('/login')
        return false
    }
    try {
        const resp = await fetch("https://backend-projekt-fullstack.onrender.com/auth", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ` + token
            }
        })
        if(!resp.ok){
            router.push('/login')
            return false
        }
        if(resp.ok) {
            const acceptedToken = await resp.json()
            console.log('Välkommen ' + acceptedToken.user)
            return true
        }
        } catch (error) {
            router.push('/login')
            return false
        }
}