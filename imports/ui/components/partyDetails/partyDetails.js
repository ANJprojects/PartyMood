import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import {
    Meteor
} from 'meteor/meteor';

import template from './partyDetails.html';
import {
    Parties
} from '../../../api/parties';
import {
    name as PartyUninvited
} from '../partyUninvited/partyUninvited';

class PartyDetails {
    constructor($stateParams, $scope, $reactive, $timeout) {
        'ngInject';

        $reactive(this).attach($scope);

        this.partyId = $stateParams.partyId;
        $timeout(function() {
            $('ul.tabs').tabs({
                swipeable: true,
                responsiveThreshold: 1920
            });
        }, 100);
        // $scope.initializeTabs = function() {
        //     $('ul.tabs').tabs({
        //         swipeable: true,
        //         responsiveThreshold: 1920
        //     });
        // };

        this.subscribe('parties');
        this.subscribe('users');

        this.helpers({
            party() {
                const party = Parties.findOne({
                    _id: $stateParams.partyId
                });
                console.log(party);
                return party;
            },
            users() {
                return Meteor.users.find({});
            }
        });
    }

    save() {
        Parties.update({
            _id: this.party._id
        }, {
            $set: {
                name: this.party.name,
                description: this.party.description,
                public: this.party.public
            }
        }, (error) => {
            if (error) {
                console.log('Oops, unable to update the party...');
            } else {
                console.log('Done!');
            }
        });
    }
}

const name = 'partyDetails';

// create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter,
        PartyUninvited
    ]).component(name, {
        template,
        controllerAs: name,
        controller: PartyDetails
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('partyDetails', {
        url: '/parties/:partyId',
        template: '<party-details></party-details>',
        // resolve: {
        //     currentUser($q) {
        //         if (Meteor.userId() === null) {
        //             return $q.reject('AUTH_REQUIRED');
        //         } else {
        //             return $q.resolve();
        //         }
        //     }
        // }
    });
}
