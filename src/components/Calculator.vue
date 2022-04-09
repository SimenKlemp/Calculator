<template>
  <div class="title">
    <h1>{{ msg }}</h1>
  </div>
  <div class="calculator-container">
    <div class="display">
      <h3>{{ equationInfo.valueDisplay || "0" }}</h3>
    </div>
    <div class="buttons">
      <button id="clear" class="myButtons2" v-on:click="clear">AC</button>
      <button id="delete" class="myButtons2" v-on:click="deletePrevious">
        DEL
      </button>
      <button class="myButtons2" v-on:click="divide">/</button>
      <button class="myButtons1" v-on:click="addValueDisplay('7')">7</button>
      <button class="myButtons1" v-on:click="addValueDisplay('8')">8</button>
      <button class="myButtons1" v-on:click="addValueDisplay('9')">9</button>
      <button class="myButtons2" v-on:click="substract">-</button>
      <button class="myButtons1" v-on:click="addValueDisplay('4')">4</button>
      <button class="myButtons1" v-on:click="addValueDisplay('5')">5</button>
      <button class="myButtons1" v-on:click="addValueDisplay('6')">6</button>
      <button class="myButtons2" v-on:click="add">+</button>
      <button class="myButtons1" v-on:click="addValueDisplay('1')">1</button>
      <button class="myButtons1" v-on:click="addValueDisplay('2')">2</button>
      <button class="myButtons1" v-on:click="addValueDisplay('3')">3</button>
      <button class="myButtons2" v-on:click="times">*</button>
      <button id="zero" class="myButtons1" v-on:click="addValueDisplay('0')">
        0
      </button>
      <button class="myButtons1" v-on:click="dot">.</button>
      <button class="myButtons2" v-on:click="equal2">=</button>
    </div>
  </div>
  <div class="logContainer">
    <h1>Previous calculations</h1>
  <div id="previousEquationsDatabase" v-for="equation in equationInfo.previousEquationsFromDatabase" :key="equation">{{equation}}</div>
  <button v-on:click ="getCalculations"> Get all calculations </button>
  </div>
</template>

<script>
import Log from "@/components/Log";
import axios from "axios";
import EventService from "@/services/EventService";
//import EventService from "@/services/EventService";
export default {
  name: "Calculator",
  props: {
    msg: String,
  },
  data() {
    return {
      equationInfo: {
        userID: null,
        result: "",
        valueDisplay: "",
        storedValue: null,
        operator: null,
        operatorSign: "",
        operatorClicked: false,
        logListe: [],
        previousEquationsFromDatabase: []
      }
    };
  },
  mounted() {
    this.userID = this.$store.getters.getUserID
  },
  methods: {
    addValueDisplay(index) {
      if (this.equationInfo.operatorClicked) {
        this.equationInfo.valueDisplay = "";
        this.equationInfo.operatorClicked = false;
      }
      this.equationInfo.valueDisplay = `${this.equationInfo.valueDisplay}${index}`;
    },

    equal() {
      const equationRequest = {
        valueDisplay: this.equationInfo.valueDisplay,
        storedValue: this.equationInfo.storedValue,
        operatorSign: this.equationInfo.operatorSign,
        userID: this.userID
        }
        console.log(this.userID)


      const equationResponse = axios.post("http://localhost:8085/demo/equations", equationRequest);
      equationResponse.then((resolvedResult) => {
        this.equationInfo.result = resolvedResult.data.result; //Setter result til å være lik equationResponse fra server

        let result = this.equationInfo.result;

        this.equationInfo.valueDisplay = result; //result skal være lik responsen man henter inn fra server.

        this.equationInfo.logListe.push(
            this.equationInfo.storedValue +
            " " +
            this.equationInfo.operatorSign +
            " " +
            this.equationInfo.valueDisplay +
            " = " +
            result //Respons fra server
        );
        this.equationInfo.storedValue = null;
      })
    },

    equal2(){
      const equationRequest = {
        valueDisplay: this.equationInfo.valueDisplay,
        storedValue: this.equationInfo.storedValue,
        operatorSign: this.equationInfo.operatorSign,
        userID: this.userID
      }

      const equationResponse = EventService.postEquations(equationRequest);
      equationResponse.then((resolvedResult) => {
        this.equationInfo.result = resolvedResult.data.result; //Setter result til å være lik equationResponse fra server

        let result = this.equationInfo.result;

        this.equationInfo.valueDisplay = result;
      })


      /*

        this.equationInfo.storedValue = null;

        console.log(this.equationInfo.valueDisplay)

      })

       */
    },
    getCalculations(){
      const getCalculationsResponse = EventService.getCalculations(this.userID)
          getCalculationsResponse.then((getResponse) => {
            console.log("GET Response")
            console.log(getResponse.data);
            this.equationInfo.previousEquationsFromDatabase = getResponse.data;
          })
    },

    clear() {
      this.equationInfo.valueDisplay = "";
    },
    deletePrevious() {
      this.equationInfo.valueDisplay = this.equationInfo.valueDisplay.slice(0, -1);
    },
    dot() {
      if (this.equationInfo.valueDisplay.indexOf(".") === -1) {
        this.addValueDisplay(".");
      }
    },
    substract() {
      this.equationInfo.operatorClicked = true;
      this.equationInfo.storedValue = this.equationInfo.valueDisplay;
      this.equationInfo.operatorSign = "-";
    },
    add() {
      this.equationInfo.operatorClicked = true;
      this.equationInfo.storedValue = this.equationInfo.valueDisplay;
      this.equationInfo.operatorSign = "+";
    },
    times() {
      this.equationInfo.operatorClicked = true;
      this.equationInfo.storedValue = this.equationInfo.valueDisplay;
      this.equationInfo.operatorSign = "*";
    },
    divide() {
      this.equationInfo.operatorClicked = true;
      this.equationInfo.storedValue = this.equationInfo.valueDisplay;
      this.equationInfo.operatorSign = "/";
    },
    components: {
      Log
    },
  }
};
</script>

<style scoped>
.display {
  grid-area: display;
}
.buttons {
  grid-area: buttons;
}

.calculator-container {
  width: 500px;
  margin: 0 auto;
  display: grid;
  grid-template-areas:
    "display display display display"
    "buttons buttons buttons buttons";
  text-align: center;
  border-style: solid;
  border-color: gray;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.myButtons1 {
  border: none;
  text-align: center;
  text-decoration: none;
  font-size: 20px;
  background-color: gray;
  color: black;
  padding: 15px 32px;
}

.myButtons2 {
  border: none;
  text-align: center;
  text-decoration: none;
  font-size: 22px;
  font-weight: bold;
  background-color: orange;
  padding: 15px 32px;
}

.myButtons2:hover {
  background: lightgray;
}

.myButtons1:hover {
  background: lightgray;
}

.display {
  grid-column: 1 / 5;
  border-style: solid;
  border-color: gray;
  height: auto;
  width: auto;
  font-size: 20px;
}

#clear {
  grid-column: 1 / 3;
}

#zero {
  grid-column: 1 / 3;
}

.log {
  border-style: solid;
  border-color: lightgray;
  width: 350px;
  height: 200px;
  overflow: scroll;
  margin: 0 auto;
  background-color: grey;
  font-size: 20px;
  font-weight: bold;
}
</style>
