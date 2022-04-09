import { doLogin } from '@/utils/apiutil'
import axios from 'axios';
import {getRegistration, postRegistration} from "@/services/axios";
import {flushPromises, shallowMount} from "@vue/test-utils";
import RegistrationComponent from "@/components/RegistrationComponent";

jest.mock('axios')

describe('testing mocking of apiutil.vue', () => {
    it('check that login is successful - against mock', async () => {

        // mock api response on POST call (once)
        const expectedLoginRespone = {loginStatus: 'Success'};
        axios.post.mockImplementation(() => Promise.resolve({data: expectedLoginRespone}));

        // do the call
        const loginRequest = {username: "user1", password: "pass1"};
        const loginResponse = await doLogin(loginRequest);

        //  check response
        //  note that even if wrong username and password are used, mock is configured to return Success
        expect(loginResponse).toEqual(expectedLoginRespone);
    })
    it('check that registration is successful - against mock', async () => {
        const expectedRegistration = {
            id: "123",
            name: "Simen",
            address: "Magnus den Godes gate 8",
            username: "simenkp",
            password: "hei",
            email: "simenk2312@gmail.com",
            phone: "40539147"
        }

        const RegistrationRequest = {
            id: "123",
            name: "Simen",
            address: "Magnus den Godes gate 8",
            username: "simenkp",
            password: "hei",
            email: "simenk2312@gmail.com",
            phone: "40539147"
        };

        const RegistrationResponse = await postRegistration(RegistrationRequest)

        expect(RegistrationResponse).toEqual(expectedRegistration);


    })
    it('check that registration is successful - against mock- get', async () => {
        const mockRegistration = getRegistration()

        const RegistrationRequest = {
            id: "123",
            name: "Simen",
            address: "Magnus den Godes gate 8",
            username: "simenkp",
            password: "hei",
            email: "simenk2312@gmail.com",
            phone: "40539147"
        };

        expect(RegistrationRequest).toEqual(mockRegistration)

    })
    describe('registration button', () => {
        it('can be triggered', async () => {
            const wrapper = shallowMount(RegistrationComponent)

            await wrapper.get('button').trigger('click')

            // Let's assert that we've called axios.get the right amount of times and
            // with the right parameters.
            expect(axios.get).toHaveBeenCalledTimes(1)
        })
    })
})