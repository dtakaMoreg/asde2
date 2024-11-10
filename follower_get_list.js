function doPost(e) {
    // POSTされたデータを取得（複数データの場合、配列で渡されることを想定）
    const jsonDataArray = JSON.parse(e.postData.contents);
  
    // 対象のスプレッドシートとシートを取得
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('follower');
  
    // A列とC列のすべてのデータを一度に取得
    const columnAValues = sheet.getRange('A:A').getValues().flat();
    const columnCValues = sheet.getRange('C:C').getValues().flat();
  
    // A列とC列に追加するデータを保存する配列
    const dataToAddToA = [];
    const dataToAddToC = [];
  
    // 各データを処理する
    jsonDataArray.forEach(function(jsonData) {
      const roomUrl = jsonData.roomUrl;
      const rank = jsonData.rank;
      const followInfo = jsonData.followInfo;
      const followStatus = jsonData.followStatus;  // followStatusを取得
  
      // "rank"が"s"の場合はA列に追加
      if (rank === 's') {
        // A列に重複するroomUrlがないか確認
        if (!columnAValues.includes(roomUrl)) {
          dataToAddToA.push(roomUrl); // A列に追加するデータを保存
        }
      }
      // "rank"が"a", "b", "c"の場合、かつfollowStatusが「フォローする」の場合はC列に追加
      else if (['a', 'b', 'c'].includes(rank) && followStatus === 'フォローする' && followInfo > 200) {
        // C列に重複するroomUrlがないか確認
        if (!columnCValues.includes(roomUrl)) {
          dataToAddToC.push(roomUrl); // C列に追加するデータを保存
        }
      }
    });
  
    // A列にデータを追加
    if (dataToAddToA.length > 0) {
      let lastRowA = columnAValues.filter(String).length; // A列の最後の行を取得
      dataToAddToA.forEach((roomUrl, index) => {
        sheet.getRange(lastRowA + 1 + index, 1).setValue(roomUrl); // A列にデータを一括追加
      });
    }
  
    // C列にデータを追加
    if (dataToAddToC.length > 0) {
      let lastRowC = columnCValues.filter(String).length; // C列の最後の行を取得
      dataToAddToC.forEach((roomUrl, index) => {
        sheet.getRange(lastRowC + 1 + index, 3).setValue(roomUrl); // C列にデータを一括追加
      });
    }
  
    return ContentService.createTextOutput('Success');
  }
  