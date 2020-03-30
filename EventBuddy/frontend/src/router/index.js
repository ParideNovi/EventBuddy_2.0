//client router to redirect the selected Vue views (components)
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Event from "../views/Event.vue";
import EventEditor from "../views/EventEditor.vue";
import ReviewEditor from "../components/ReviewEditor.vue";
import ProfileEditor from "../views/ProfileEditor.vue";
import Profile from "../views/Profile.vue";
import Experience from "../views/Experience.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/", // main url
    name: "home", //  url
    component: Home //call view component views/Home.vue
  },
  {
    path: "/experiences", // main url
    name: "experiences", //  url
    component: Experience //call view component views/Home.vue
  },
  {
    path: "/events/:slug", // give also the slug by router
    name: "event",
    component: Event,
    props: true //slug will be set in the prop component
  },
  {
    path: "/add-event/:slug?", //optional slug? because i use this component for Edit and newEvent
    name: "event-editor",
    component: EventEditor,
    props: true
  },
  {
    path: "/profile/:userUsername", // personal profile
    name: "profile-editor",
    component: ProfileEditor,
    props: true
  },
  {
    path: "/profiles/:userUsername", // user profile
    name: "user-profile",
    component: Profile,
    props: true
  },
  {
    path: "/review/:id", // modify a review
    name: "review-editor",
    component: ReviewEditor,
    props: true
  }
];

const router = new VueRouter({
  mode: "history", //default url is #
  //base: process.env.BASE_URL,  no base
  routes
});

export default router;
