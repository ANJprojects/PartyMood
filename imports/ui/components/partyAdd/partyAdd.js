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
        template: '<party-add></party-add>',
        resolve: {
            authenticate: function($q, $state, $timeout) {
                let deferred = $q.defer();
                Tracker.autorun(function(a) {
                    let owner = Meteor.userId();
                    if (owner === null) {
                        a.stop();
                        $timeout(function() {
                            $state.go('login');
                        }, 0);

                    } else {
                        a.stop();
                        return deferred.resolve();
                    }
                });
                return deferred.promise;
            }
        }

    });

}
