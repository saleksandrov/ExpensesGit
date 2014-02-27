var report_cat_old = new sap.m.Page("report_cat_old", {
          title: "Отчет по категориям",
          showNavButton: true,
          navButtonPress: function(){
              var oModel = sap.ui.getCore().getModel();
              initExpenseCard(oModel);
              var emptyTable = '{"getExpensesGroupByCategory": []}';
              var emptyTableModel = new sap.ui.model.json.JSONModel();
              emptyTableModel.setJSON(emptyTable);
              sapUiApp.back();
          },
          //icon: "http://www.sap.com/global/ui/images/global/sap-logo.png",
          content: reportCategory()
      });

function reportCategory() {
     var oModel = sap.ui.getCore().getModel();
     initExpenseCard(oModel);

     var year = new sap.m.Input( { value: "{/year}", type: "Number", width: "80px", tooltip: "Year" });
     var month = new sap.m.Select({
                title: "Месяц",
                items: [
                 new sap.ui.core.Item({key: "1", text: "январь"}),
                 new sap.ui.core.Item({key: "2", text: "февраль"}),
                 new sap.ui.core.Item({key: "3", text: "март"}),
                 new sap.ui.core.Item({key: "4", text: "апрель"}),
                 new sap.ui.core.Item({key: "5", text: "май"}),
                 new sap.ui.core.Item({key: "6", text: "июнь"}),
                 new sap.ui.core.Item({key: "7", text: "июль"}),
                 new sap.ui.core.Item({key: "8", text: "август"}),
                 new sap.ui.core.Item({key: "9", text: "сентябрь"}),
                 new sap.ui.core.Item({key: "10", text: "октябрь"}),
                 new sap.ui.core.Item({key: "11", text: "ноябрь"}),
                 new sap.ui.core.Item({key: "12", text: "декабрь"})
                ]
               });
     month.bindProperty("selectedKey","/selectedMonth");

    var reportButtom = new sap.m.Button({
                                        text: "Показать отчет",
                                        press: function() {
                                                          var month = sap.ui.getCore().getModel().getProperty("/selectedMonth");
                                                          var year = sap.ui.getCore().getModel().getProperty("/year");
                                                          var oModel = getExpensesGroupByCategory(year, month);
                                                          rt.setModel(oModel);
                                                      }
                                        });





    var rt = new sap.m.Table("rt1",{
        //selectionMode: sap.ui.table.SelectionMode.Single,
        //visibleRowCount: 2,
        columns: [
          new sap.m.Column({
                      header: new sap.m.Label({text: "Категория", design: sap.m.LabelDesign.Bold})

              }),
          new sap.m.Column({
                       header: new sap.m.Label({text: "Сумма", design: sap.m.LabelDesign.Bold})
               })
        ]

    });

    rt.bindItems("/getExpensesGroupByCategory", new sap.m.ColumnListItem({
            cells : [
                new sap.m.Text({text : "{name}"}),
                new sap.m.Text({text : "{amount}"})
             ]
        }));


    var toolbar = new sap.m.HBox({items:[year, month, reportButtom] });
    var pageLayout = new sap.m.VBox({items:[ toolbar, rt ]});

    return pageLayout;
}