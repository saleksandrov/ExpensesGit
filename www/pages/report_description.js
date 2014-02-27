var rd_table = new sap.m.Table("rd1",{
    mode: "Delete",
    columns: [
        new sap.m.Column({header: new sap.m.Label({text: "Описание", design: sap.m.LabelDesign.Bold}) }),
        new sap.m.Column({header: new sap.m.Label({text: "Сумма", design: sap.m.LabelDesign.Bold}) })
    ]

});

rd_table.bindItems("/getExpenses", new sap.m.ColumnListItem({
    cells : [
        new sap.m.Text({text : "{name}"}),
        new sap.m.Text({text : "{amount}"}),
        new sap.m.Text({text : "{id}"})

    ]

}));


rd_table.attachDelete(
    function(oEvent) {
        jQuery.sap.require("sap.m.MessageBox");
        var name = oEvent.getParameter('listItem').getCells()[0].getText();
        var amount = oEvent.getParameter('listItem').getCells()[1].getText();
        var id = oEvent.getParameter('listItem').getCells()[2].getText();

        sap.m.MessageBox.confirm("Подтвердите удаление затраты. Сумма=" + amount + ".",
            function(oAction) {
                if (oAction == sap.m.MessageBox.Action.OK) {
                    deleteExpense(id, function() {
                        sap.m.MessageBox.alert("Затрата удалена!");
                    });
                    var month = sap.ui.getCore().getModel().getProperty("/selectedMonth");
                    var year = sap.ui.getCore().getModel().getProperty("/year");
                    tableModel = getExpenses(year, month);
                    rd_table.setModel(tableModel);
                }
        });
    }
);


var report_description = new sap.m.Page("report_description", {
    title: "Подробный отчет",
    showNavButton: true,
    navButtonPress: function() {
        sapUiApp.back();

        // empty form
        var oModel = sap.ui.getCore().getModel();
        initExpenseCard(oModel);
        var emptyTable = '{"getExpenses": []}';
        var emptyTableModel = new sap.ui.model.json.JSONModel();
        emptyTableModel.setJSON(emptyTable);
        rd_table.setModel(emptyTableModel);
    },
    content: reportDescription()
});

function reportDescription() {
    return report("getExpenses", rd_table);
}
