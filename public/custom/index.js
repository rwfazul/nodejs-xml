$(function () {

    $('select').material_select();

    var loaderResultDTD = $("#loader-result-dtd");
    var loaderResultXSD = $("#loader-result-xsd");
    var loaderResultXSL = $("#loader-result-xsl");

    loaderResultDTD.css("display", "none");
    loaderResultXSD.css("display", "none");
    loaderResultXSL.css("display", "none");

    $("#table-products").css("display", "none");


    function printResult(typeValidation, xmlFileName, nameNota, success, container, err) {
        var p = $("<p>");
        var icon = $("<i>").addClass("material-icons");
        var text = ` O XML da <a href="${xmlFileName}">${nameNota}</a> `;
        var textResult;
        if (success) {
            icon.text("check_circle");
            p.addClass("green-text");
            textResult = `é válido pelo ${typeValidation} das notas fiscais`;
        }
        else {
            icon.text("error");
            p.addClass("red-text");
            textResult = `não é válido pelo ${typeValidation} das notas fiscais`;
        }
        if (err)
            textResult = `${textResult} <br/><br/> Erro:<br/> ${err}`;
        p.append(icon);
        p.append(text);
        p.append(textResult);
        container.append(p);
    }

    $('#get-dtd-validate').on('click', function () {
        loaderResultDTD.css("display", "block");
        $("#nota-dtd option:selected").each(function () {
            var nameNota = ($(this).text());
            var nota = ($(this).val());
            var result = $("#result-dtd");
            result.empty();
            $.ajax({
                url: `/validateDTD/${nota}?${new Date()}`,
                success: function (data) {
                    loaderResultDTD.css("display", "none");
                    printResult("DTD", `/files/${nota}.xml`, nameNota, true, result);
                },
                error: function (data) {
                    loaderResultDTD.css("display", "none");
                    printResult("DTD", `/files/${nota}.xml`, nameNota, false, result, JSON.stringify(JSON.parse(data.responseText).err));
                }
            });
        });
    });

    $('#get-xsd-validate').on('click', function () {
        loaderResultXSD.css("display", "block");
        $("#nota-xsd option:selected").each(function () {
            var nameNota = ($(this).text());
            var nota = ($(this).val());
            var result = $("#result-xsd");
            result.empty();
            var p = $("<p>");
            var icon = $("<i>").addClass("material-icons");
            $.ajax({
                url: `/validateXSD/${nota}?${new Date()}`,
                success: function (data) {
                    loaderResultXSD.css("display", "none");
                    printResult("XSD", `/files/${nota}.xml`, nameNota, true, result);
                },
                error: function (data) {
                    loaderResultXSD.css("display", "none");
                    printResult("XSD", `/files/${nota}.xml`, nameNota, false, result, JSON.stringify(JSON.parse(data.responseText).err));
                }
            });
        });
    });

    $('#get-products').on('click', function () {
        var tbody = $("#products");
        tbody.empty();
        $.ajax({
            url: `/getProcessXpath`,
            success: function (products) {
                $("#table-products").css("display", "block");
                products.forEach(product => {
                    var tr = $(
                        `<tr>
                        <td>${product.cProd}</td>
                        <td>${product.xProd}</td>
                        <td>${product.qCom}</td>
                        <td>${product.vUnTrib}</td>
                        <tr>`
                    );
                    tbody.append(tr);
                });
            }
        });
    });
});