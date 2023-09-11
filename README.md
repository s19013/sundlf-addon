# sundlf-bookmark-addon

# 概要
<a href="https://sundlf.com/?utm_source=github" target="_blank">sundlf</a>を開かずともブックマークが保存できるアドオンです  


# リンク
[アドオンダウンロードページへ](https://chrome.google.com/webstore/detail/sundlf-bookmark-addon/mfcobcdpjbgnpbkhbbfaabkkphpceoka)

# 使った技術
* vue.js
* javascript
* html
* css
* googleが提供する拡張機能用api

# 制作背景
自分が作ったsundlfというサービスをより便利にするために作った  
元々sundlfを作ったときから作ると決めていた
前々から何かchromeの拡張機能を作りたいと思っていた

# 実装した大まかな機能
* ログイン
* ログアウト
* 今見ているサイトのurlとタイトルを取得
* ブックマーク登録
* ブックマーク更新
* 今見ているサイトをすでに登録していないか確認
* タグの着脱
* 新規タグ生成
* タグ検索
* ショートカットキー
* トークン発行
* 認証

# 苦労したところ
* corsという部分で躓いた｡  
  直感でバックに問題があると予想  
  一行一行コメントアウトするなりして問題となった行を修正した  
* 422エラーという初めて聞いたエラーが出て困惑した
* apiトークン認証とspa認証を共存させるのが難しかった  
ここを解決するのにだいたい3日かかった  
api通信トークン認証でセッションなど発行してしまっていた  
spa認証で使う`EnsureFrontendRequestsAreStateful`をapiトークン認証にもついていたのが原因  
あとは`Authorization`にトークンをはるときに`Bearer `と書く必要があることに気付くのが遅かった  
* 拡張機能用に色々書き方とかあるので､その対応
* 拡張機能用のapiが全部非同期なので非同期の勉強し直し｡
* chrome.storage周りで苦しんだ
* 必要な情報がなかなか見つからない｡
* 公式リファレンスを読んでもわからないことはある
* 最初は`composition api`で作ろうと思ったが､早く完成させたいため､かきなれた`option api`で書いた

# 参考にしたサイトなど

# 未来の編集する私へ
なにか機能を足すのなら一度`beforeCromeApi`で編集してテストしてください
その後`cromeApi`にチェリーピッカーでコピーして拡張機能ようにコピーしてください
