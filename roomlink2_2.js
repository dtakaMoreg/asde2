javascript:(function() {
    // URL引数のtarget_countを取得
    //const params = new URLSearchParams(window.location.search);
    //const target_count = params.get('target_count') || 0; // target_countのデフォルトは0
    //alert(target_count)
  // 定数の設定
    const target_count=2;
    const targetUrl = "https://room.rakuten.co.jp/room_f45d756af1/items";
    const localStorageKeyCount = "local_storage_click_count_" + target_count;
    const localStorageKeyUrls = "local_storage_save_urls_" + target_count;
  
    // 現在のURLが対象URLであるか確認
    if (window.location.href === targetUrl) {
      // local_storage_click_countの取得、存在しない場合は0に設定
      let clickCount = parseInt(localStorage.getItem(localStorageKeyCount)) || 0;
     
      // 前回の処理が終わっているかどうかを示すフラグをwindowオブジェクトに保存
      if (window.isProcessing) {
        console.log("前回の処理がまだ終わっていません");
        return;
    }
      // clickCount個目のelements_aが存在するか確認
      function clickElementIfExists() {
        
        // 処理開始時にフラグをtrueに設定
        window.isProcessing = true;
        console.log("処理を開始しました");

        // elements_aとelements_bを取得
        let divs = document.querySelectorAll('div[class*="masonry-grid-column"]');
        let elements = [];

        // divsの長さを最大10に制限
        let divCount = Math.min(divs.length, 10);

        // 各divのリンクをelements配列に格納
        for (let i = 0; i < divCount; i++) {
          let links = divs[i].querySelectorAll('a[class*="link-image"]');
          elements[i] = [];
          links.forEach(link => elements[i].push(link));
        }

        if (clickCount < elements[target_count].length) {
          // elements[target_count][clickCount]が存在する場合はクリック
          elements[target_count][clickCount].click();

          // local_storage_click_countをインクリメントして保存
          clickCount++;
          localStorage.setItem(localStorageKeyCount, clickCount);
          
          // 処理完了時にフラグをfalseに戻す
          window.isProcessing = false;
          console.log("処理が完了しました");

        } else {
          // elements_aが足りない場合はスクロールして再チェック
          window.scrollBy(0, 3000); // スクロールダウン
          setTimeout(clickElementIfExists, 700); // 再試行
        }
      }
  
      // 初回のチェックを開始
      clickElementIfExists();
  
    } else if (window.location.href.includes("https://room.rakuten.co.jp/room_f45d756af1/") &&
               !window.location.href.includes("https://room.rakuten.co.jp/room_f45d756af1/items")) {
  
      // 対象外のURLの場合、local_storage_save_urlsに保存し、前のページに戻る
      let savedUrls = JSON.parse(localStorage.getItem(localStorageKeyUrls)) || [];
      savedUrls.push(window.location.href);
      localStorage.setItem(localStorageKeyUrls, JSON.stringify(savedUrls));
  
      // 前のページに戻る
      window.location.href = "https://room.rakuten.co.jp/room_f45d756af1/items";

    }
    //ページ開き中はなにもしない

  })();
  
