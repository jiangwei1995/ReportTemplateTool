var app = angular.module("ReportTool",['ngTouch', 'ui.grid', 'ui.grid.resizeColumns','ui.grid.infiniteScroll']).directive("etReport",Report);
function Report(){
  return {
       restrict: 'ACE',
       link: function($scope, element, attrs) {
           $scope.getTemplateUrl = function() {
                switch ($scope.gridOptions.gridType) {
                  case "falls":
                    return 'template/fallsLoading.html';
                    break;
                  case "simple":
                    return 'template/simple.html';
                    break;
                  default:
                    return 'template/hello.html';
                }
           }
       },
       template: '<div ng-include="getTemplateUrl()"></div>',
       $scope : {
         gridOptions : "=gridOptions"
       },
       controller:function($scope, $http, $q, $timeout){
             $scope.gridData = {
               infiniteScrollRowsFromEnd: 40,
               infiniteScrollUp: true,
               infiniteScrollDown: true,
               columnDefs: [
                 { name:'Id'},
                 { name:'Name' },
                 { name:'Age' },
                 { name: "Company"},
                 { name: "Email"},
                 { name: "Phone"},
                 { name: "About"},
                 { name: "1st friend"},
                 { name: "2nd friend"},
                 { name: "3rd friend"},
                 { name: "Agetemplate"},
                 { name: "Is Active"},
                 { name: "Join Date"},
                 { name: "Month Joined"}
               ],
               data: 'data',
               onRegisterApi: function(gridApi){
                 gridApi.infiniteScroll.on.needLoadMoreData($scope, $scope.getDataDown);
                 gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, $scope.getDataUp);
                 $scope.gridApi = gridApi;
               }
             };


            $scope.getCurrentData = function(current){
              console.log(current);
              var promise = $q.defer();
              $http.get("http://127.0.0.1:3000/data/?pageSize="+100+"&current="+current)
              .success(function(data) {
                $scope.gridApi.infiniteScroll.saveScrollPercentage();
                $scope.gridData.data = $scope.gridData.data.concat(data);
                //$scope.checkDataLength('up', data);
                promise.resolve($scope.gridData.data);
              }).error(function(err){
                $scope.gridApi.infiniteScroll.dataLoaded();
                promise.reject(err);
              });
              return promise.promise;
            }

            $scope.checkDataLength = function( discardDirection, data) {

              // work out whether we need to discard a page, if so discard from the direction passed in
              if( $scope.lastPage - $scope.firstPage > 3 ){
                // we want to remove a page
                $scope.gridApi.infiniteScroll.saveScrollPercentage();

                if( discardDirection === 'up' ){
                    console.log($scope.gridData.data.slice(100));
                    console.log($scope.firstPage*100,$scope.lastPage*100)
                  $scope.gridData.data = $scope.gridData.data.slice($scope.firstPage*100,$scope.lastPage*100);
                  $scope.firstPage++;
                  // $timeout(function() {
                  //   // wait for grid to ingest data changes
                  //   $scope.gridApi.infiniteScroll.dataRemovedTop($scope.firstPage > 0, true);
                  // });
                } else {
                    console.log($scope.gridData.data.slice(0,400));
                    console.log($scope.firstPage*100,$scope.lastPage*100)
                  $scope.gridData.data = $scope.gridData.data.slice($scope.firstPage*100,$scope.lastPage*100);
                  $scope.lastPage--;
                  // $timeout(function() {
                  //   // wait for grid to ingest data changes
                  //   $scope.gridApi.infiniteScroll.dataRemovedBottom($scope.firstPage > 0, true);
                  // });
                }
              }
            };

             $scope.getDataDown = function() {
               var promise = $q.defer();
               //$scope.lastPage++;
               $scope.getCurrentData(++$scope.lastPage).then(function(data){
                 console.log("向下加载数据成功");
                 $scope.gridApi.infiniteScroll.dataLoaded($scope.firstPage > 0, true)
                 .then(function() {//$scope.checkDataLength('up', data);
                 }).then(function() {
                   promise.resolve();
                 });
               },function(err){
                 promise.reject(err);
               });
               return promise.promise;
             };

             $scope.getDataUp = function() {
               var promise = $q.defer();
               $scope.getCurrentData(--$scope.firstPage).then(function(data){
                 console.log("向上加载数据成功");
                 $scope.gridApi.infiniteScroll.dataLoaded($scope.firstPage > 0, true)
                 .then(function() {//$scope.checkDataLength('down', data);
                 }).then(function() {
                   promise.resolve();
                 });
               },function(err){
                 promise.reject(err);
               });

              //  $http.get('/data/codebeautify.json')
              //  .success(function(data) {
               //
              //    var newData = $scope.getPage(data, $scope.firstPage);
              //    $scope.gridApi.infiniteScroll.saveScrollPercentage();
              //     $scope.gridData.data =  $scope.gridData.data.concat($scope.data);
               //
              //    $scope.gridApi.infiniteScroll.dataLoaded($scope.firstPage > 0, $scope.lastPage < Math.floor(data.length/$scope.pageSize))
              //    .then(function() {$scope.checkDataLength('down', data);}).then(function() {
              //      promise.resolve();
              //    });
              //  })
              //  .error(function(error) {
               //
              //    promise.reject();
              //  });
               return promise.promise;
             };




             this.init = function (){
               $scope.gridData.data  = [];
               $scope.pageSize = 100;
               $scope.current = 1;
               $scope.firstPage = 1;
               $scope.lastPage = 1;
               $scope.getCurrentData($scope.current).then(function(){
                 console.log("数据加载成功");
               })
             }
             this.init();
       }
   }
}
