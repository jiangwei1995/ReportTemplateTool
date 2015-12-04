var app = angular.module("app",['ReportTool']);
 app.controller('MainCtrl', ['$scope', '$http', '$timeout', '$q', function ($scope, $http, $timeout, $q) {
  $scope.gridOptions = {
    gridType:"falls",
    gridDataUrl:"",
    gridData:[{
        "Id": "0",
        "Name": "Sandoval Mclean",
        "Age": "30",
        "Address.Street": "317",
        "Address.City": "Blairstown",
        "Address.State": "Maine",
        "Address.Zip": "390",
        "Company": "Zolavo",
        "Email": "sandovalmclean@zolavo.com",
        "Phone": "+1 (902) 569-2412",
        "About": "Fugiat velit laboris sit est. Amet eu consectetur reprehenderit proident irure non. Adipisicing mollit veniam enim veniam officia anim proident excepteur deserunt consectetur aliquip et irure. Elit aliquip laborum qui elit consectetur sit proident adipisicing.\n",
        "1st friend": "Rosanne Barrett",
        "2nd friend": "Nita Chase",
        "3rd friend": "Briggs Stark",
        "Agetemplate": "30",
        "Is Active": "FALSE",
        "Join Date": "1991-02-21T17:02:31.000Z",
        "Month Joined": "1991-02-21T17:02:31.000Z"
    },
    {
        "Id": "1",
        "Name": "Nieves Mack",
        "Age": "22",
        "Address.Street": "155",
        "Address.City": "Cherokee",
        "Address.State": "Kentucky",
        "Address.Zip": "4723",
        "Company": "Oulu",
        "Email": "nievesmack@oulu.com",
        "Phone": "+1 (812) 535-2614",
        "About": "Culpa anim anim nulla deserunt dolor exercitation eu in anim velit. Consectetur esse cillum ea esse ullamco magna do voluptate sit ut cupidatat ullamco. Et consequat eu excepteur do Lorem aute est quis proident irure.\n",
        "1st friend": "Brewer Maxwell",
        "2nd friend": "Ayala Franks",
        "3rd friend": "Hale Nichols",
        "Agetemplate": "22",
        "Is Active": "FALSE",
        "Join Date": "1989-07-26T10:52:15.000Z",
        "Month Joined": "1989-07-26T10:52:15.000Z"
    }]
  }
}]);
