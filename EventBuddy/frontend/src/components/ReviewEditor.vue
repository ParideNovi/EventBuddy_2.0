<!------------------ Single Review: Modify form ----------------------------->
<!------------------ methods: beforeRouteEnter data(), onSubmit()----------->

<template lang="html">
  <div class="container mt-2">
    <div class="row">
      <div class="col-12">
        <h1 class="mb-3">Modifica la tua recensione</h1>
        <form @submit.prevent="onSubmit">
          <!--textarea with previous Review-->
          <textarea v-model="reviewBody" class="form-control" rows="3">
          </textarea>
          <!--rating-->
          <br />
          <button class="btn btn-success" type="submit">
            Pubblica la Recensione
          </button>
        </form>
        <p class="error mt-2">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from "../common/api.service";

export default {
  name: "ReviewEditor",

  props: {
    id: {
      type: Number,
      required: true
    },
    eventSlug: {
      type: String,
      required: true
    },
    // fields autofilled beforeRouteEnter
    previousReviewBody: {
      type: String,
      required: true
    },
    previousReviewRating: {
      type: Number,
      required: true
    }
  },

  async beforeRouteEnter(to, from, next) {
    // get previousReviewBody(${to.params.id})
    // it could be also made with method + created (life cycle hook)
    // but this works better with heavy files (images)
    let endpoint = `/api/reviews/${to.params.id}/`;
    await apiService(endpoint).then(data => {
      // get all the previousData
      to.params.previousReviewBody = data.body;
      to.params.previousReviewRating = data.rating;
      to.params.eventSlug = data.event_slug;
    });
    return next();
  },

  data() {
    return {
      reviewBody: this.previousReviewBody, //return the modified review
      reviewRating: this.previousReviewRating,
      error: null
    };
  },
  methods: {
    onSubmit() {
      // if the field contains something
      if (this.reviewBody) {
        let endpoint = `/api/reviews/${this.id}/`;
        apiService(endpoint, "PUT", {
          body: this.reviewBody,
          rating: this.reviewRating
        }).then(() => {
          this.$router.push({
            name: "event",
            params: { slug: this.eventSlug }
          });
        });
      } else {
        this.error = "Il campo Recensione non può essere vuoto!";
      }
    }
  }
  // methods: {
  //     async getReviewData() {
  //         let endpoint = `/api/reviews/${this.id}/`;
  //         await apiService(endpoint)
  //                 .then(data => {
  //                     this.reviewBody = data.body;
  //                 })
  //     }
  // },
  // created() {
  //     this.getReviewData();
  // }
};
</script>
