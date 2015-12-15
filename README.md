#UI-Grid教程
##基础篇 
1.安装第三方依赖库   
bower install angular-ui-grid   
2.页面引入第三方库文件    
**angular** *angular.js*  
**angular-ui-grid** *ui-grid.js、ui-grid.js*   
3.应用引用第三方模块    
**JS代码** *angular.module('app', ['ui.grid'])*    
4.使用方式   
**HTML代码**
``<div ng-init="myData=[{'编号':1,'姓名':'张三'}]"></div>`` 
``<div ui-grid="{data:myData}"></div>``




