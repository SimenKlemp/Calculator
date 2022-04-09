import { shallowMount } from "@vue/test-utils";
import LoginComponent from "@/components/LoginComponent.vue";
import store from "@/store";
import router from "@/router";



describe("LoginComponent.vue", () => {
    it("check that LoginComponent renders", () => {
        const wrapper = shallowMount(LoginComponent, {
            global: {
                plugins: [store, router]
            }
        });
        expect(wrapper.exists()).toBeTruthy()
    })

    describe('page title', () => {
        it('is rendered with the correct text', () => {
            const wrapper = shallowMount(LoginComponent, {
                global: {
                    plugins: [store, router]
                }
            })
            const title = wrapper.find('#loginTitle')
            expect(title.exists()).toBeTruthy()
            expect(title.text()).toContain('Please login!')

        })
    })
    describe('loginStatusLabel', () => {
        it('exists', () => {
            const wrapper = shallowMount(LoginComponent, {
                global: {
                    plugins: [store, router]
                }
            })
            expect(wrapper.find('#loginstatusLabel').exists()).toBe(true);

            const statusId = wrapper.find('#loginstatusLabel');
            // check that id of the loginstatusLabel element is correct
            expect(statusId.element.id).toBe('loginstatusLabel');
            // check that the loginstatusLabel element is displaying correct value
            expect(statusId.element.textContent).toBe('');

        })
    })
    describe('Modify', () =>{
        it('data', async () => {
            const wrapper = shallowMount(LoginComponent, {
                global: {
                    plugins: [store, router]
                }
            })
            // get loginstatusLabel element
            const statusId = wrapper.find('#loginstatusLabel');
            // change loginStatus data and check that loginstatusLabel element is updated accordingly
            await wrapper.setData({
                userInfo: {
                    loginStatus: 'Success'
                }});
            expect(statusId.element.textContent).toBe('Success');
            await wrapper.setData({userInfo:{
                loginStatus: 'Failed'
                }});
            expect(statusId.element.textContent).toBe('Failed');

        })
    })
})

