<template>
  <div class="main-container">
    <div v-if="loggedIn" class="header-nav-container">
      <ul class="nav-list">
        <router-link to="/tickets"><li>My Tickets</li></router-link>
        <router-link to="/reportissue"><li>Report an Issue</li></router-link>
        <router-link to="/requestsomething"><li>Request Something</li></router-link>
        <li @click="logout">Logout</li>
      </ul>
      <p>Welcome, {{ username }}</p>
    </div>
    <div v-else>
      <p>Please log in to access this content.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      loggedIn: false,
      username: ''
    };
  },
  mounted() {
    this.checkSession();
  },
  methods: {
    async checkSession() {
      try {
        const response = await axios.get('/api/check-session'); // Sunucuya oturum kontrolü için istek gönder

        if (response.data.loggedIn) {
          this.loggedIn = true;
          this.username = response.data.username;
        } else {
          this.loggedIn = false;
          this.username = '';
        }
      } catch (error) {
        console.error('Oturum kontrol hatası:', error);
        // Oturum kontrolü sırasında bir hata oluşursa, istediğiniz şekilde işleyebilirsiniz
      }
    },
    logout() {
      // Çıkış yapma mantığınızı buraya ekleyin
      this.loggedIn = false;
      this.username = '';
    }
  }
}
</script>

<style scoped>
/* Stil tanımlamaları */
</style>
