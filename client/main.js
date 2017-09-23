import angular from 'angular';

import {
    Meteor
} from 'meteor/meteor';

// import {
//     name as Login
// } from '../imports/ui/components/login/login';

import {
    name as Socially
} from '../imports/ui/components/socially/socially';



function onReady() {
    angular.bootstrap(document, [
        // Login,
        Socially
    ], {
        strictDi: true
    });
}

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}
