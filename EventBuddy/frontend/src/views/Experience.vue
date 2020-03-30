<template>

  <div class="container my-5">

    <!--Section: Content-->
    <section class="">

      <!-- Section heading -->
      <h3 class="text-center font-weight-bold mb-5">Esperienze già passate</h3>

      <div class="row">

        <!--Grid column-->
        <div class="col-md-12">

          <div class="card text-center">
            <div class="card-body px-5 pt-5 pb-4">

              <!--Grid row-->
              <div class="row">

                <!--Grid column-->
                <div class="col-md-5 mb-md-4">

                  <!--Featured image-->
                  <div class="view overlay z-depth-1 mb-4">
                    <img
                      :src="lastEvent.picture"
                      class="img-fluid rounded-0"
                      alt="Sample image"
                    >
                    <a>
                      <div class="mask rgba-white-slight waves-effect waves-light"></div>
                    </a>
                  </div>

                </div>
                <!--Grid column-->

                <!--Grid column-->
                <div class="col-md-6 text-left mb-md-5 mb-4">

                  <h4 class="mb-3"><strong>{{lastEvent.title}}</strong></h4>
                  <p class="dark-grey-text">{{lastEvent.description}}</p>
                  <p>by <a><strong>{{lastEvent.author}}</strong></a> ,{{ moment(lastEvent.start_date).format("dddd DD MMMM, h:mm:ss a") }}</p>
                  <router-link
                    :to="{
                    name: 'event',
                    params: { slug: lastEvent.slug }
                    }"
                    class="event-link"
                  >
                    <a
                      class="btn btn-success btn-sm"
                      id="mr-white"
                    >Recensisci</a>
                  </router-link>

                </div>
                <!--Grid column-->

              </div>
              <!--Grid row-->

              <!--Grid row-->
              <div class="row">

                <!--Grid column-->

                <div
                  class="col-md-6"
                  v-for="event in events"
                  :key="event.pk"
                >
                  <!--Small news-->
                  <div class="single-news">

                    <div class="row mb-3">

                      <div class="col-md-4">
                        <!--Image-->
                        <div class="view overlay rgba-white-slight z-depth-1 mb-3">
                          <img
                            :src="event.picture"
                            class="img-fluid rounded-0"
                            alt="Minor sample post image"
                          >
                          <a>
                            <div class="mask rgba-white-slight waves-effect waves-light"></div>
                          </a>
                        </div>
                      </div>

                      <!--Excerpt-->
                      <div class="col-md-8">
                        <p class="font-small text-left mb-2"><strong>{{event.title}}</strong></p>
                        <p class="text-left mb-1"><a> {{ moment(event.start_date).format("dddd DD MMMM, h:mm:ss a") }}
                            <router-link
                              :to="{
                                name: 'event',
                                params: { slug: event.slug }
                                }"
                              class="event-link"
                            >
                              <font-awesome-icon icon="angle-right"></font-awesome-icon>
                            </router-link>
                          </a></p>
                        <p class="
                                blockquote-footer
                                text-left
                                mb-1">{{event.author}} </p>
                      </div>

                    </div>

                  </div>
                  <!--/Small news-->

                </div>
                <!--Grid column-->

              </div>
              <!--Grid row-->

            </div>
          </div>

        </div>
        <!--Grid column-->

      </div>

    </section>
    <!--Section: Content-->

  </div>

</template>


<script>
import { apiService } from "../common/api.service";

import moment from "moment";
export default {
  name: "experiences",

  props: {},

  data() {
    return {
      events: [],
      lastEvent: null,
      next: null, //nextpage API
      loadingEvents: false //loading graphic
    };
  },
  //all the methods
  methods: {
    getEvents() {
      let endpoint = "api/eventsexpired/";
      if (this.next) {
        //if the component variable not null (exist)
        endpoint = this.next;
      }
      this.next = null;
      this.loadingEvents = true;
      apiService(endpoint) //Default == GET
        .then(data => {
          this.events.push(...data.results); //...spread operator js load events
          this.lastEvent = this.events.pop();
          this.loadingEvents = false;
          if (data.next) {
            // if other pages of events
            this.next = data.next;
          } else {
            this.next = null;
          }
        });
    },

    //to output the event_date in the right format, with filters
    moment: function(date) {
      return moment(date).locale("it");
    }
  },
  created() {
    document.title = "Experiences";
    this.getEvents();
  }
};
</script>


<style scoped>
#mr-white {
  color: white;
}
</style>
