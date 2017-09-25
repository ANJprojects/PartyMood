import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './login.html';

const name = 'login';
export default angular.module(name, [
        angularMeteor,

        'accounts.ui',
        // Socially,
        // 'accounts.ui'
    ])
    .component(name, {
        template,
        controllerAs: name

    }).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider.state('login', {
        url: '/login',
        template: '<login></login>'
    });
}
