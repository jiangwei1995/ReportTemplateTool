var app = angular.module("ReportTool",['ngTouch', 'ui.grid', 'ui.grid.resizeColumns','ui.grid.infiniteScroll','ui.grid.cellNav', 'ui.grid.pinning','ui.grid.selection', 'ui.grid.exporter','ui.grid.grouping','ui.grid.pagination']).directive("etReport",Report);
function Report(){
  return {
       restrict: 'ACE',
       link: function($scope, element, attrs) {
           console.log($scope.gridOptions);
           $scope.getTemplateUrl = function() {
                switch ($scope.gridOptions.gridType) {
                  case "falls":
                    return 'template/fallsLoading.html';
                    break;
                  case "pagin":
                      return 'template/paginaction.html';
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
       controller:function($scope, $http, $q, $timeout,uiGridGroupingConstants,  i18nService){
           i18nService.setCurrentLang('zh-cn');
            $scope.gridData = {
               paginationPageSizes: [25, 50, 75],
               paginationPageSize: 25,
               showColumnFooter: true,
               infiniteScrollRowsFromEnd: 40,
               infiniteScrollUp: true,
               infiniteScrollDown: true,
               enableHorizontalScrollbar : 2,
               i18n: 'zh-cn',
              // enableVerticalScrollbar : 2,
               columnDefs:  $scope.gridOptions.columnDefs,
               data: $scope.gridOptions.gridData,
               enableGridMenu: true,
               enableSelectAll: true,
               exporterCsvFilename: 'myFile.csv',
               exporterPdfDefaultStyle: {fontSize: 9},
               exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
               exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
               exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
               exporterPdfFooter: function ( currentPage, pageCount ) {
                  return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
               },
               exporterPdfCustomFormatter: function ( docDefinition ) {
                 docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                 docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                 return docDefinition;
               },
               exporterPdfOrientation: 'portrait',
               exporterPdfPageSize: 'LETTER',
               exporterPdfMaxGridWidth: 500,
               exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
               onRegisterApi: function(gridApi){
                 gridApi.infiniteScroll.on.needLoadMoreData($scope, $scope.gridOptions.Down);
                 gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, $scope.gridOptions.Up);
                 $scope.gridApi = gridApi;
               }
             };
       }
   }
}
