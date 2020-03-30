<!--Details of the selected Profile, with his Events Expired Reviews-->
<template>
  <div class="single-profile mt-2">
    <div class="container">
      <!--Picture Profile-->
      <div class="card card-6">
        <div class="form-row mt-2">
          <div class="avatar-container col">
            <p>
              <img
                :src="profile.avatar"
                class="rounded-circle img-thumbnail .float-left "
                style=""
                alt="avatar"
              />
            </p>
          </div>
          <div class="col">
            <h1>{{ profile.user }}</h1>

            <div class="profile-bio">{{ profile.bio }}</div>
            <hr />
            <div class="name">Città : {{ profile.location }}</div>
            <div class="name">Data di nascita : {{ profile.birth_date }}</div>
          </div>
        </div>
        <hr />
      </div>

      <!--all the reviews (event expired) about the profile-->
      <template>
        <div
          class="review-cont"
          v-for="review in reviews"
          :key="review.pk"
        >
          <div class="single-review">
            <p class="text-muted">
              <strong>{{ review.author }}</strong> ha risposto il
              {{ review.created_at }}
            </p>
            <p>{{ review.body }}</p>
            <hr />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { apiService } from "../common/api.service";

export default {
  name: "Profile",

  props: {
    // to set the right userUsername when the component is imported with params
    userUsername: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      //username : userUsername as props
      profile: {},

      loadingReviews: false,
      reviews: [],
      //UserHasLiked: false,
      showForm: false,
      error: null,
      next: null,
      requestUser: null
    };
  },

  methods: {
    setPageTitle() {
      document.title = this.userUsername;
    },
    //Profiles/user
    getUserData() {
      let endpoint = `/api/profiles/${this.userUsername}/`; //endpoint
      apiService(endpoint).then(data => {
        this.profile = data;

        //this.userHasLiked = data.user_has_reviewed;
      });
    },

    //All reviews of the events organized by the user
    getUserReviews() {
      let endpoint = `/api/profiles/${this.userUsername}/reviews/`;
      this.loadingReviews = true;
      apiService(endpoint).then(data => {
        this.reviews.push(...data.results);
        this.loadingReviews = false;
      });
    }
  },

  created() {
    this.setPageTitle();
    this.getUserData();
    this.getUserReviews();
  }
};
</script>

<style scoped>
.profile-bio {
  font-style: italic;
  margin-bottom: 5rem;
}

.avatar-container {
  width: 100px;
  height: 100px;
  max-width: 10rem;
}
</style>
