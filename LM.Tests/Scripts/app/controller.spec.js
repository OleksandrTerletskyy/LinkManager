/// <reference path="../../../LM/Scripts/app/*.js"/>
/// <reference path="../../../LM/Scripts/libs/*.js"/>
/// <reference path="../lib/mock/*.js"/>
/// <reference path="../lib/jasmine/*.js"/>

describe('Link Controller Test', function () {
	var mockScope = {};
	var controller;

	beforeEach(module('LinkManagerApp'));

	beforeEach(function () {
		angular.mock.inject(function($controller, $rootScope) {
			mockScope = $rootScope.$new();
			controller = $controller("LinkCtrl", {
				$scope : mockScope
			});
		});
	});

	it("Controller scope initialization", function() {
		expect(mockScope.search).ToEqual("");
	});
});

