import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {
    Meteor
} from 'meteor/meteor';

import template from './partyUninvitedUsers.html';
import {
    name as UninvitedFilter
} from '../../filters/uninvitedFilter';
import {
    name as DisplayNameFilter
} from '../../filters/displayNameFilter';

class PartyUninvitedUsers {
    constructor($scope) {
        'ngInject';

        $scope.viewModel(this);
        console.log("these are users" + Meteor.users.find({}));

        this.helpers({
            users() {
                console.log(Meteor.users.find({}));
                return Meteor.users.find({});
            }
        });
    }

    invite(user) {
        Meteor.call('invite', this.party._id, user._id,
            (error) => {
                if (error) {
                    console.log('Oops, unable to invite!');
                } else {
                    console.log('Invited!');
                }
            }
        );
    }
}

const name = 'partyUninvitedUsers';

// create a module
export default angular.module(name, [
    angularMeteor,
    UninvitedFilter,
    DisplayNameFilter
]).component(name, {
    template,
    controllerAs: name,
    bindings: {
        party: '<'
    },
    controller: PartyUninvitedUsers
});
