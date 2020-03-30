<!-- ReviewEditor imported in EventEditor only if event_has_expired and i partecipated to event-->

<!-------------------Single Review: Delete and Modify buttons --------------->
<!------------------ methods:  data(), triggerDeleteReview(),  likeReview()-->

<template lang="html">
  <div class="single-review">
    <p class="text-muted">
      <strong>{{ review.author }}</strong> ha risposto il
      {{ review.created_at }}
    </p>
    <p>{{ review.body }}</p>
    <div v-if="isReviewAuthor" class="review-owner">
      <router-link
        :to="{ name: 'review-editor', params: { id: review.id } }"
        class="btn btn-sm btn-outline-secondary mr-1"
      >
        <span>Modifica</span>
      </router-link>

      <button
        class="btn btn-sm btn-outline-danger"
        @click="triggerDeleteReview"
      >
        Cancella
      </button>
    </div>
    <div v-else class="like-review">
      <button
        class="btn btn-sm"
        @click="toggleLike"
        :class="{
          'btn-primary': userLikedReview,
          'btn-outline-primary': !userLikedReview
        }"
      >
        <strong>Like [{{ likesNumber }}]</strong>
      </button>
    </div>
    <hr />
  </div>
</template>

<script>
import { apiService } from "../common/api.service.js";
export default {
  name: "ReviewComponent",
  props: {
    review: {
      type: Object, //a specific Review
      required: true
    },
    requestUser: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      userLikedReview: this.review.user_has_voted,
      likesNumber: this.review.likes_count
    };
  },
  computed: {
    isReviewAuthor() {
      return this.review.author === this.requestUser;
    }
  },
  methods: {
    toggleLike() {
      this.userLikedReview == false ? this.likeReview() : this.unLikeReview();
    },
    likeReview() {
      this.userLikedReview = true;
      this.likesNumber += 1;
      let endpoint = `/api/reviews/${this.review.id}/like/`;
      apiService(endpoint, "POST");
    },
    unLikeReview() {
      this.userLikedReview = false;
      this.likesNumber -= 1;
      let endpoint = `/api/reviews/${this.review.id}/like/`;
      apiService(endpoint, "DELETE");
    },
    triggerDeleteReview() {
      //on press delete-btn, this method is emitted in the parent component (Event)
      this.$emit("delete-review", this.review);
    }
  }
};
</script>

<style lang="css">
</style>
