import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';


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
import {
    name as OwnedParties
} from '../ownedParties/ownedParties';
import {
    name as PublicParties
} from '../publicParties/publicParties'

class PartiesList {
    constructor($scope, $reactive, $timeout) {
        'ngInject';

        $reactive(this).attach($scope);
        this.searchText = '';
        this.clickOwnedParties = false;
        this.clickPublicParties = false;

        $timeout(function() {
            $('.scrollspy').scrollSpy({
                scrollOffset: 50
            });
        });

        this.userId = Meteor.userId();

        this.subscribe('users');
        console.log(this.clickOwnedParties);
        console.log(this.clickPublicParties);
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
        //PartyUninvited,
        PartyRsvp,
        PartyRsvpsList,
        PartyUnanswered,
        OwnedParties,
        PublicParties

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
