

<template>
  <div class=" m-auto ">
    <div class="search-bar flex justify-around mx-30 my-4">
      <input @input="event => search = event.target.value" type="text" name="" id="" placeholder="Search User"
        class="px-1 py-1 border-slate-700 border-solid border-2" />
      <button class="px-3 py-2 bg-sky-600 text-white">+ Create New</button>
    </div>
    <table class="table-auto w-full px-20 mt-5">
      <thead class="text-xs text-gray-700 uppercase py-4 bg-white">
        <tr scope="col" class="px-8 py-3 bg-white">
          <th v-for="column in tableColumns " class="px-5 text-black">
            {{ column }}
          </th>

        </tr>
      </thead>

      <tbody>
        <tr v-for="user in UserList" :key="user">
          <td class="py-4 ">
            <div class="flex items-center">
              <img class="w-10 h-10 rounded-full " :src="avatar" alt="avatar" />
              <div class="mx-3">
                <p>{{ user.username}}</p>
                <b>{{ user.email }}</b>
              </div>
            </div>
          </td>
          <td class="px-3">{{ user.age }}</td>
          <td class="px-4">{{ user.gender }}</td>
          <td class="px-5">{{ user.CreatedAt }}</td>
          <td class="relative">
            <buttonAction :key="user.id" :user="user" @deleteUser="onDeleteUser" @showForm="formId = user.id" />

          </td>
          <UpdateForm :user="user" @updateUser="updateUser" @hideForm="formId = null" v-show="user.id === formId"/>
        </tr>
      </tbody>

    </table>
    <el-pagination class=" my-5 flex items-center justify-between" :page-size="5" layout="prev, pager, next"
      :total="totalRecords" @current-change="handlePageChange" />
  </div>
</template>

<script setup>

import UpdateForm from '../../src/components/user/UpdateForm.vue';
import buttonAction from  '../../src/components/buttonAction.vue'
import { computed, onBeforeMount, onMounted, ref, unref } from 'vue';
import axios from 'axios';



const URL_BE = ref('');
URL_BE.value = import.meta.env.VITE_AWS_API

let formId = ref(null)
const search = ref('')
const totalRecords = ref(0)

const UserList = ref([])
const pageNum = ref(1)




let avatar = "https://i.pravatar.cc/300"
const tableColumns = [
  "user",
  "age",
  "gender",
  "Created At",
  "actions"
]

const handlePageChange = (newPage) => {
  pageNum.value = newPage
  getUser(pageNum.value)

}


const getUser = async (pageNumber = 1) => {
  try {
    axios.get(`http://localhost:3000/user/pagination?page=${pageNumber}&limit=5/`).then((res) => {
      UserList.value = res.data.Pagination
      console.log(UserList.value)
    })
  }
  catch (error) {
    console.log(error)
  }

}
const totalRecord = () => {
  axios.get(`http://localhost:3000/user/getUser/`).then((res) => {
    totalRecords.value = res.data.data.length
    console.log(res.data.data.length)
  }).catch((error) => {
    console.log(error)
  })
}

onBeforeMount(async () => {
  await getUser(pageNum.value),
  await totalRecord()
})

const onDeleteUser = async (UserID) => {

  try {
    await axios.delete(`http://localhost:3000/user/${UserID}/`
    )
    window.location.reload()

  }
  catch (error) {
    console.log(error)

  }
}

const updateUser = async (UserID) => {

  try {
    const userUpdate = UserList.value.find((user) => user.id === UserID)
    const res = await axios.put(`http://localhost:3000/user/${UserID}/`, userUpdate)
    console.log(res.data)
    window.location.reload()
  }
  catch (error) {
    console.log(error)
  }
}


const filterUser = computed(() => {
  if (!search.value) {
    return UserList.value
  }
  return UserList.value.filter((user) => {
    for (key in user) {
      if (!user[key]) continue;
      if (user[key].toLowerCase().includes(search.value)) {
        return user
      }
    }
  })
})


</script>
