var mainPage_fb = new sap.m.FlexBox({
                               items: [
                                 new sap.m.Button({
                                    text: "Ввести затрату",
                                    press: function() {
                                                      sapUiApp.to("expense_card");
                                                  }
                                    }),
                                 new sap.m.Button({
                                    text: "Отчет по категориям",
                                    press: function() {
                                                      sapUiApp.to("report_cat");
                                                        }
                                    }),
                                 new sap.m.Button({
                                     text: "Подробный отчет",
                                     press: function() {
                                         sapUiApp.to("report_description");
                                     }
                                 })
                               ],
                               direction: "Column",
                               alignItems: "Center",
                               justifyContent: "Center"
                             });


var mainPage = new sap.m.Page("MainPage",
      {
          title: "Затраты",
          content: mainPage_fb
      });