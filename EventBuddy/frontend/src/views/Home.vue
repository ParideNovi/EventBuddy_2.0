<!--Event List event not expired  "api/events/"-->
<template>
  <div class="home-view">
    <div class="container">
      <div class="gallery">
        <div
          class="gallery-panel"
          v-for="event in events"
          :key="event.pk"
        >
          <router-link
            :to="{
              name: 'event',
              params: { slug: event.slug }
            }"
            class="event-link"
          >
            <div class="thumbnail ">
              <p>
                <img
                  :src="event.picture"
                  class=" .float-left "
                  style=""
                  alt="avatar"
                />
              </p>

              <!-- gallery-panel text details-->
              <div class="text-details">
                <h2>
                  {{ event.title }}
                </h2>
                <p class=" mb-0">
                  <span>{{
                    moment(event.start_date).format("dddd DD MMMM, h:mm:ss a")
                  }}</span>
                </p>
                <p class="mb-3">
                  Evento creato da:
                  <span class="author-name"> {{ event.author }} </span>
                </p>
                <p class="blockquote-footer">Persone/totale:</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="my-4">
        <p v-show="loadingEvents">loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { apiService } from "../common/api.service";
import moment from "moment";
export default {
  name: "home",

  props: {},

  data() {
    return {
      events: [],
      next: null, //nextpage API
      loadingEvents: false //loading graphic
    };
  },
  //all the methods
  methods: {
    getEvents() {
      let endpoint = "api/eventsactive/";
      if (this.next) {
        //if the component variable not null (exist)
        endpoint = this.next;
      }
      this.next = null;
      this.loadingEvents = true;
      apiService(endpoint) //Default == GET
        .then(data => {
          this.events.push(...data.results); //...spread operator js load events
          this.loadingEvents = false;
          if (data.next) {
            // if other pages of events
            this.next = data.next;
          } else {
            this.next = null;
          }
        });
    },

    endScroll: function() {
      // when scroll close to bottom of the page & there are still events
      if (
        document.documentElement.scrollTop + window.innerHeight >
        document.documentElement.scrollHeight - 100
      ) {
        if (this.next) {
          this.getEvents();
        }
      }
    },

    //to output the event_date in the right format, with filters
    moment: function(date) {
      return moment(date).locale("it");
    }
  },
  //life-cicle-hooks
  created() {
    window.addEventListener("scroll", this.endScroll); //add event listener
    document.title = "EventBuddy";
    this.getEvents();
  },
  destroyed() {
    window.removeEventListener("scroll", this.endScroll);
  }
};
</script>

<style media="screen">
.author-name {
  font-weight: bold;
  color: black;
}

.event-link {
  color: black;
}
.event-link:hover {
  color: black;
  text-decoration: none !important;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-gap: 2rem;
  max-width: 90rem;
  margin: 5rem auto;
  padding: 0 5rem;
  text-align: left;
}
.text-details {
  padding: 0 1rem;
}
.gallery-panel {
  max-width: 20rem;
  border-style: none;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  box-shadow: 3px 3px 20px lightgrey;
  background-color: white;
}

.gallery-panel:hover {
  transform: scale(1.2);
}
.gallery-panel img {
  width: 100%;
  height: 15vw;
  object-fit: cover;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
}
</style>
