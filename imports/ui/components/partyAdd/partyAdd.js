import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import {
    Meteor
} from 'meteor/meteor';

import template from './partyAdd.html';
import {
    Parties
} from '../../../api/parties';

class PartyAdd {
    constructor() {
        this.party = {};
    }

    submit() {
        this.party.owner = Meteor.userId();
        Parties.insert(this.party);
        this.reset();
    }

    reset() {
        this.party = {};
    }
}

const name = 'partyAdd';

//create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: PartyAdd
    }).config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('partyAdd', {
        url: '/add',
        template: '<party-add></party-add>'
    });
}
