<template>
  <div>
    <div>
      <label for="searchInput">Search:</label>
      <input type="text" id="searchInput" v-model="searchQuery">
    </div>

    <div>
      <label for="ticketType">Ticket Type:</label>
      <select id="ticketType" v-model="selectedType">
        <option value="all">All</option>
        <option value="standard">Standard Request</option>
        <option value="non-standard">Non-Standard Request</option>
      </select>
    </div>

    <div>
      <label for="viewStatus">View:</label>
      <select id="viewStatus" v-model="viewStatus">
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
    </div>

    <ul>
      <li v-for="ticket in filteredTickets" :key="ticket.id">
        <div @click="showTicketDetails(ticket)">
          <h3>{{ ticket.title }}</h3>
          <div v-if="ticket.showDetails">
            <p>Status: {{ ticket.status }}</p>
            <p>Opened {{ ticket.openedDate }} ago</p>
            <p>Created at: {{ ticket.createdAt }}</p>
            <p>Updated at: {{ ticket.updatedAt }}</p>
            <p>Requested by: {{ ticket.requestedBy }}</p>
            <input type="text" v-model="newMessage" placeholder="Type your message here">
            <button @click="postMessage(ticket)">Post</button>
            <div v-for="dialog in ticket.dialog" :key="dialog.id">
              <p>{{ dialog.username }}: {{ dialog.message }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      selectedType: 'all',
      viewStatus: 'all',
      newMessage: '',
      tickets: [
        {
          id: 1,
          title: 'Sample Ticket 1',
          status: 'open',
          openedDate: '25d',
          createdAt: '2023-11-01',
          updatedAt: '2023-11-05',
          requestedBy: 'UserA',
          showDetails: false,
          dialog: [
            { username: 'UserX', message: 'Hello!' },
            { username: 'UserA', message: 'Hi, how can I help you?' }
          ]
        },
        {
          id: 2,
          title: 'Sample Ticket 2',
          status: 'closed',
          openedDate: '40d',
          createdAt: '2023-10-15',
          updatedAt: '2023-11-20',
          requestedBy: 'UserB',
          showDetails: false,
          dialog: [
            { username: 'UserY', message: 'This is a closed ticket' },
            { username: 'UserB', message: 'Thank you!' }
          ]
        },
        // ... diğer mock ticket verileri
      ]
    };
  },
  computed: {
    filteredTickets() {
      // Filtreleme işlemleri burada
      return this.tickets;
    }
  },
  methods: {
    showTicketDetails(ticket) {
      ticket.showDetails = !ticket.showDetails;
    },
    postMessage(ticket) {
      if (this.newMessage.trim() !== '') {
        if (!ticket.dialog) {
          ticket.dialog = [];
        }
        ticket.dialog.push({ username: 'UserX', message: this.newMessage });
        this.newMessage = '';
      }
    }
  }
};
</script>

<style scoped>
/* Stillemeler buraya eklenebilir */
</style>
