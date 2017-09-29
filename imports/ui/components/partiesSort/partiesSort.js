import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './partiesSort.html';

class PartiesSort {

    constructor($timeout, $scope, $reactive) {
        'ngInject';

        $timeout(() => this.changed());
        $timeout(function() {
            $('select').material_select();
        });
    }

    changed() {
        this.onChange({
            sort: {
                [this.property]: parseInt(this.order)
            }
        });
    }
}

const name = 'partiesSort';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    template,
    bindings: {
        onChange: '&',
        property: '@',
        order: '@'
    },
    controllerAs: name,
    controller: PartiesSort
});
