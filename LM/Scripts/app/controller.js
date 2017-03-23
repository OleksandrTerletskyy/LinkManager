(function (angular) {
	function linkCtrl($scope, $filter,ngDialog,linkService) {
		var currentEditingId;

		// Search field is empty, not works correct without that
		$scope.search = "";
		$scope.serverValidationErrors = {};
		// Array of all links awailable
		var linkarray = [];

		function start() {
			$scope.loading = true;
			var linksPromise = linkService.getLinks();
			linksPromise.then(
				function (response) {
				linkarray = JSON.parse(response.data);
				$scope.paginationReload();
				$scope.loading = false;
				},
				function (response) {
					alert("Unexpected error: " + JSON.parse(response));
				}
			);
		}

		$scope.addNewLink = function () {
			$scope.serverValidationErrors.linkInput = "";
			linkService.addNewLink($scope.linkInput, new Date())
				.then(
				function (response) {
					var responseObj = JSON.parse(response.data);
					if (responseObj.Errors.length) {
						$scope.serverValidationErrors.linkInput = responseObj.Errors[0].Message;
						return;
					}
					linkarray.push(responseObj.Data);
					$scope.linkInput = "";
					$scope.addLinkForm.$setPristine();
					$scope.paginationReload();
				},
				function () {
					alert("Adding a link has failed !");
				});
		};

		$scope.saveEditedLink = function () {
			$scope.serverValidationErrors.editlinkInput = "";
			linkService.updateLink(currentEditingId, $scope.editLinkInput)
				.then(
				function (response) {
					var responseObj = JSON.parse(response.data);
					if (responseObj.Errors.length) {
						$scope.serverValidationErrors.editlinkInput = responseObj.Errors[0].Message;
						return;
					}
					linkarray.forEach(function (l, index) {
						if (l.id === currentEditingId) {
							linkarray[index].link = $scope.editLinkInput;
						}
					});
					$scope.editLinkForm.$setPristine();
					$scope.isLinkEditing = false;
					$scope.paginationReload();
				},
				function () {
					alert("Updating a link has failed !");
				}
				);
		};

		$scope.deleteLink = function (id) {
			linkService.deleteLink(id)
				.then(
				function () {
					linkarray.forEach(function (l, index) {
						if (l.id === id) {
							linkarray.splice(index, 1);
						}
					});
					$scope.paginationReload();
				},
				function() {
					alert("Removing a link has failed !");
				}
			);
		};

		$scope.setEditingLink = function (id, link) {
			$scope.serverValidationErrors.editlinkInput = "";
			$scope.isLinkEditing = true;
			currentEditingId = id;
			$scope.editLinkInput = link;
		}

		$scope.setAddingLink = function () {
			$scope.isLinkAdding = $scope.isLinkAdding ? false : true;
			$scope.serverValidationErrors.linkInput = "";
		}

		$scope.getFieldError = function (error) {
			if (angular.isDefined(error)) {
				if (error.required) {
					return "Field can't be empty !";
				}
				if (error.url) {
					return "Please enter a valid url !";
				}
			}
			return "Unknown error";
		}

		$scope.deleteConfirm = function (link) {
			ngDialog.openConfirm(
			{
				template: "/Templates/Dialogs/ConfirmationDialog.html",
				className: "ngdialog-theme-default",
				scope: $scope,
				height: 150,
				width: 400,
				showClose: false,
				disableAnimation: true,
				controller: ["$scope", function ($scope) {
					$scope.deletingLink = link;
					$scope.deleteHandler = function () {
						$scope.deleteLink(link.id);
					}
				}]
			});
		}

		// Pagination logic

		//Max amount of nav page numbers
		$scope.gap = 4;

		$scope.currentPage = 0;

		//Count of links per page
		$scope.itemsPerPage = 10;

		$scope.filteredLinks = [];

		// Array of arrays, key is page number, value is array of links
		$scope.pagedItems = [];

		$scope.prevPage = function () {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
			}
		};

		$scope.nextPage = function () {
			if ($scope.currentPage < $scope.pagedItems.length - 1) {
				$scope.currentPage++;
			}
		};

		$scope.setPage = function () {
			$scope.currentPage = this.n;
		};

		$scope.paginationReload = function () {
			$scope.currentPage = 0;
			// Filter by input in the head of page
			$scope.filteredLinks = $filter("filter")(linkarray, { link: $scope.search });
			$scope.groupToPages();
		};

		// Distributes links by pages
		$scope.groupToPages = function () {
			$scope.pagedItems = [];
			for (var i = 0; i < $scope.filteredLinks.length; i++) {
				if (i % $scope.itemsPerPage === 0) {
					$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredLinks[i]];
				}
				else {
					$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredLinks[i]);
				}
			}
		};

		// Range of page numbers
		$scope.range = function (size, start, end) {
			var ret = [];
			if (size < end) {
				end = size;
				start = (size - $scope.gap) < 0 ? 0 : size - $scope.gap;
			}
			for (var i = start; i < end; i++) {
				ret.push(i);
			}
			return ret;
		};

		start();

	}

	angular.module("LinkManagerApp").controller("LinkCtrl", linkCtrl);

	linkCtrl.$inject = ["$scope", "$filter", "ngDialog", "LinkService"];

})(angular);