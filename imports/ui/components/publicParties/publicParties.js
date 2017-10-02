import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import template from './publicParties.html';

import {
    Counts
} from 'meteor/tmeasday:publish-counts';

import {
    Parties
} from '../../../api/parties';

import {
    name as PartiesSort
} from '../partiesSort/partiesSort';

class PublicParties {
    constructor($scope, $reactive, $timeout) {
        'ngInject';

        $reactive(this).attach($scope);
        this.userId = Meteor.userId();

        this.searchText = '';
        this.perPage = 3;
        this.page = 1;
        this.sort = {
            name: 1
        };

        this.selector = {
            // the public parties
            $and: [{
                public: true
            }, {
                public: {
                    $exists: true
                }
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

const name = 'publicParties';

// create a module
export default angular.module(name, [
    angularMeteor,
    PartiesSort,
    uiRouter,
    utilsPagination,
]).component(name, {
    template,
    controllerAs: name,
    controller: PublicParties
})
