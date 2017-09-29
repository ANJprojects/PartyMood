import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import {
    Counts
} from 'meteor/tmeasday:publish-counts';

import {
    Parties
} from '../../../api/parties';
import template from './partiesList.html';
import {
    name as PartiesSort
} from '../partiesSort/partiesSort';
import {
    name as PartyAdd
} from '../partyAdd/partyAdd';
import {
    name as PartyRemove
} from '../partyRemove/partyRemove';
import {
    name as PartyCreator
} from '../partyCreator/partyCreator';
import {
    name as PartyRsvp
} from '../partyRsvp/partyRsvp';
import {
    name as PartyRsvpsList
} from '../partyRsvpsList/partyRsvpsList';
import {
    name as PartyUnanswered
} from '../partyUnanswered/partyUnanswered';

class PartiesList {
    constructor($scope, $reactive, $timeout) {
        'ngInject';

        $reactive(this).attach($scope);
        this.searchText = '';
        this.perPage = 3;
        this.page = 1;
        this.sort = {
            name: 1
        };
        $timeout(function() {
            $('.scrollspy').scrollSpy({
                scrollOffset: 50
            });
        });

        this.userId = Meteor.userId();
        this.selector = {
            $or: [{
                // the public parties
                $and: [{
                    _id: this.userId
                }, {
                    _id: {
                        $exists: true
                    }
                }]
            }, {
                // when logged in user is the owner
                $and: [{
                    owner: this.userId
                }, {
                    owner: {
                        $exists: true
                    }
                }]
            }, {
                // when logged in user is one of invited
                $and: [{
                    invited: this.userId
                }, {
                    invited: {
                        $exists: true
                    }
                }]
            }]
        };

        this.subscribe('parties', () => [this.selector, {
            limit: parseInt(this.perPage),
            skip: parseInt((this.getReactively('page') - 1) * this.perPage),
            sort: this.getReactively('sort')
        }, this.getReactively('searchText')]);

        this.subscribe('users');

        this.helpers({
            parties() {
                return Parties.find({}, {
                    sort: this.getReactively('sort')
                });

            },
            partiesCount() {
                return Counts.get('numberOfParties');
            }
        });
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    sortChanged(sort) {
        this.sort = sort;
    }
}

const name = 'partiesList';

// create a module
export default angular.module(name, [
        angularMeteor,
        PartyAdd,
        PartyRemove,
        PartyCreator,
        PartiesSort,
        uiRouter,
        utilsPagination,
        //PartyUninvited,
        PartyRsvp,
        PartyRsvpsList,
        PartyUnanswered

    ]).component(name, {
        template,
        controllerAs: name,
        controller: PartiesList
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider.state('parties', {
        url: '/parties',
        template: '<parties-list></parties-list>'
    });
}
