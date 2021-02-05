function exp() {
    tablesToExcel(['tabDiv1', 'tabDiv2', 'tabDiv3'], ['yy', 'bb', 'cc'], "abc.xls", "Excel");
}
//导出excel包含多个sheet
//tables:tableId的数组;wsbames:sheet的名字数组;wbname:工作簿名字;appname:Excel
function tablesToExcel(tables, wsnames, wbname, appname) {

    var uri = 'data:application/vnd.ms-excel;base64,',
        tmplWorkbookXML = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">' +
            '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>Axel Richter</Author><Created>{created}</Created></DocumentProperties>' +
            '<Styles>' +
            '<Style ss:ID="Currency"><NumberFormat ss:Format="Currency"></NumberFormat></Style>' +
            '<Style ss:ID="Date"><NumberFormat ss:Format="Medium Date"></NumberFormat></Style>' +
            '</Styles>' +
            '{worksheets}</Workbook>',
        tmplWorksheetXML = '<Worksheet ss:Name="{nameWS}"><Table>{rows}</Table></Worksheet>',
        tmplCellXML = '<Cell{attributeStyleID}{attributeFormula}><Data ss:Type="{nameType}">{data}</Data></Cell>',
        base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        },
        format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            })
        }

    var ctx = "";
    var workbookXML = "";
    var worksheetsXML = "";
    var rowsXML = "";

    for (var i = 0; i < tables.length; i++) {
        if (!tables[i].nodeType)
            tables[i] = document.getElementById(tables[i]);

        //           控制要导出的行数
        for (var j = 0; j < tables[i].rows.length; j++) {
            rowsXML += '<Row>';

            for (var k = 0; k < tables[i].rows[j].cells.length; k++) {
                var dataType = tables[i].rows[j].cells[k].getAttribute("data-type");
                var dataStyle = tables[i].rows[j].cells[k].getAttribute("data-style");
                var dataValue = tables[i].rows[j].cells[k].getAttribute("data-value");
                dataValue = (dataValue) ? dataValue : tables[i].rows[j].cells[k].innerHTML;
                var dataFormula = tables[i].rows[j].cells[k].getAttribute("data-formula");
                dataFormula = (dataFormula) ? dataFormula : (appname == 'Calc' && dataType == 'DateTime') ? dataValue : null;
                ctx = {
                    attributeStyleID: (dataStyle == 'Currency' || dataStyle == 'Date') ? ' ss:StyleID="' + dataStyle + '"' : '',
                    nameType: (dataType == 'Number' || dataType == 'DateTime' || dataType == 'Boolean' || dataType == 'Error') ? dataType : 'String',
                    data: (dataFormula) ? '' : dataValue,
                    attributeFormula: (dataFormula) ? ' ss:Formula="' + dataFormula + '"' : ''
                };
                rowsXML += format(tmplCellXML, ctx);
            }
            rowsXML += '</Row>'
        }
        ctx = {
            rows: rowsXML,
            nameWS: wsnames[i] || 'Sheet' + i
        };
        worksheetsXML += format(tmplWorksheetXML, ctx);
        rowsXML = "";
    }

    ctx = {
        created: (new Date()).getTime(),
        worksheets: worksheetsXML
    };
    workbookXML = format(tmplWorkbookXML, ctx);

    //       查看后台的打印输出
    //console.log(workbookXML);

    var link = document.createElement("A");
    link.href = uri + base64(workbookXML);
    link.download = wbname || 'Workbook.xls';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}



//  ----------------------


//从table中导出excel表
function exec() {
    exportExcel('table', '名称', '导出表的名称.xls');
}
//判断浏览器
var idTmr;
function getExplorer() {
    var explorer = window.navigator.userAgent;

    //ie 
    if (explorer.indexOf("MSIE") >= 0 || (explorer.indexOf("Windows NT 6.1;") >= 0 && explorer.indexOf("Trident/7.0;") >= 0)) {
        return 'ie';
    }
    //firefox 
    else if (explorer.indexOf("Firefox") >= 0) {
        return 'Firefox';
    }
    //Chrome 
    else if (explorer.indexOf("Chrome") >= 0) {
        return 'Chrome';
    }
    //Opera 
    else if (explorer.indexOf("Opera") >= 0) {
        return 'Opera';
    }
    //Safari 
    else if (explorer.indexOf("Safari") >= 0) {
        return 'Safari';
    }
}
function exportExcel(tableid, name, filename) {
    //    alert(getExplorer());
    if (getExplorer() == 'ie') {
        var curTbl = document.getElementById(tableid);
        curTbl.style.border = "1px";
        curTbl.style.backgroundClip = "padding-box";
        curTbl.style.position = "relative";

        var oXL;
        try {
            oXL = new ActiveXObject("Excel.Application"); //创建AX对象excel  
        } catch (e) {
            alert("无法启动Excel!\n\n如果您确信您的电脑中已经安装了Excel，" + "那么请调整IE的安全级别。\n\n具体操作：\n\n" + "工具 → Internet选项 → 安全 → 自定义级别 → 对没有标记为安全的ActiveX进行初始化和脚本运行 → 启用");
            return false;
        }
        var oWB = oXL.Workbooks.Add();
        var oSheet = oWB.ActiveSheet;
        var Lenr = curTbl.rows.length;
        for (i = 0; i < Lenr; i++) {
            var Lenc = curTbl.rows(i).cells.length;
            for (j = 0; j < Lenc; j++) {
                oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;

            }

        }
        oXL.Visible = true;

    } else {
        tableToExcel(tableid, name, filename)
    }
}
function Cleanup() {
    window.clearInterval(idTmr);
    CollectGarbage();
}
var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html><meta charset="UTF-8">',
        base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        },
        // 下面这段函数作用是：将template中的变量替换为页面内容ctx获取到的值
        format = function (s, c) {
            return s.replace(/{(\w+)}/g,
                function (m, p) {
                    return c[p];
                }
            )
        };
    return function (table, name) {
        if (!table.nodeType) {
            table = document.getElementById(table)
        }
        // 获取表单的名字和表单查询的内容
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
        // format()函数：通过格式操作使任意类型的数据转换成一个字符串
        // base64()：进行编码
        window.location.href = uri + base64(format(template, ctx))
    }
})()


//$$
function $$(id) {
    return document.getElementById(id);
}