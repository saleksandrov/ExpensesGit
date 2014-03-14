function onCreateExpense() {

    jQuery.sap.require("sap.m.MessageBox");

    var date = sap.ui.getCore().getModel().getProperty("/date");
    var month = sap.ui.getCore().getModel().getProperty("/selectedMonth");
    var category = sap.ui.getCore().getModel().getProperty("/selectedCategory");
    var amount = sap.ui.getCore().getModel().getProperty("/amount");
    var desc = sap.ui.getCore().getModel().getProperty("/desc");
    var year = sap.ui.getCore().getModel().getProperty("/year");

    month = parseInt(month);
    date = parseInt(date);

    var checkAmount = parseFloat(amount);
    // validation
    if (checkAmount == null || isNaN(checkAmount) || isNaN(+checkAmount)) {
        sap.m.MessageBox.alert("Неверно введено число!");
        return false;
    } else if (isNaN(date) || date < 0 || date > 31) {
        sap.m.MessageBox.alert("Неверно введена дата!");
        return false;
    } else if (isNaN(year) || year < 2014 || year > 2030) {
        sap.m.MessageBox.alert("Неверно введен год!");
        return false;
    }

//    var amountFloat;
//    if (amount != null) {
//        amountFloat = parseFloat(amount.replace(",", "."));
//    }

    //do all work
    createExpense(
        {"date": date, "selectedMonth": month, "selectedCategory": category, "amount": amount, "desc": desc, "year": year},
        function() {sap.m.MessageBox.alert("Запись создана. Сумма=" + parseFloat(amount))});

    //empty form
    var oModel = sap.ui.getCore().getModel();
    initExpenseCard(oModel);
    return true;
}

function initExpenseCard(oModel) {
    var today = new Date();
    oModel.setData({
        "amount": "",
        "desc": "",
        "date": today.getDate(),
        "selectedMonth": today.getMonth() + 1,
        "selectedCategory": "1",
        "year": today.getYear() + 1900
    });
}


function expenseCardFrom() {
    // init data
    var oModel = new sap.ui.model.json.JSONModel();
    sap.ui.getCore().setModel(oModel);

    initExpenseCard(oModel);

    var dayLabel = new sap.m.Label({ text:"Дата", width: "80px"});
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
        //, selectedKey: "1"
    });
    month.bindProperty("selectedKey","/selectedMonth");


    var date = new sap.m.Input( { value: "{/date}", type: "Number", width: "45px", tooltip: "Date" });
    var year = new sap.m.Input( { value: "{/year}", type: "Number", width: "60px", tooltip: "Year" });

    var lineDay = new sap.m.HBox( { items:[ dayLabel, date, month, year] });

    /*
    var monthLabel = new sap.m.Label({ text:"Месяц", width: "80px", labelFor:month });
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
            //, selectedKey: "1"
           });
    month.bindProperty("selectedKey","/selectedMonth");
    var line0 = new sap.m.HBox( { items:[ monthLabel, month] });


    var dateLabel = new sap.m.Label({ text:"Дата", width: "80px", labelFor:amount });
    var date = new sap.m.Input( { value: "{/date}", type: "Number", width: "80px", tooltip: "Date" });
    var line00 = new sap.m.HBox( { items:[ dateLabel, date] });

    var yearLabel = new sap.m.Label({ text:"Год", width: "80px", labelFor:year });
    var year = new sap.m.Input( { value: "{/year}", type: "Number", width: "80px", tooltip: "Year" });
    var lineYear = new sap.m.HBox( { items:[ yearLabel, year] });
*/

    var amountLabel = new sap.m.Label({ text:"Сумма", width: "80px", labelFor:amount });
    var amount = new sap.m.Input( { value: "{/amount}", type: "Number", width: "160px", tooltip: "Amount" });
    var line1 = new sap.m.HBox( { items:[ amountLabel, amount] });

    var descLabel = new sap.m.Label({ text:"Описание", width: "80px", labelFor:desc });
    var desc = new sap.m.Input( { value: "{/desc}", width: "160px", tooltip: "Desc" });
    var line2 = new sap.m.HBox( { items:[ descLabel, desc] });

    var catLabel = new sap.m.Label({ text:"Категория", width: "80px", labelFor:cat });
    var cat = new sap.m.Select({
        title: "Категория",
        items: [
         new sap.ui.core.Item({key: "1", text: "Общая категория"}),
         new sap.ui.core.Item({key: "2", text: "Продукты"}),
         new sap.ui.core.Item({key: "3", text: "Одежда"}),
         new sap.ui.core.Item({key: "4", text: "Развлечения"}),
         new sap.ui.core.Item({key: "5", text: "Путешествия"}),
         new sap.ui.core.Item({key: "6", text: "Медицина"}),
         new sap.ui.core.Item({key: "7", text: "Дети"}),
         new sap.ui.core.Item({key: "8", text: "Образование"}),
         new sap.ui.core.Item({key: "9", text: "Транспорт"}),
         new sap.ui.core.Item({key: "10", text: "Квартира"}),
         new sap.ui.core.Item({key: "11", text: "Кафе/рестораны"}),
         new sap.ui.core.Item({key: "12", text: "Спорт"}),
         new sap.ui.core.Item({key: "13", text: "Банк"})
        ]
       });
    cat.bindProperty("selectedKey","/selectedCategory");
    var line3 = new sap.m.HBox( { items:[ catLabel, cat] });

    var saveButtom = new sap.m.Button({
                                    text: "Сохранить",
                                    press: function() {
                                                      // store it to db
                                                      if (onCreateExpense()) {
                                                        sapUiApp.back();
                                                      }


                                                  }
                                    });
    var saveButtom2 = saveButtom.clone();
     var saveCancel = new sap.m.Button({
                                         text: "Отмена",
                                         press: function() {
                                                           sapUiApp.back();
                                                           var oModel = sap.ui.getCore().getModel();
                                                           initExpenseCard(oModel);
                                                       }
                                         });
     var saveCancel2 = saveCancel.clone();

    var buttonLine = new sap.m.HBox( { items:[ saveButtom, saveCancel] });
    var buttonLine2 = new sap.m.HBox( { items:[ saveButtom2, saveCancel2] });

    return new sap.m.VBox( {
                             //   items:[ buttonLine2, line1,line3, line2, line0, line00, lineYear, buttonLine ]
                                items:[ buttonLine2, line1,line3, line2, lineDay, buttonLine ]
                             });
}


var expense_card = new sap.m.Page("expense_card", {
          title: "Ввод затраты",
          showNavButton: true,
          navButtonPress: function(){
              sapUiApp.back();
          },
          //icon: "http://www.sap.com/global/ui/images/global/sap-logo.png",
          content: expenseCardFrom()
      });

