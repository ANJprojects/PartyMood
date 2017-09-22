import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './login.html';

import {
    name as Socially
} from '../socially/socially';

const name = 'login';

//create a module
export default angular.module(name, [
        angularMeteor,
        Socially,
        'accounts.ui'
    ])
    .component(name, {
        template,
        controllerAs: name
    });
