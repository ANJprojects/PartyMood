import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './navigation.html';
import {
    name as Login
} from '../login/login';

const name = 'navigation';

//create a module
export default angular.module(name, [
        angularMeteor,

        'accounts.ui',
        Login
    ])
    .component(name, {
        template,
        controllerAs: name
    });
