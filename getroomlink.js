javascript:(function(){
  var urlParams = new URLSearchParams(window.location.search);
  var index = urlParams.get('index'); // "param"の値を取得
  alert('指定されたパラメータは: ' + index);
})();
