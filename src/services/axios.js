import axios from 'axios'

export function getRegistration() {
    return axios.get( 'http://localhost:3000/registrations').then(response => {
        return response.data
    })
}

export function postRegistration(registrationRequest) {
    return axios.post(` http://localhost:3000/registrations`, registrationRequest).then(response => {
        return response.data;
})
}