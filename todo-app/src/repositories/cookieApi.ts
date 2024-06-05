class CookieApi {
    setJwt(jwt: string) {
        this.setCookie('jwt', jwt, 15);
    }

    deleteJwt() {
        this.setCookie('jwt', '', 0);
    }

    getJwt(): string {
        return this.getCookie('jwt');
    }

    hasJwt(): boolean {
        return this.hasCookie('jwt');
    }

    getCookie(key: string): string {
        key += '=';
        const cookies = decodeURIComponent(document.cookie).split('; ');
        const cookie = cookies.find((cookie) => cookie.startsWith(key));
        if (!cookie) return '';
        return cookie.slice(key.length);
    }

    setCookie(key: string, value: string, minutes : number) {
        const d = new Date();
        d.setTime(d.getTime() + (minutes * 60 * 1000));
        const expires = "expires="+ d.toUTCString();

        document.cookie = key + '=' + value + ';' + expires + ';path=/';
    }

    hasCookie(key: string): boolean {
        key += '=';
        const cookies = decodeURIComponent(document.cookie).split('; ');
        const cookie = cookies.find((cookie) => cookie.startsWith(key));
        return cookie !== undefined;
    }
}

export const cookieApi = new CookieApi();