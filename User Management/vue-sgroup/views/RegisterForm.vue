<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const URL_BE = ref('')
URL_BE.value = import.meta.env.VITE_AWS_API
const username = ref('')
const password = ref('')
const name = ref('')
const age = ref('')
const gender = ref('')
const email = ref('')
const confirmPassword = ref('')

const register = () => {
  console.log('hehe')
  axios
    .post(`http://localhost:3000/auth/register`, {
      name: name.value,
      age: parseInt(age.value),
      username: username.value,
      password: password.value,
      gender: gender.value,
      email: email.value,
      confirmPassword: confirmPassword.value
    })
    .then((response) => {
      router.push('/')
      console.log(response.data)
    })
    .catch((Error) => {
      console.log(Error)
    })
}
</script>

<template>
  <div class="login-form">
    <form @submit.prevent="register">
      <div class="form-group">
        <label>Name</label>
        <input v-model="name" type="text" name="name" />
      </div>

      <div class="form-group">
        <label>Age</label>
        <input v-model="age" type="number" name="age" />
      </div>
      <div class="form-group">
        <label>Gender</label>
        <select
          v-model="gender"
          class="w-full px-4 py-2 border border-black rounded focus:outline-none focus:border-blue-500"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Khác</option>
        </select>
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="username" type="text" id="username" name="username" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" name="password" />
      </div>
      <div class="form-group">
        <label>confirmedPassword</label>
        <input v-model="confirmPassword" type="password" name="confirmPassword" />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="text" name="email" />
      </div>

      <button @click.prevent="register" type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped>
.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #eee;
  cursor: pointer;
}
</style>
