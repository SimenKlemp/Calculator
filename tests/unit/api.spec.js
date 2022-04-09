import { doLogin } from '@/utils/apiutil'

describe('testing apiutil.vue', () => {
    it('test API call utility function - login Success', async () => {
        const loginRequest = { username:"user", password: "pass" };
        const loginResponse = await doLogin(loginRequest);
        const expectedLoginRespone = { loginStatus: 'Success' };
        expect(loginResponse).toEqual(expectedLoginRespone);
    }),
        it('test API call utility function - login Fail', async () => {
            const loginRequest = { username:"userx", password: "passx" };
            const loginResponse = await doLogin(loginRequest);
            const expectedLoginRespone = { loginStatus: 'Fail' };
            expect(loginResponse).toEqual(expectedLoginRespone);
        })
})