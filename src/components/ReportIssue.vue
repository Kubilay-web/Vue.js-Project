<template>
    <div>
      <h1>Report Biomedical Device Issue</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="affectedUser">Affected User:</label>
          <textarea id="affectedUser" v-model="affectedUser" required></textarea>
        </div>
        <div>
          <label for="summary">Summary of the Issue:</label>
          <textarea id="summary" v-model="summary" required></textarea>
        </div>
        <div>
          <label for="describeIssue">Please Describe the Issue:</label>
          <textarea id="describeIssue" v-model="describeIssue" required></textarea>
        </div>
        <div>
          <label for="urgency">Urgency:</label>
          <select id="urgency" v-model="urgency" required>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label for="workingLocation">Where Are You Working:</label>
          <textarea id="workingLocation" v-model="workingLocation" required></textarea>
        </div>
        <div>
          <label for="errorMessages">Any Error Messages You See?</label>
          <textarea id="errorMessages" v-model="errorMessages" required></textarea>
        </div>
        <div>
          <label for="attachments">Add Attachments:</label>
          <input type="file" id="attachments" multiple @change="handleFileUpload">
          <ul>
            <li v-for="file in uploadedFiles" :key="file.name">{{ file.name }}</li>
          </ul>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        affectedUser: '',
        summary: '',
        describeIssue: '',
        urgency: '',
        workingLocation: '',
        errorMessages: '',
        uploadedFiles: [] // Yüklenen dosyaları saklamak için bir dizi
      };
    },
    methods: {
      submitForm() {
        // Form gönderildiğinde yapılacak işlemler burada gerçekleşir.
        console.log('Affected User:', this.affectedUser);
        console.log('Summary of the Issue:', this.summary);
        console.log('Describe Issue:', this.describeIssue);
        console.log('Urgency:', this.urgency);
        console.log('Working Location:', this.workingLocation);
        console.log('Error Messages:', this.errorMessages);
        console.log('Uploaded Files:', this.uploadedFiles);
        
        this.affectedUser = '';
        this.summary = '';
        this.describeIssue = '';
        this.urgency = '';
        this.workingLocation = '';
        this.errorMessages = '';
        this.uploadedFiles = [];
      },
      handleFileUpload(event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
          this.uploadedFiles.push(files[i]);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  