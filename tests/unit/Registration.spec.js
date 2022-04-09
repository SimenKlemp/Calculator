import {flushPromises, shallowMount} from "@vue/test-utils";
import RegistrationComponent from "@/components/RegistrationComponent";
import axios from "axios";

describe("RegistrationComponent.vue", () => {
    it("check that RegistrationComponent renders", () => {
        const wrapper = shallowMount(RegistrationComponent)
        expect(wrapper.exists()).toBeTruthy()
    })

    describe('page title', () => {
        it('is rendered with the correct text', () => {
            const wrapper = shallowMount(RegistrationComponent)
            const title = wrapper.find('#registrationTitle')
            expect(title.exists()).toBeTruthy()
            expect(title.text()).toContain('Registration')
        })
    })
    describe('user input', () => {
        it('is modified and rendered correctly', async () => {
            const wrapper = shallowMount(RegistrationComponent)

            const name = wrapper.find('[data-test-id=nameInput]')
            const address = wrapper.find('[data-test-id=nameInput]')
            const username = wrapper.find('[data-test-id=nameInput]')
            const password = wrapper.find('[data-test-id=nameInput]')
            const email = wrapper.find('[data-test-id=nameInput]')
            const phone = wrapper.find('[data-test-id=nameInput]')

            await wrapper.setData({
                registration: {
                    name: 'Simen',
                    address: 'Magnus den Godes gate 8',
                    username: 'simenkp',
                    password: 'hei',
                    email: 'simenk2312@gmail.com',
                    phone: '40539147'
                },
            });
            await flushPromises()

            expect(name.element.textContent).toEqual('Simen');
            expect(address.element.textContent).toEqual('Magnus den Godes gate 8');
            expect(username.element.textContent).toEqual('simenkp');
            expect(password.element.textContent).toEqual('hei');
            expect(email.element.textContent).toEqual('simenk2312@gmail.com');
            expect(phone.element.textContent).toEqual('40539147');

        })
    })

})






