#UI-Grid教程
##基础篇 
*   1.安装第三方依赖库   
bower install angular-ui-grid   
*   2.页面引入第三方库文件    
**angular** *angular.js*  
**angular-ui-grid** *ui-grid.js、ui-grid.js*   
*   3.应用引用第三方模块    
**JS代码** *angular.module('app', ['ui.grid'])*    
*   4.使用方式   
**HTML代码**   
``<div ng-init="myData=[{'编号':1,'姓名':'张三'}]"></div>``   
``<div ui-grid="{data:myData}"></div>``

##基础api  
+ ``data: []  显示的数据集合(必填) ``
+ ``columnDefs: undefined, //配置列的显示 (默认空)``
+ ``enableColumnResize: false, //启用或禁用调整列宽大小 (默认false)``
+ ``enableSorting: true, //启用或禁用排序(默认true)``
+ ``headerRowHeight: 30, //表头行高度(默认30)``
+ ``headerRowTemplate: undefined, //表头模板 (默认空)``
+ ``pagingOptions: { }, //分页配置  ``
+ ``rowHeight: 30, //表体行高度 ``
+ ``rowTemplate: undefined, //表体行模板``
+ ``showColumnMenu: false, //是否显示列菜单``
+ ``showFooter: false, //是否显示表格脚部 ``
+ ``i18n: en , //设置语言``
+ ``enableGridMenu: false, //是否显示表格菜单``
