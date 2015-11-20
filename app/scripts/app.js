'use strict';
/**
 * @ngdoc overview
 * @name jyzAdminApp
 * @description
 * # jyzAdminApp
 *
 * Main module of the application.
 */
angular
  .module('jyzAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'snap',
    'ui.bootstrap',
    'ngAnimate',
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });
    $urlRouterProvider.when('/dashboard', '/dashboard/home');   //设置默认
    $urlRouterProvider.when('/dashboard/home', '/dashboard/home/chart');   //设置默认
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('base', {
          abstract: true,
          url: '',
          template:'<div class="ui-base"><div ui-view></div></div>'
      })
      .state('login', {
            url: '/login',
            parent: 'base',
            templateUrl: 'views/login.html',
            controller: function($scope,$state,$http){
              $scope.submit = function() {
                $state.go('home');
                return false;
              }
            }
        })
      .state('dashboard', {
        url:'/dashboard',
        parent: 'base',
        template: '<div class="dashboard-page"><div class="container-fluid"><div class="row"><div class="col-sm-12 col-md-12 main" ui-view></div></div></div></div>',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){      //引入依赖，按需加载
                return $ocLazyLoad.load(
                {
                    name:'jyzAdminApp',
                    files:[
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
    .state('services', {
        url: '/services',
        parent: 'dashboard',
        templateUrl: 'views/services.html'
    })
    .state('ye', {
        url: '/ye',
        parent: 'services',
        templateUrl: 'views/services/ye.html'
    })
    .state('apps', {
        url: '/apps',
        parent: 'dashboard',
        templateUrl: 'views/apps.html'
    })
    .state('events', {
        url: '/events',
        parent: 'dashboard',
        templateUrl: 'views/events.html'
    })
    .state('news', {
        url: '/news',
        parent: 'dashboard',
        templateUrl: 'views/news.html'
      })
     .state('users', {
        url: '/users',
        parent: 'dashboard',
        templateUrl: 'views/users.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'jyzAdminApp',
              files:[
                'scripts/controllers/users.js'
              ]
            })
          }
        }
    })
      .state('owners', {
         url: '/owners',
         parent: 'users',
         templateUrl: 'views/user/owners.html'
     })
      .state('designers', {
          url: '/designers',
          parent: 'users',
          templateUrl: 'views/user/designers.html'
      })
      .state('products', {
           url: '/products',
           parent: 'users',
           templateUrl: 'views/user/products.html'
       })
      .state('home',{
        url:'/home',
        parent: 'dashboard',
        controller: 'MainCtrl',
        templateUrl:'views/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'jyzAdminApp',
              files:[
              'scripts/controllers/main.js'
              ]
            })
          }
        }
      })
      .state('chart',{
          templateUrl:'views/home/chart.html',
          url:'/chart',
          parent: 'home',
          controller:'ChartCtrl',
          resolve: {
            loadMyFile:function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name:'chart.js',
                files:[
                  'bower_components/angular-chart.js/dist/angular-chart.min.js',
                  'bower_components/angular-chart.js/dist/angular-chart.css'
                ]
              }),
              $ocLazyLoad.load({
                  name:'jyzAdminApp',
                  files:['scripts/controllers/chartContoller.js']
              })
            }
          }
      })
      .state('form',{
          templateUrl:'views/home/form.html',
          url:'/form',
          parent: 'home',
          controller:'FormCtrl',
          resolve: {
            loadMyFile:function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name:'jyzAdminApp',
                  files:['scripts/controllers/form.js']
              })
            }
          }
      })
      .state('table',{
          templateUrl:'views/home/table.html',
          url:'/table',
          parent: 'home',
          controller:'TableCtrl',
          resolve: {
            loadMyFile:function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name:'jyzAdminApp',
                  files:['scripts/controllers/table.js']
              })
            }
          }
      })
  }]);

    
