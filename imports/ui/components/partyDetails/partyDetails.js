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
    name as PartyUninvitedUsers
} from '../partyUninvitedUsers/partyUninvitedUsers';
import {
    name as PartyRsvp
} from '../partyRsvp/partyRsvp';
import {
    name as PartyRsvpsList
} from '../partyRsvpsList/partyRsvpsList';
import {
    name as PartyCreator
} from '../partyCreator/partyCreator';

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
        this.selector = {};
        this.subscribe('parties', () => [this.selector]);
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
                console.log(Meteor.users.find({}));
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
    invite() {
        console.log(this.party.owner);
        console.log(Meteor.userId());
        if (this.party.owner === Meteor.userId() && !this.party.public) {
            console.log("true");
            return true;
        }
        return false;
    }

}

const name = 'partyDetails';

// create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter,
        PartyUninvitedUsers,
        PartyRsvp,
        PartyRsvpsList,
        PartyCreator

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
