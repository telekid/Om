app.controller("MainController", function($scope){
	$scope.items = [
    {
      id: 1,
      addendum: 1,
      to_submit: true,
      submitted: "12-jan",
      action: "add",
      category: "Microphones",
      make: "DPA",
      model: "4061 IMK",
      name: "loose",
      note: "Something important",
      bid_note: "Black",
      purpose: "Violins"
    },
    {
      id: 2,
      addendum: 1,
      to_submit: true,
      submitted: "12-jan",
      action: "add",
      category: "Microphones",
      make: "DPA",
      model: "4061 IMK",
      name: "loose",
      note: "Something important",
      bid_note: "Black",
      purpose: "Violins"
    },
    {
      id: 3,
      addendum: 1,
      to_submit: false,
      submitted: "12-jan",
      action: "add",
      category: "Microphones",
      make: "Shure",
      model: "565-SD",
      name: "loose",
      note: "",
      bid_note: "",
      purpose: ""
    }
	];
  $scope.newItem = null;
  $scope.addNewItem = function() {
      if ($scope.newItem != null && $scope.newItem != "") {
          $scope.items.push({
              id: $scope.items.length,
              addendum: 1,
              to_submit: false,
              submitted: "",
              action: "",
              category: "",
              make: "",
              model: "",
              name: $scope.newItem,
              note: "",
              bid_note: "",
              purpose: ""
          });
      }
  }
});