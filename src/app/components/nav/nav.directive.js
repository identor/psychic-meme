export function NavDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/nav/nav.html',
    scope: {
        creationDate: '='
    },
    controller: NavController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class NavController {
  constructor ($state) {
    'ngInject';

    this.$state = $state;
  }
}

