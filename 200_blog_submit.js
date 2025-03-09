//楽天ブログに投稿する
//クリップボードの内容を取得
//フォームに入力
//送信
//json形式
//{
//    "title": "おしゃれな部屋とコーデのヒント",
//    "text": "ここにブログの内容を書きます。"
//}

javascript:(async function() {
    try {
      const text = await navigator.clipboard.readText();
      const data = JSON.parse(text);
  
      if (data.title && data.text) {
        // タイトルをセット
        const titleInput = document.getElementById("diary_write_d_title");
        if (titleInput) titleInput.value = data.title;
  
        // 本文をセット（既存テキストの前に挿入）
        const textArea = document.getElementById("diary_write_d_text");
        if (textArea) textArea.value = data.text + "\n\n" + textArea.value;
  
        // 「公開する」ボタンをクリック
        const submitButton = document.getElementById("diary_write_public_submit");
        if (submitButton) {
          setTimeout(() => submitButton.click(), 500); // 0.5秒遅延してクリック
        }
  
        //alert("ブログデータを入力し、公開しました！");
      } else {
        alert("クリップボードのデータが正しいJSON形式ではありません。");
      }
    } catch (e) {
      alert("クリップボードからのデータ取得に失敗しました。");
      console.error(e);
    }
  })();
  