<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password
        });
        console.log(response.data);

        if (response.status === 200 && response.data.redirect === '/') {
          sessionStorage.setItem('user', JSON.stringify(response.data.user));
          this.$router.push('/'); 
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
