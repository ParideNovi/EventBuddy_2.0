<!--Single Event: Event details page "api/event/:slug", -->
<!--Review list: List of ReviewComponent if event is expired-->
<!--Review: Add a Review form  if !Event.userHasReviewed and event is expired -->

<template>
  <div class="single-event">
    <div class="card ">
      <!-------------------------------Event details------------------------------------>
      <!--######<p> {{ event.image }}</p>-->
      <div class="card-header">
        <h1>{{ event.title }}</h1>
        <p>
          <img
            :src="event.picture"
            class=" .float-left "
            style=""
            alt="avatar"
          />
        </p>
      </div>
      <div class="card-body">
        <div class=" d-flex flex-column">{{ event.description }}</div>
        <hr>
        <span class="mt-5">{{
          moment(event.start_date).format("[DATA: ] dddd DD MMMM YYYY ")
        }}</span>
        <br />
        <span>{{ moment(event.start_date).format("[ORE: ]h:mm:ss a") }}</span>

        <p class="mb-0">
          Evento aggiunta da:
          <!--######call user details link if not expired -->
          <router-link
            :to="{
              name: 'user-profile',
              params: { userUsername: event.author }
            }"
            class="profile-link"
          >
            <span class="author-g author-name">{{ event.author }}</span>
          </router-link>
        </p>
        <hr>
        <!-- EventActions component in the template-->
        <EventActions
          v-if="isOwner"
          :slug="slug"
        />
      </div>
    </div>

    <!----------------------------List of ReviewComponent ---------------------------->
    <!-- fill the list with getEventReviews()                                       -->
    <!-- @delete-review="deleteReview" is triggered back from ReviewComponent       -->
    <ReviewComponent
      v-for="(review, index) in reviews"
      :requestUser="requestUser"
      :review="review"
      :key="index"
      @delete-review="deleteReview"
    />
    <div class="my-4">
      <p v-show="loadingReviews">loading...</p>
    </div>

    <!--if Event.userHasReviewed-->
    <template v-if="userHasReviewed">
      <p class="review-added">Hai recensito questo Evento.</p>
    </template>
    <!--else !userHasReviewed, if showForm -->
    <template v-else-if="showForm">
      <!--Review form  -->
      <ReviewForm :slug="slug" />
    </template>
    <!--else !userHasReviewed and !showForm  -->
    <template v-else>
      <button
        class="btn btn-sm btn-success float-left mb-2"
        @click="showForm = true"
      >
        Inserisci la tua recensione
      </button>
    </template>
  </div>
</template>

<script>
import { apiService } from "../common/api.service";
import moment from "moment";
import ReviewComponent from "../components/Review.vue";
import EventActions from "../components/EventActions.vue"; //to Edit/Delete Events
import ReviewForm from "../components/ReviewForm.vue";

export default {
  name: "Event",

  props: {
    // used in this component
    //to get the right Event we need his slug
    slug: {
      type: String,
      required: true
    }
  },
  components: {
    //used in this component
    ReviewComponent,
    EventActions,
    ReviewForm
  },
  data() {
    return {
      event: {},
      loadingReviews: false,
      reviews: [],
      userHasReviewed: false,
      showForm: false, //if userHas Not Reviewed then showForm
      requestUser: null
    };
  },

  computed: {
    isOwner() {
      return this.event.author === this.requestUser;
    }
  },

  methods: {
    //Events/slug/
    getEventData() {
      let endpoint = `/api/events/${this.slug}/`; //endpoint
      apiService(endpoint).then(data => {
        this.event = data;
        this.userHasReviewed = data.user_has_reviewed;
        this.setPageTitle(data.title);
      });
    },

    getEventReviews() {
      //reviews made about the event
      let endpoint = `/api/events/${this.slug}/reviews/`;
      //if (this.next) {                loadMoreReview part is commented
      //  endpoint = this.next;         loadMoreReview part is commented
      //}
      this.loadingReviews = true;
      apiService(endpoint).then(data => {
        this.reviews = data.results; //.push(...data.results);  loadMoreReview part is commented
        this.loadingReviews = false;
        //if (data.next) {                                      loadMoreReview part is commented
        //  this.next = data.next;
        //} else {
        //  this.next = null;
        // }
      });
    },

    async deleteReview(review) {
      //DELETE triggered from the Review component botton
      let endpoint = `/api/reviews/${review.id}/`;
      try {
        await apiService(endpoint, "DELETE"); //connetcting to the API, delete from DB
        this.$delete(this.reviews, this.reviews.indexOf(review)); // delete from the array and update
        this.userHasReviewed = false;
      } catch (err) {
        console.log(err);
      }
    },
    //to output the event_date in the right format, with filters
    moment: function(date) {
      return moment(date).locale("it");
    },
    setPageTitle(title) {
      document.title = title;
    },
    setRequestUser() {
      this.requestUser = window.localStorage.getItem("username");
    }
  },

  //no methods
  created() {
    this.getEventData();
    this.getEventReviews();
    this.setRequestUser();
  }
};
</script>

<style lang="css">
.card {
  margin-top: 0rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 80rem;
  box-shadow: 3px 3px 20px lightgrey;
}

.card-header {
  text-align: center;
  padding: 10% auto;
}
.card img {
  width: 90%;
}
.single-event {
  margin-left: 5rem;
  margin-right: 5rem;
  align-content: left;
}
.author-g:hover {
  color: gold;
}
.review-added {
  color: red;
  font-weight: bold;
}
.profile-link:hover {
  text-decoration: none;
}
</style>
