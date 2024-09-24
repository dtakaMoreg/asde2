javascript:(async function() {
    // クリップボードの内容を取得
    const clipboardText = await navigator.clipboard.readText();

     // すべての一致する要素を取得
    let elements = document.querySelectorAll('.text-display--1Iony.type-body--1W5uC.size-custom-medium--3iEUT.align-left--1hi1x.color-black--Sl9mx.style-bold--edCDL.layout-inline--1ajCj');
  
    // 一致する要素を探し、その親の親をクリック
    for (const element of elements) {
      if (element.innerText === clipboardText) {
        const parentDiv = element.closest('div').parentElement;
        if (parentDiv) {
          parentDiv.click();
          break; // ここでループを終了
        }
      }
    }  
  })();

  
