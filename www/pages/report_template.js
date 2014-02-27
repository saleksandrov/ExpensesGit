function report(methodName, rt) {
    var oModel = sap.ui.getCore().getModel();
    initExpenseCard(oModel);

    var year = new sap.m.Input({ value: "{/year}", type: "Number", width: "80px", tooltip: "Year" });
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
    month.bindProperty("selectedKey", "/selectedMonth");

    var reportButtom = new sap.m.Button({
        text: "Показать отчет",
        press: function () {
            var month = sap.ui.getCore().getModel().getProperty("/selectedMonth");
            var year = sap.ui.getCore().getModel().getProperty("/year");
            var oModel;
            if (methodName === "getExpenses") {
                oModel = getExpenses(year, month);
            } else {
                oModel = getExpensesGroupByCategory(year, month);
            }
            rt.setModel(oModel);
        }
    });

    var toolbar = new sap.m.HBox({items: [year, month, reportButtom] });
    var pageLayout = new sap.m.VBox({items: [ toolbar, rt ]});
    return pageLayout;

}