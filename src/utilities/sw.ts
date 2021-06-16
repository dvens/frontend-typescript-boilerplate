const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.1/8 is considered localhost for IPv4.
        window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
);

function registerServiceWorker() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker
                .register('sw.js', {
                    scope: '/',
                })
                .then(function (reg) {
                    console.log(`Serviceworker - Registration succeeded. Scope is ${reg.scope}`);
                })
                .catch(function (err) {
                    console.error(`Serviceworker - Registration failed with error ${err}`);
                });
        });
    }
}

function unRegisterServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
            registration.unregister();
        });
    }
}

export { registerServiceWorker, unRegisterServiceWorker, isLocalhost };
