<!--if it is expired then it is possible to add a review -->
<!--Single Review: Add a Review form -->
<!--Review list: List of ReviewComponent-->

<template>
  <div class="form-container ">
    <form class="card" @submit.prevent="onSubmit">
      <div class="card-header px-3">Aggiungi la tua recensione dell'evento</div>
      <div class="card-block">
        <textarea
          v-model="newReviewBody"
          rows="5"
          class="form-control"
          placeholder="Recensione.."
        >
        </textarea>

        <!--rating stars input (component)-->
        <!------------------------->
        <form class="rating">
          <label>
            <input
              v-model="newReviewRating"
              type="radio"
              name="stars"
              value="1"
            />
            <span class="icon">★</span>
          </label>
          <label>
            <input
              v-model="newReviewRating"
              type="radio"
              name="stars"
              value="2"
            />
            <span class="icon">★</span>
            <span class="icon">★</span>
          </label>
          <label>
            <input
              v-model="newReviewRating"
              type="radio"
              name="stars"
              value="3"
            />
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>
          </label>
          <label>
            <input
              v-model="newReviewRating"
              type="radio"
              name="stars"
              value="4"
            />
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>
          </label>
          <label>
            <input
              v-model="newReviewRating"
              type="radio"
              name="stars"
              value="5"
            />
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>
          </label>
        </form>
      </div>
      <div class="card-footer px-3">
        <button type="submit" class="btn btn-sm btn-success">
          Inserisci la tua recensione
        </button>
      </div>
    </form>
    <p class="error mt-2">{{ error }}</p>
  </div>
</template>

<script>
import { apiService } from "../common/api.service";
//import ReviewComponent from "../components/Review.vue";

export default {
  name: "ReviewForm",
  props: {
    // used in this component
    //to review the right Event we need his slug
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      newReviewBody: null,
      newReviewRating: null,
      error: null
    };
  },
  methods: {
    onSubmit() {
      //check fields
      if (!this.newReviewBody) {
        this.error = "Il campo recensione non può essere vuoto!";
      } else if (!this.newReviewRating) {
        this.error = "Il campo punteggio non può essere vuoto!";
      } else {
        //POST endpoint
        let endpoint = `/api/events/${this.slug}/review/`;
        let method = "POST";
        //call the service for the request and then..
        apiService(endpoint, method, {
          body: this.newReviewBody,
          rating: this.newReviewRating
        }).then(data => {
          //add my review
          this.$parent.reviews.unshift(data); //parent
        });
        //initialize attributes
        if (this.error) {
          this.error = null;
        }
        this.newReviewBody = null;
        this.newReviewRating = null;
        this.$parent.showForm = false; //parent
        this.$parent.userHasReviewed = true; //parent
      }
    }
  }
};
</script>

<style lang="css">
.review-added {
  color: red;
  font-weight: bold;
}
.form-container {
  padding: 0;
  width: 100%;
}
.rating {
  display: inline-block;
  position: relative;
  height: 50px;
  line-height: 50px;
  font-size: 50px;
}

.rating label {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  cursor: pointer;
}

.rating label:last-child {
  position: static;
}

.rating label:nth-child(1) {
  z-index: 5;
}

.rating label:nth-child(2) {
  z-index: 4;
}

.rating label:nth-child(3) {
  z-index: 3;
}

.rating label:nth-child(4) {
  z-index: 2;
}

.rating label:nth-child(5) {
  z-index: 1;
}

.rating label input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.rating label .icon {
  float: left;
  color: transparent;
}

.rating label:last-child .icon {
  color: #000;
}

.rating:not(:hover) label input:checked ~ .icon,
.rating:hover label:hover input ~ .icon {
  color: #09f;
}

.rating label input:focus:not(:checked) ~ .icon:last-child {
  color: #000;
  text-shadow: 0 0 5px #09f;
}
</style>
