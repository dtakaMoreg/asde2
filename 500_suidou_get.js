javascript:(function(){
    var table = document.getElementById("table_crad");
    if (table) {
        var rows = table.getElementsByTagName("tr");
        if (rows.length > 1) {
            var headers = rows[0].getElementsByTagName("th"); // ヘッダーを取得
            var secondRowTds = rows[1].getElementsByTagName("td"); // 2つ目の<tr>内の<td>を取得
            
            var labels = [
                "使用期間", "使用水量", "水道料金", "下水道使用料", "合計", "お支払日"
            ];
            
            var values = [
                secondRowTds[1].textContent.trim(),
                secondRowTds[2].textContent.trim(),
                secondRowTds[3].textContent.trim(),
                secondRowTds[4].textContent.trim(),
                secondRowTds[5].textContent.trim(),
                secondRowTds[6].textContent.trim()
            ];

            var result = labels.map((label, i) => label + ":" + values[i]).join("\n");
            alert(result);
        } else {
            alert("2つ目の<tr>が見つかりませんでした。");
        }
    } else {
        alert("指定されたIDの<table>が見つかりませんでした。");
    }
})();
