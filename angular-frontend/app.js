var app = angular.module('employeeApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })
    .when('/employees', {
      templateUrl: 'views/employees.html',
      controller: 'EmployeesController'
    })
    .when('/employees/:id', {
      templateUrl: 'views/employee-details.html',
      controller: 'EmployeeDetailsController'
    })
    .when('/Contact', {
      templateUrl: 'contact.html'
    })
    .when('/About', {
      templateUrl: 'About.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.controller('HomeController', function($scope, $http, $location) {
  $scope.formData = {};

  $scope.addEmployee = function() {
    $http.post('http://localhost:3000/employees', $scope.formData)
      .then(function(response) {
        console.log('Employee added successfully:', response.data);
        $location.path('/employees');
      })
      .catch(function(error) {
        console.error('Error adding employee:', error);
      });
  };
});

app.controller('EmployeesController', function($scope, $http, $location) {
    $http.get('http://localhost:3000/employees')
      .then(function(response) {
        $scope.employees = response.data;
      })
      .catch(function(error) {
        console.error('Error fetching employees:', error);
      });
  
    $scope.viewEmployeeDetails = function(employeeId) {
      $location.path('/employees/' + employeeId);
    };

    $scope.editMode = false;
    $scope.editedEmployeeId = null;

    $scope.toggleEditMode = function(employeeId) {
        $scope.editMode = !$scope.editMode;
        if ($scope.editMode) {
            $scope.editedEmployeeId = employeeId;
        } else {
            $scope.editedEmployeeId = null;
        }
    };

    $scope.updateEmployee = function(employee) {
        $http.put('http://localhost:3000/employees/' + employee._id, employee)
            .then(function(response) {
                console.log('Employee updated successfully:', response.data);
                $scope.toggleEditMode();
            })
            .catch(function(error) {
                console.error('Error updating employee:', error);
            });
    };

    $scope.deleteEmployee = function(employeeId) {
        if (confirm("Are you sure you want to delete this employee?")) {
            $http.delete('http://localhost:3000/employees/' + employeeId)
                .then(function(response) {
                    console.log('Employee deleted successfully');
                    $scope.employees = $scope.employees.filter(function(employee) {
                        return employee._id !== employeeId;
                    });
                })
                .catch(function(error) {
                    console.error('Error deleting employee:', error);
                });
        }
    };
  });
  

app.controller('EmployeeDetailsController', function($scope, $http, $routeParams) {
  var id = $routeParams.id;
  $http.get('http://localhost:3000/employees/' + id)
    .then(function(response) {
      $scope.employee = response.data;
    })
    .catch(function(error) {
      console.error('Error fetching employee details:', error);
    });
});
