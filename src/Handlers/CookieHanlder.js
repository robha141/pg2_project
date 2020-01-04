export class CookieHandler {
    setCookie(name, value) {
        document.cookie = `${name}=${value}`
    }    

    getCookie(name) {
        return document.cookie.split(';').reduce(function(prev, c) {
            var arr = c.split('=');
            return (arr[0].trim() === name) ? arr[1] : prev;
        }, undefined);
    }
}