<template>
  <div class="form-container">
    <h1>Feedback</h1>
    <form class="form" @submit.prevent="submit">
      <fieldset>
        <legend>Personal data</legend>
        <BaseInput
            class="baseInput"
            v-model=this.feedback.name
            label="Name"
            type="text"
            :error="errors.name"
            validateOnInput
        />

        <p></p>
        <BaseInput
            class="baseInput"
            v-model="mail"
            label="Mail"
            type="text"
            :error="errors.mail"
        />
      </fieldset>

      <fieldset>
        <legend>Comments</legend>
        <BaseInput
            class="baseInput"
            v-model="comment"
            label="Comment"
            type="text"
            :error="errors.comment"
            />
      </fieldset>

      <BaseButton
          type="submit"
          class="mybtn"
          :disabled ="isError"
          something="else"
      >
        Submit
      </BaseButton>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import BaseInput from "../components/BaseInput";
import BaseButton from "../components/BaseButton";
import { useField, useForm } from "vee-validate";
import { object, string } from 'yup'
import { useStore } from "vuex"
import { useRouter } from "vue-router"

export default {
  components: {
    BaseInput,
    BaseButton
  },
  data() {
    return {
      feedback: {
        id: "",
        name: "",
        mail: "",
        comment: "",
      }
    }
  },

  setup() {
    const store = useStore()
    const router = useRouter()

    function submit() {
      const feedback ={
        ...this.feedback,
        name: this.name,
        mail: this.mail,
        comment: this.comment,
        id: uuidv4(),
      }
      console.log(feedback)

      store.dispatch('createFeedback', feedback).then(()  => {
        router.push({
          name: 'FeedbackList'
        })
      })

    }
    const validationSchema = object({
      name: string().required('A name is required'),
      mail: string().email().required('Email is required'),
      comment: string().required('A comment is required'),
    });

    const { errors } = useForm({
      validationSchema,
    })

    const { value: name } = useField('name')
    const { value: mail } = useField('mail')
    const { value: comment } = useField('comment')

    return {
      name,
      mail,
      comment,
      submit,
      errors,
    }
  },
  computed: {
    isError(){
      if(this.errors.name || this.errors.mail || this.errors.comment) {
        return true
      }
      else{
        return false
      }
    }
  }
}
</script>
<style scoped>
fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}
legend {
  font-size: 28px;
  font-weight: 700;
  margin-top: 20px;
}
.mybtn,
label,
input,
select,
textarea {
  display: inline-flex;
  font-family: "Open sans", sans-serif;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}
.mybtn,
input {
  overflow: visible;
}
.mybtn,
select {
  text-transform: none;
}
.mybtn,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: none;
}
mybtn::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}
mybtn:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 2px solid #39b982;
}
label{
  color: rgba(0, 0, 0, 0.5);
  font-weight: 700;
}
input,
textarea {
  box-sizing: border-box;
  border: solid 1px rgba(0, 0, 0, 0.4);
}
input.error,
select.error {
  margin-bottom: 0;
}
input + p.errorMessage {
  margin-bottom: 24px;
}
textarea {
  width: 100%;
  overflow: auto;
  font-size: 20px;
}
[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}
[type="search"] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}
[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
[type="text"],
[type="number"],
[type="search"],
[type="password"] {
  height: 52px;
  width: 40%;
  padding: 0 10px;
  font-size: 20px;
}
::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}
[hidden] {
  display: none;
}
.mybtn {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
  padding: 20px;
  margin: 10px;
  background-color: lightgreen;
  border-radius: 6px;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.2s linear;
}
.mybtn:hover {
  -webkit-transform: scale(1.02);
  transform: scale(1.02);
  box-shadow: 0 7px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.mybtn:active {
  -webkit-transform: scale(1);
  transform: scale(1);
  box-shadow: none;
}
.mybtn:focus {
  outline: 0;
}
.mybtn:disabled {
  -webkit-transform: scale(1);
  transform: scale(1);
  box-shadow: none;
}

#header {
  color: #39b982;
}

</style>
