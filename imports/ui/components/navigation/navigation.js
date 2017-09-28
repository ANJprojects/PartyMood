import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './navigation.html';
import {
    name as Login
} from '../login/login';

class Navigation {
    constructor($timeout, $scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        $timeout(function() {
            $('.tooltipped').tooltip({
                delay: 50
            });
        }, 100);
        this.click = false;
        this.searchText = '';
        this.helpers({
            kl() {
                console.log("searchtext:" +
                    this.getReactively('searchText'));
            }
        });

    }
}

const name = 'navigation';

//create a module
export default angular.module(name, [
        angularMeteor,

        'accounts.ui',
        Login
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Navigation
    });
