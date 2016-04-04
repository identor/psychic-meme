export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/components/login/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .state('data-set', {
      url: '/data-set',
      templateUrl: 'app/training/image-data-set.html',
      controller: 'MainController',
      controllerAs: 'vm'
    })
    .state('training', {
      url: '/training',
      templateUrl: 'app/training/training.html',
      controller: 'MainController',
      controllerAs: 'vm'
    })
  ;

  $urlRouterProvider.otherwise('/training');
}
