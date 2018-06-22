angular.module('WebMIDI').service('Authenticate',
    function ($http, $q, $timeout, $state, Api, $cookies) {
        this.verifyAccessToken = verifyAccessToken;
        this.logout = logout;
        this.isAuthenticated = isAuthenticated;
        this.getRole = getRole;
        this.registerObserver = registerObserver;
        this.setCurrentUser = setCurrentUser;
        this.getCurrentUser = getCurrentUser;
        this.fetchCurrentUser = fetchCurrentUser;
        this.getAccessToken = getAccessToken;
        this.setAccessToken = setAccessToken;
        this.getAccessTokenExpiry = getAccessTokenExpiry;
        this.restoreSession = restoreSession;

        var _accessToken = undefined;
        var _currentUser = undefined;

        function logout() {
            // Remove token from server & client cookies
            _currentUser = undefined;
            $state.go('login');
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

            if (accessTokenExpiry && accessToken) {
                var timestampExpiry = new Date(0).setUTCSeconds(accessTokenExpiry);
                return (timestampNow < timestampExpiry);
            }
            console.log('No valid access token found');
            return false;
        }

        function restoreSession() {
            return $q(function (resolve, reject) {
                $http.get(Api.url.user)
                    .then(function (res) {
                        var user = res.data;
                        setCurrentUser(user);
                        resolve(user);
                    }, function () {
                        reject(null);
                    });
            });
        }

        function fetchCurrentUser() {
            return $q(function (resolve, reject) {
                $http.get(Api.url.user)
                    .then(function (res) {
                        var user = res.data;
                        console.log(user);
                        setCurrentUser(user);
                        resolve(user);
                    }, function (error) {
                        reject(error)
                    });
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