import axios from "axios";
import qs from "qs";
import * as https from "https";

const agent = new https.Agent({
    rejectUnauthorized: false
});

const apiClient1 = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const apiClient2 = axios.create({
  baseURL: "http://localhost:8085/demo",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export function getToken(userInfo) {
    const data = qs.stringify({
        username: userInfo.username,
        password: userInfo.password
    });
    const configWithoutBasicauth = {
        httpsAgent: agent,
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    };
    return axios.post(
        `http://localhost:8085/demo/token`,
        data,
        configWithoutBasicauth
    ).then(resonse => {
        return resonse.data;
    }).catch( err => {
        console.log(err);
    });
}

export async function getFeedbacks() {
    return apiClient1.get("/feedbacks");
}

export async function postFeedback(feedback) {
    return apiClient1.post("/feedbacks", feedback);
  }

 export async function loginUser(userInfo) {

    const token =  await getToken()

    const configWithToken = {
      httpsAgent: agent,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }
    const loginRequest = {
      username: userInfo.username,
      password: userInfo.password
    };

    return axios
        .post(`http://localhost:8085/login`, loginRequest, configWithToken)
        .then((response) => {
            return response.data;
            })
        .catch((err) => {
             console.log(err);
        });

        /*
        userInfo.loginStatus = resolvedResult.data.loginStatus;
      userInfo.userID = resolvedResult.data.userIdResponse;
      /*
         */
}



  export async function getUsers() {
    return apiClient2.get("/login");
  }

 export async function postEquations(equationInfo) {

     const token = await getToken()

     const configWithToken = {
         httpsAgent: agent,
         headers: {
             'Authorization': `Bearer ${token}`,
             'Content-Type': 'application/json',
         }
     }
     const equationResponse = axios.post("http://localhost:8085/demo/equations", equationInfo, configWithToken);
     return equationResponse;
 }
 export async function getCalculations(userID){
    const token =  await getToken()
     const configWithToken = {
        httpsAgent: agent,
         headers: {
            'Authorization': `Bearer ${token}`,
             'Content-Type': 'application/json',
         }
    }
    const getCalculationsResponse = axios.get("http://localhost:8085/demo/equations/" + userID, configWithToken)
     return getCalculationsResponse
};
