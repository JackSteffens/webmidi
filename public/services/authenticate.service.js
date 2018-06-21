angular.module('WebMIDI').service('Authenticate',
    function ($http, $q, $timeout, $state, Api, $cookies) {
        this.verifyAccessToken = verifyAccessToken;
        this.logout = logout;
        this.isAuthenticated = isAuthenticated;
        this.getRole = getRole;
        this.registerObserver = registerObserver;
        this.setCurrentUser = setCurrentUser;
        this.getCurrentUser = getCurrentUser;
        this.notifyObservers = notifyObservers;
        this.getAccessToken = getAccessToken;
        this.setAccessToken = setAccessToken;
        this.getAccessTokenExpiry = getAccessTokenExpiry;
        this.restoreSession = restoreSession;

        var _observers = [];
        var _accessToken = undefined;
        var _currentUser = undefined;
        // var _currentUser = {
        //     access_type: "online",
        //     aud: "439345663761-vinca9jn7fsonkj8bg6pdjr39kuevdka.apps.googleusercontent.com",
        //     azp: "439345663761-vinca9jn7fsonkj8bg6pdjr39kuevdka.apps.googleusercontent.com",
        //     email: "jacksteffens1@gmail.com",
        //     email_verified: "true",
        //     exp: "1528108654",
        //     expires_in: "3599",
        //     scope: "https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        //     sub: "115025544035929044251"
        // };

        function logout() {
            // Remove token from server & client cookies
            _currentUser = undefined;
            $state.go('login');
            notifyObservers(_currentUser);
        }

        function verifyAccessToken(accessToken) {
            return $q(function (resolve, reject) {
                $http.get(Api.url.verifyAccessToken, {
                    params: {
                        access_token: accessToken
                    }
                }).then(function (res) {
                    setAccessToken(accessToken, res.data.exp);
                    resolve(res.data);
                }, function (res) {
                    console.log(res);
                    reject('ERROR');
                });
            });
        }

        /**
         * TODO Check for empty user object
         * @return {boolean}
         */
        function isAuthenticated() {
            var timestampNow = new Date().getTime();
            var accessTokenExpiry = getAccessTokenExpiry();
            var accessToken = getAccessToken();
            var sessionCookie = getSessionCookie();

            if (accessTokenExpiry && accessToken) {
                var timestampExpiry = new Date(0).setUTCSeconds(accessTokenExpiry);
                return (timestampNow < timestampExpiry);
            }
            console.log('No valid access token found');
            return false;
        }

        function restoreSession() {
            return $q(function (resolve, reject) {
                var sessionCookie = getSessionCookie();
                var accessToken = getAccessToken();
                console.log('Authenticate restoreSession() cookie', sessionCookie);
                console.log('Authenticate getAccessToken() cookie', accessToken);
                if (sessionCookie) {
                    $http(Api.url.user)
                        .then(function (res) {
                            var user = res.data;
                            resolve(user);
                        }, function () {
                            // setAccessToken(null, null);
                            reject(null);
                        });
                } else {
                    // setAccessToken(null, null);
                    reject(null);
                }
            });
        }

        function getGoogleProfile(accessToken) {
            $http.get(Api.url.profile, {
                params: {
                    access_token: accessToken
                }
            }).then(function (res) {
                console.log(res.data);
            }, function (res) {
                console.warn('Could not fetch Google profile using given access token');
                console.warn(res);
            });
        }

        function getRole() {
            if (_currentUser) {
                return _currentUser.role;
            } else {
                return null;
            }
        }

        function getCurrentUser() {
            return _currentUser;
        }

        // Custom watcher - register observer
        function registerObserver(callback) {
            _observers.push(callback);
        }

        function setCurrentUser(currentUser) {
            _currentUser = currentUser;
            notifyObservers(_currentUser);
        }

        // Custom watcher - call observers
        function notifyObservers(user) {
            angular.forEach(_observers, function (callback) {
                callback(user);
            });
        }

        function setAccessToken(token, expiryDate) {
            _accessToken = token;
            $cookies.put(Api.cookie.access_token, token);
            $cookies.put(Api.cookie.access_token_exp, expiryDate);
        }

        function getAccessToken() {
            return $cookies.get(Api.cookie.access_token);
        }

        function getSessionCookie() {
            return $cookies.get(Api.cookie.session);
        }

        function getAccessTokenExpiry() {
            return $cookies.get(Api.cookie.access_token_exp);
        }
    });