import { createStore } from "vuex";
import EventService, {loginUser} from "@/services/EventService";


export default createStore({
  state: {
    feedbacks: [],
    flashMessage: '',
    userInfo: {},
    equations: []


  },
  mutations: {
    ADD_FEEDBACK(state, feedback) {
      state.feedbacks.push(feedback);
    },
    SET_FEEDBACKS(state, feedbacks) {
      state.feedbacks = feedbacks;
    },
    SET_FLASH(state, flashMessage){
      state.flashMessage = flashMessage
    },
    ADD_USER(state, userInfo){
      state.userInfo = userInfo
    },
    SET_USER(state, userInfo) {
      state.userInfo = userInfo;
    },
      ADD_EQUATION(state, equation){
        state.equations.push(equation)
    }
    },
  actions: {
    createFeedback({commit}, feedback) {
      EventService.postFeedback(feedback)
          .then(() => {
            commit("ADD_FEEDBACK", feedback);
            console.log("Feedback er nå lagt inn i state med navn " + this.state.feedbacks)
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getFeedbacks({commit}) {
      EventService.getFeedbacks()
          .then((response) => {
            commit("SET_FEEDBACKS", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    postLogin({commit}, userInfo) {
      loginUser(userInfo)
          .then(() => {
              commit('ADD_USER', userInfo)
              console.log("Hei, jeg er nå lagt inn i state med id " + this.state.userInfo.userID )
          })
          .catch((error) => {
            console.log(error)
          })
    },

      //For å liste opp user som er innlogget i et userInfocard
      //Henter brukeren fra state
    getUsers({commit}) {
      EventService.getUsers()
          .then((response) => {
            commit("SET_USER", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    createEquation({commit}, equation) {
      EventService.postEquations(equation)
          .then(() => {
              commit('ADD_EQUATION', equation)
              console.log("Hei, jeg er nå lagt inn i state")
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      },
  },
    getters:{
      getUserID: state => state.userInfo.userID
    },
  modules: {},
});
