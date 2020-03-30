<!--Event: If Add a new Event-->
<template>
  <div class=" eventeditor-view  ">
    <div class="container-eventeditor">
      <div class="card card-6">
        <div class="card-heading">
          <h1 class="mb-3 text-center">Aggiungi un evento</h1>
        </div>
        <div class="card-body">
          <form @submit.prevent="onSubmit">
            <!--@ onSubmit.prevent = prevent the page to reload  -->
            <textarea
              v-model="event_title"
              class="form-control"
              placeholder="Quale è il titolo?"
              rows="1"
            >
            </textarea>
            <textarea
              v-model="event_description"
              class="form-control"
              placeholder="Descrizione"
              rows="4"
            >
            </textarea>
            <div class="form-row mt-2">
              <div class="col">
                <div class="name">Città evento</div>
                <input
                  v-model="event_location"
                  class="input--style-6"
                  type="text"
                  placeholder="Città"
                  rows="1"
                />
              </div>
              <div class="col">
                <div class="name">Data e Ora evento</div>
                <input
                  type="datetime-local"
                  id="event-time"
                  name="event-time"
                  v-model="start_date"
                  value=""
                  required
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col">
                <div class="name">Prezzo</div>
                <input
                  type="number"
                  step="0.1"
                  v-model="event_price"
                  class="input--style-6"
                  placeholder="0.0"
                />
              </div>
              <div class="col">
                <div class="name">Dimensione Gruppo</div>
                <input
                  type="number"
                  step="1"
                  v-model="event_group_limit"
                  class="input--style-6"
                  placeholder="0"
                />
              </div>
            </div>
            <!-- btn Upload image-->
            <div class="mt-2 col-sm-4">
              <div class="name">Immagine evento</div>
              <div class="btn blue-gradient btn-sm float-left">
                <input
                  type="file"
                  id="file"
                  ref="file"
                  v-on:change="handleFileUpload()"
                />
              </div>
            </div>

            <button
              class="btn btn-success"
              type="submit"
            >
              Pubblica Evento
            </button>
          </form>
        </div>

        <div class="card-footer">
          <br />
          <p class="error mt-2">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from "../common/api.service";
import axios from "axios";
import { CSRF_TOKEN } from "../common/csrf_token.js";
export default {
  name: "EventEditor",

  props: {
    slug: {
      type: String,
      required: false //slug optional in case is new Event
    },
    previousEvent: {
      //the Event to be modify
      type: String,
      required: false
    }
  },

  data() {
    return {
      event_title: this.previousEvent.title || null,
      event_description: this.previousEvent.description || null,
      start_date: this.previousEvent.start_date || null,
      event_location: this.previousEvent.location || null,
      event_price: this.previousEvent.price || null,
      event_group_limit: this.previousEvent.group_limit || null,
      event_picture: null,
      error: null
    };
  },

  //to full the fields for the edit Event
  async beforeRouteEnter(to, from, next) {
    //if slug exist
    if (to.params.slug !== undefined) {
      let endpoint = `/api/events/${to.params.slug}/`;
      await apiService(endpoint).then(data => {
        to.params.previousEvent = data;
      });
    }
    return next();
  },

  methods: {
    handleFileUpload() {
      this.event_picture = this.$refs.file.files[0];
      console.log(this.event_picture.name);
    },
    /*
        Handles a change on the file upload
      */

    submitFile() {
      /*
                Initialize the form data
            */
      let formData = new FormData();

      /*
                Add the form data we need to submit
            */
      formData.append(
        "file",
        this.event_picture,
        "title",
        this.event_title,
        "description",
        this.event_description,
        "start_date",
        this.start_date,
        "location",
        this.event_location,
        "price",
        this.event_price,
        "group_limit",
        this.event_group_limit
      );

      /*
          Make the request to the POST `api/profiles/${this.userUsername}/avatar/` URL  
        */
      axios
        .post(`http://127.0.0.1:8000/api/events/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": CSRF_TOKEN
          }
        })
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },
    onSubmit() {
      //check title field
      if (!this.event_title) {
        this.error = "Il campo titolo non può essere vuoto!";
      } else if (this.event_title.length > 240) {
        this.error = "Non superare i 240 caratteri per il titolo";
        //check description field
      } else if (!this.event_description) {
        this.error = "Il campo descrizione non può essere vuoto!";
      } else if (this.event_title.length > 400) {
        this.error = "Non superare i 400 caratteri per la descrizione";
        //check location field
      } else if (!this.event_location) {
        this.error = "Il campo città non può essere vuoto!";
      } else if (this.event_location.length > 40) {
        this.error = "Non superare i 40 caratteri per la città";
        //get the endpoint and the method of the API/events
      } else {
        let endpoint = "/api/events/";
        let method = "POST";
        // in case modify Event
        if (this.previousEvent) {
          method = "PUT";
          endpoint += `${this.slug}/`;
        }

        // const fd = new FormData();
        // fd.append("image", this.event_picture, this.event_picture.name);
        // axios.post("http://127.0.0.1:8000/media/", fd).then(res => {
        //   console.log(res); //host web like firebase
        // });
        //call the service for the request and then..
        apiService(endpoint, method, {
          title: this.event_title,
          description: this.event_description,
          start_date: this.start_date,
          location: this.event_location,
          price: this.event_price,
          group_limit: this.event_group_limit
          //picture: fd
        }).then(event_data => {
          //redirect router to the event description
          this.$router.push({
            name: "event",
            params: { slug: event_data.slug }
          });
        });
      }
    }
  },

  created() {
    document.title = "Editor - EventBuddy";
  }
};
</script>

<style>
.eventeditor-view {
  padding-right: 5rem;
  padding-left: 5rem;
  padding-bottom: 1rem;
  background-color: #1a1a1a;
}

.container-eventeditor {
  margin-bottom: 5rem;
}
.name {
  font-style: italic;
}
.file {
  visibility: hidden;
  position: absolute;
}
</style>
