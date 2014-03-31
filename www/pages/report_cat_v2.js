var rc_table = new sap.m.Table("rc1",{
    columns: [
        new sap.m.Column({header: new sap.m.Label({text: "Категория", design: sap.m.LabelDesign.Bold}) }),
        new sap.m.Column({header: new sap.m.Label({text: "Сумма", design: sap.m.LabelDesign.Bold}) })
    ]
});

rc_table.bindItems("/getExpensesGroupByCategory", new sap.m.ColumnListItem({
    cells : [
        new sap.m.Text({text : "{name}"}),
        new sap.m.Text({text : "{amount}"})
    ]
}));

var totalTable = new sap.m.Table("rctt1",
   {
    columns: [
        new sap.m.Column({header: new sap.m.Label({text: "", design: sap.m.LabelDesign.Bold}),  width: "70%"}),
        new sap.m.Column({header: new sap.m.Label({text: "", design: sap.m.LabelDesign.Bold}),  width: "30%" })
    ]

}
);

totalTable.bindItems("/total", new sap.m.ColumnListItem({
    cells : [
        new sap.m.Label({text : "{name}", design: sap.m.LabelDesign.Bold}),
        new sap.m.Label({text : "{amount}", design: sap.m.LabelDesign.Bold})
    ]

}));

var report_cat = new sap.m.Page("report_cat", {
          title: "Отчет по категориям",
          showNavButton: true,
          navButtonPress: function(){
              sapUiApp.back();
              // empty form
              var oModel = sap.ui.getCore().getModel();
              initExpenseCard(oModel);
              var emptyTable = '{"getExpensesGroupByCategory": [], "total": []}';
              var emptyTableModel = new sap.ui.model.json.JSONModel();
              emptyTableModel.setJSON(emptyTable);
              rc_table.setModel(emptyTableModel);
              totalTable.setModel(emptyTableModel);
          },
          content: reportCategory()
      });

function reportCategory() {
    return report("getExpensesGroupByCategory", rc_table, totalTable);
}