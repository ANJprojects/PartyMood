import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {
    Meteor
} from 'meteor/meteor';

import template from './partyCreator.html';
import {
    name as DisplayNameFilter
} from '../../filters/displayNameFilter';

/**
 * PartyCreator component
 */
class PartyCreator {
    constructor($scope) {
        'ngInject';

        $scope.viewModel(this);
    }
    $onInit() {
        const self = this;
        this.subscribe('users');
        this.helpers({
            creator() {
                // console.log("this is owner" + this.party.owner);
                if (!self.party) {
                    return '';
                }

                const owner = self.party.owner;
                // console.log("this is owner" + owner);

                if (Meteor.userId() !== null && owner === Meteor.userId()) {
                    // console.log("this is owner" + owner);
                    return 'Me';
                }
                // console.log("this is owner" + owner);
                return Meteor.users.findOne(owner);
            }
        });
    }

}

const name = 'partyCreator';

// create a module
export default angular.module(name, [
    angularMeteor,
    DisplayNameFilter
]).component(name, {
    template,
    bindings: {
        party: '<'
    },
    controllerAs: name,
    controller: PartyCreator
});
