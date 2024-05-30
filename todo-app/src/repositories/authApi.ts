import { SignInRequest } from "../types/SignInRequest";

class AuthApi {
    signInEndpoint: string = 'http://localhost:8080/auth/sign-in';
    signUpEndpoint: string = 'http://localhost:8080/auth/sign-up';

    login(userDetails: SignInRequest): Promise<string> {
        return fetch(this.signInEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
        .then(res => res.json())
        .then(res => {
            return res.token as string;
        })
    }
}

export const authApi = new AuthApi();