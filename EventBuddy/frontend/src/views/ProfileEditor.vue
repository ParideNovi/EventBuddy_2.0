<template>
  <div class="container mt-2">
    <div class="row">
      <div class="col-12">
        <h1 class="mb-3">{{ userUsername }}: Modifica il tuo Profilo</h1>
        <form @submit.prevent="onSubmit">
          <!--@ onSubmit.prevent = prevent the page to reload -->
          <!--Picture Profile-->

          <textarea
            v-model="profile_bio"
            class="form-control"
            placeholder="Biografia"
            rows="4"
          >
          </textarea>
          <textarea
            v-model="profile_location"
            class="form-control"
            placeholder="Città"
            rows="1"
          >
          </textarea>
          <div class="form-row">
            <div class="date-control mt-2 col">
              <p>Data nascita</p>
              <input
                type="date"
                id="profile-birth"
                name="profile-birth"
                v-model="profile_birth_date"
                value=""
              />
            </div>

            <!-- btn Upload image-->

            <div class="mt-2 col-sm-4">
              <div class="name">Immagine Profilo</div>
              <div class="btn blue-gradient btn-sm float-left">
                <input
                  type="file"
                  id="file"
                  ref="file"
                  v-on:change="handleFileUpload()"
                />
              </div>
            </div>
          </div>
          <br />
          <button
            class="btn btn-success"
            type="submit"
          >
            Aggiorna Profilo
          </button>
        </form>

        <p class="error mt-2">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from "../common/api.service";
import axios from "axios";
import { CSRF_TOKEN } from "../common/csrf_token.js";
export default {
  name: "ProfileEditor",

  props: {
    userUsername: {
      type: String,
      required: true
    },
    previousProfile: {
      type: String,
      required: false
    }
  },

  data() {
    return {
      //  profile_avatar: this.previousProfile || null,
      profile_bio: this.previousProfile || null,
      profile_location: this.previousProfile || null,
      profile_birth_date: this.previousProfile || null,
      file: null,
      error: null
    };
  },
  //to fill the fields at onPageLoad??
  async beforeRouteEnter(to, from, next) {
    if (to.params.userUsername !== undefined) {
      let endpoint = `/api/profiles/${to.params.userUsername}/`;
      await apiService(endpoint).then(data => {
        to.params.previousProfile = data.content;
      });
    }
    return next();
  },

  methods: {
    /*
        Handles a change on the file upload
      */
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file.name);
    },
    submitFile() {
      /*
                Initialize the form data
            */
      let formData = new FormData();

      /*
                Add the form data we need to submit
            */
      formData.append("file", this.file);

      /*
          Make the request to the POST `api/profiles/${this.userUsername}/avatar/` URL  
        */
      axios
        .put(
          `http://127.0.0.1:8000/api/profiles/${this.userUsername}/avatar/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-CSRFToken": CSRF_TOKEN
            }
          }
        )
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },

    onSubmit() {
      //profile_avatar
      //POST in the API/profiles/
      let endpoint = `/api/profiles/${this.userUsername}/`;
      let method = "PUT";
      //if (this.previousProfile) {
      //  method = "PUT";
      //  endpoint += `${this.userUsername}/`;
      //} //call the service for the POST request and then..
      apiService(endpoint, method, {
        bio: this.profile_bio,
        location: this.profile_location,
        birth_date: this.profile_birth_date,
        avatar: this.file
      }).then(profile_data => {
        //redirect router to the event description
        this.$router.push({
          name: "user-profile",
          params: { userUsername: profile_data.user } //event just "POSTED"
        });
      });
    }
  },

  created() {
    document.title = "Editor - EventBuddy";
  }
};
</script>
