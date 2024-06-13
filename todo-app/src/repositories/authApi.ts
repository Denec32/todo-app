import { SignInRequest } from "../types/SignInRequest";
import { cookieApi } from "./cookieApi";

class AuthApi {
    signInEndpoint: string = 'http://localhost:8080/auth/sign-in';
    signUpEndpoint: string = 'http://localhost:8080/auth/sign-up';
    loginEndpoint: string = 'http://localhost:8080/auth/my-name';

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
            cookieApi.setJwt(res.token as string);
            return res.token as string;
        })
    }

    getUsername(): string {
        const token = cookieApi.getJwt();
        const payload = token.split('.')[1];
        const decodedPayload = atob(payload);
        const parsedPayload = JSON.parse(decodedPayload);
        return parsedPayload.sub;
    }
}

export const authApi = new AuthApi();