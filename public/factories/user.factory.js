'use strict';
angular.module('WebMIDI').factory('UserModel', function () {
    /**
     *
     * @param {String} id
     * @param {String} name full name (first + last)
     * @param {String} firstName
     * @param {String} lastName
     * @param {String} email
     * @param {String} accessToken
     * @param {Number} accessTokenExpiry
     * @param {String} googleId
     * @constructor
     */
    function UserModel(id, name, firstName, lastName, email, accessToken, accessTokenExpiry, googleId) {
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.accessToken = accessToken;
        this.accessTokenExpiry = accessTokenExpiry;
        this.googleId = googleId;
    }

    return UserModel;
});