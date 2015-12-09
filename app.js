var app = angular.module("app",['ReportTool']);
 app.controller('MainCtrl', ['$scope', '$http', '$timeout','uiGridConstants','uiGridGroupingConstants' ,'$q', function ($scope, $http, $timeout, uiGridConstants, uiGridGroupingConstants,$q) {
   $scope.getDataDown = function(){
     $http.get("http://127.0.0.1:3000/data/?pageSize="+$scope.pageSize+"&current="+(++$scope.lastPage))
          .success(function(data) {
            $scope.gridApi.infiniteScroll.saveScrollPercentage();
            $scope.gridData.data = $scope.gridData.data.concat(data);
            $scope.gridApi.infiniteScroll.dataLoaded($scope.firstPage > 0, $scope.lastPage<$scope.totalPage)
          })
      }
  $scope.getDataUp = function(){
    $http.get("http://127.0.0.1:3000/data/?pageSize="+$scope.pageSize+"&current="+($scope.firstPage--))
         .success(function(data) {
           $scope.gridApi.infiniteScroll.saveScrollPercentage();
           $scope.gridData.data = data.concat($scope.gridData.data);
            $scope.gridApi.infiniteScroll.dataLoaded($scope.firstPage > 0, $scope.lastPage<$scope.totalPage)
         })
  }

  $scope.gridOptions = {
    gridType:"falls",
    columnDefs: [
      { name:'id',width:100,maxWidth:300,minWidth:100,displayName:"子订单编号"},
      { name:'orderId',width:200,displayName:"订单编号",grouping: { groupPriority: 0 },aggregationType: uiGridConstants.aggregationTypes.count,aggregationLabel:"总条数："  },
      { name:'productName',width:100 ,displayName:"商品名称"},
      { name: "productBrand",width:200,displayName:"商品品牌" ,enableSorting: false,enableGrouping:false  },
      { name: "weight",width:200 ,displayName:"重量(KG)" ,enableColumnMenu: false,rowHeight:100},
      { name: "salesArea",width:200,displayName:"销售地区", enableColumnResize: false},
      { name: "salesYear",width:200,displayName:"销售年"  },
      { name: "salesMonth",width:200,displayName:"销售月"  },
      { name: "salesDay",width:200,displayName:"销售日"  },
      { name: "price",width:200 ,displayName:"商品价格"},
      { name: "quantity",width:100 ,displayName:"购买数量" ,treeAggregationType: uiGridGroupingConstants.aggregation.SUM,aggregationType: uiGridConstants.aggregationTypes.sum,treeAggregationLabel:""},
      { name: "money",width:300 ,displayName:"金额",cellTemplate:'<div ng-if="!row.groupHeader" >{{row.entity.price * row.entity.quantity}}</div>'}
    ],
    gridDataUrl:"",
    gridData:[],
    Down: $scope.getDataDown,
    Up: $scope.getDataUp
  };

  this.init = function (){
    $scope.pageSize = 100;
    $scope.firstPage = 0;
    $scope.lastPage = 0;
    $http.get("http://127.0.0.1:3000/count").success(function(data){
        $scope.totalCount = data.count ;
        $scope.totalPage = Math.ceil(data.count/$scope.pageSize);
    })
    $http.get("http://127.0.0.1:3000/data/?pageSize="+$scope.pageSize+"&current=1")
         .success(function(data) {
          // $scope.gridApi.infiniteScroll.saveScrollPercentage();
           $scope.gridOptions.gridData =  data;
           setTimeout(function(){
             $scope.gridApi.infiniteScroll.dataLoaded($scope.firstPage > 0, $scope.lastPage<$scope.totalPage);
           },6)
           console.log($scope.gridOptions);
         })
  }
  this.init();

}]);
