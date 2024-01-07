import axios from "axios"
import {defineStore} from "pinia"
import { ref, unref } from "vue"
import {useRouter} from "vue-router"



  const useAuthStore = defineStore("auth", {
    state: () => ({
     router:useRouter()
    }),
    
    actions:{
        login(username,password){ 
             console.log("hello Viet")
     axios.post('http://localhost:3000/auth/login', {
    username,
    password
  })
    .then((res) => {
      this.router.push("/DashBoard")
      notify({
        title: "Authorization",
        text: "You have been logged in!",
      })
      if (res.data.token) {
        localStorage.setItem('accessToken', JSON.stringify(res.data.token))
      }
      console.log("login succes")
      return res.data
    }).catch((e) => {
     console.log(e)
    } )
        }

    }
        
})
export default useAuthStore
