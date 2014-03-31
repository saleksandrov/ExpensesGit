var db;

function getDb() {
    if (db == null) {
        db = window.openDatabase("expensesdb", "1.0", "Expenses DB", 2000000);
    }
    return db;
}

function init() {
    document.addEventListener("deviceready", initDb, false);
}

function initDb() {
    getDb().transaction(populateDB, errorCB, successCB);
    //getAllContent();
}

function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS EXPENSES (id integer primary key autoincrement, create_date text, month integer, date integer, year integer, amount numeric, category text, description text)');
}

function errorCB(err) {
    jQuery.sap.require("sap.m.MessageBox");
    sap.m.MessageBox.alert("DbError: " + err);
}

function errorCreateExpense(err) {
    jQuery.sap.require("sap.m.MessageBox");
    sap.m.MessageBox.alert("Ошибка создания записи: " + err);
}

function errorDelExpense(err) {
    jQuery.sap.require("sap.m.MessageBox");
    sap.m.MessageBox.alert("Ошибка удаления записи: " + err);
}

function errorReadExpense(err) {
    jQuery.sap.require("sap.m.MessageBox");
    sap.m.MessageBox.alert("Ошибка чтения БД: " + err);
}

function successCB() {
    // do nothing
}

function createExpense(expenseObj, cb) {
    var desc = expenseObj.desc;
    if (desc == null || desc.length == 0) {
        //desc = parseInt(expenseObj.date) +"."+parseInt(expenseObj.selectedMonth) + "." + parseInt(expenseObj.year);
        desc = "Нет описания";
    }
    getDb().transaction(
        function (tx) {
            tx.executeSql("insert into EXPENSES (create_date, month, date, year, amount, category, description) values(?,?,?,?,?,?,?)",
                [new Date(), parseInt(expenseObj.selectedMonth), parseInt(expenseObj.date), parseInt(expenseObj.year), parseFloat(expenseObj.amount), expenseObj.selectedCategory, desc]);
        }, errorCreateExpense, cb);
}

function deleteExpense(id, deleteCb) {
    getDb().transaction(
        function (tx) {
            tx.executeSql("DELETE FROM EXPENSES WHERE id=?", [id]);
        }, errorDelExpense, deleteCb);
}


function getExpensesGroupByCategory(year, month) {
    var oModel = new sap.ui.model.json.JSONModel();
    getDb().transaction(function (tx) {
        tx.executeSql("select id, category, SUM(amount) as amount from EXPENSES WHERE year=? AND month=? GROUP BY category", [year, month],
            function (tx, results) {
                if (results.rows.length > 0) {
                    var reportData = {getExpensesGroupByCategory: [], total: [{name: "Всего", amount: 0}]};
                    for (var i = 0; i < results.rows.length; i++) {
                        var item = results.rows.item(i);
                        var cat = item.category;
                        cat = getCategoryById(cat);

                        reportData.getExpensesGroupByCategory[i] = {name: cat, amount: item.amount};
                    }
                    var totalAmount = 0;
                    for (var j = 0; j < reportData.getExpensesGroupByCategory.length; j++) {
                        totalAmount += reportData.getExpensesGroupByCategory[j].amount;
                    }
                    reportData.total[0].amount = totalAmount;
                    oModel.setData(reportData);
                }
            }, errorReadExpense);
    }, errorReadExpense);

    return oModel;
}

function getExpenses(year, month) {
    var oModel = new sap.ui.model.json.JSONModel();

    // For Test
    //oModel.setData(getTestModel());

    getDb().transaction(function (tx) {
        tx.executeSql("SELECT id, description, amount, category, date, month from EXPENSES WHERE year=? AND month=?", [parseInt(year), parseInt(month)],
            function (tx, results) {
                if (results.rows.length > 0) {
                    var reportData = {getExpenses: [], total: [{name: "Всего", amount: 0}]};
                    for (var i = 0; i < results.rows.length; i++) {
                        var item = results.rows.item(i);
                        var desc = item.description;
                        reportData.getExpenses[i] = {name: desc, amount: item.amount, id : item.id, category: getCategoryById(item.category), date: item.date, month: item.month};
                    }
                    var totalAmount = 0;
                    for (var j = 0; j < reportData.getExpenses.length; j++) {
                        totalAmount += reportData.getExpenses[j].amount;
                    }
                    reportData.total[0].amount = totalAmount;
                    oModel.setData(reportData);
                }
            }, errorReadExpense);
    }, errorReadExpense);

    return oModel;
}

function getTestModel() {
    var reportData = {getExpenses: [], total: [{name: "Всего", amount: 0}]};
    reportData.getExpenses = [
        {name: "T", amount: 200, id : 1, category: "category", date: "12.222", month: "10"},
        {name: "Test", amount: 300, id : 2, category: "category", date: "sdsd", month: "10"}
    ];

    var totalAmount = 0;
    for (var i = 0; i < reportData.getExpenses.length; i++) {
        totalAmount += reportData.getExpenses[i].amount;
    }
    reportData.total[0].amount = totalAmount;
    return reportData;
}

// debug method
function getAllContent() {
    console.log("~~~~~~~~~~~~~~~~~~~~~ starting getAllContent");
    getExpenses(2015,4);
    getExpenses(2014,1);
    getExpenses(2014,2);
}

function getCategoryById(cat) {
    if (cat == 1) {
        cat = "Общая категория";
    } else if (cat == 2) {
        cat = "Продукты";
    } else if (cat == 3) {
        cat = "Одежда";
    } else if (cat == 4) {
        cat = "Развлечения";
    } else if (cat == 5) {
        cat = "Путешествия";
    } else if (cat == 6) {
        cat = "Медицина";
    } else if (cat == 7) {
        cat = "Дети";
    } else if (cat == 8) {
        cat = "Образование";
    } else if (cat == 9) {
        cat = "Транспорт";
    } else if (cat == 10) {
        cat = "Квартира";
    } else if (cat == 11) {
        cat = "Кафе/рестораны";
    } else if (cat == 12) {
        cat = "Спорт";
    } else if (cat == 13) {
        cat = "Банк";
    }

    return cat;

}

