(function (angular) {
	function linkService($http) {
		function updateLink(id, linkText) {
			var promise = $http.post("/Link/UpdateLink", {
				LinkText: linkText,
				Id: id,
				CreationDate : new Date() // makes no sense but in case null server validation will fail
			});
			return promise;
		}

		function deleteLink(id) {
			var promise = $http.post("/Link/RemoveLink", {
				id:id
			});
			return promise;
		}

		function addNewLink(linkText,linkCreationDate) {
			var promise = $http.post("/Link/AddLink",
			{
				LinkText: linkText,
				CreationDate: linkCreationDate,
				Id: 0
			});
			return promise;
		}

		function getLinks() {
			var promise = $http.get("/Link/GetLinks");
			return promise;
		}

		var service = {
			getLinks: getLinks,
			addNewLink: addNewLink,
			deleteLink: deleteLink,
			updateLink : updateLink
		};

		return service;
	}

	angular
        .module("LinkManagerApp")
        .factory("LinkService", linkService);

	linkService.$inject = ["$http"];
})(angular);