# ライフサイクルみたいなの
1. 拡張機能のボタンを押す
1. サーバーと通信してすでに保存してないか確認する

画面遷移はしないからサクッと削除できるようにするか?
拡張機能閉じない限りデータはフロントに残ったままだから再登録して貰えばよいかも

結局親にデータを送る関数も必要になった


<!-- * 各コンポーネントを親に送る関数
* emit系の関数を用意しておく -->
<!-- * 親で登録､更新のaxiosの用意 -->
<!-- * Bookmarkのpropsテスト -->
<!-- * 全体のローディング管理が必要? -> vuexで管理するか -->
    <!-- * storeに作る -->
    <!-- * bookmarkComp  -->
    <!-- * tagComp -->
        <!-- * taglist -->
        <!-- * search -->

ログイン系
<!-- * まずログイン画面を作る -->
    <!-- * email,password
    * axiosで通信 -->
    <!-- * catch,thenなど -->
<!-- * ダミーのトークンで色々ためして見る -->
    <!-- * まずはダミーのトークンを発行 -->
    <!-- * ローカルストレージに保存 -->
<!-- * ログインしてるかどうかを判断する変数 -->
<!-- * appの方のmountedで確認 -->
    <!-- * ログインしてない -> ログイン画面表示 -->
    <!-- * ログインしてる -> ブックマークを表示 -->
* watchでその変数管理

* ログインして得たトークンはlocalstrageに保存
    * 今回は拡張機能なので最終的にはそれ用の書き方が必要
* ブックマーク系のaxios通信にトークンを追加する
* トークンを持った状態でブックマークのテストを始める

<!-- * まずはユーザーのタグを全部取得するところから -->
<!-- * タグを登録できるか -->
<!-- * ブックマークを登録できるか -->
<!-- * 一度登録したら,id取ってこないと -> 更新ができない､ -->
<!-- * その前に更新系が動くか確認 -->
<!-- * 適当なブクマを取ってきて実験 -->
* 削除系
    <!-- * そもそも新規登録なら押せないようにする -->
    <!-- * apiの削除処理走らせる -->
    <!-- * フロント部分で知らせたり､リセットしたりする -->

* 自動でタイトルとurlを取得する
    * 今はjsで取るけど､後々拡張機能用の書き方に変更

* 仕上げに拡張機能用の書き方を色々やって完成のハズ｡
    * ローカルストレージ周りと
    * url取得あたり


よくよく考えればこれ本来url部分はjsでとってきて変更できないようになって｡
titleはjsでとるけど変更できる用にしないと

やはりpropsは初期だけか -> setterとか作るしかなさそう

一番最初の読み込みが終わるまでまってほしい｡
globalとローカルわけるか?
だとしたらローカルグローバルどっちもtrueの時みたいに書かないと行けない
-> ローカルグローバル両方必要なのはtagComponentだけだと思う

わざわざ､パッケージ追加しなくても直接ローカルストレージをいじるだけで十分

非同期がちょっとだけわかった気がするので一部を非同期にする
->タイマーでちょっと待ってもらっているやつとか

拡張用apiつかってタイトルとurl取得成功
後はログイン周り

ログインログアウトテスト
今のやり方ではトークンを貼り付けられない
-> と言うかおそらく順番の問題だよね
-> 順番の問題は一番最初だけ
-> タイマー使って無理やり待ってもらうか｡
もう少しタイマーあたりを怪しんでみるか?

Authorization付けてても401ってどういうこと?
セッションの問題?
クッキーの問題
X-XSRF-TOKENの問題?

vuxを使って各々でヘッダーにつけるか?

自分が誰かわかるようにユーザーネームを取得しておく?

ログインさえできれば

拡張機能apiに書き換える前のローカル環境(?)ではうまく行った
だとするとやはりフロント側に問題がある

クッキーの問題っぽい
レスポンスのクッキーを取得するか?

ステートフルな通信しているのが悪いの?
ステートレス化が必要?

api認証ってログアウト処理とかいらなかったの?

結局拡張機能用に色々準備し直す必要があるかも?
api認証だとcsrfいらないの?

ちょっと実験してみる?
csrfトークンが怪しいかも

相談したところ401はサーバー側のエラーもあるんだとか?

cors.phpはいつ読み込まれる?
sanctumの認証の仕方をブレイクポイントで調べる

多分spa認証と何か被っているのかも
拡張機能からの通信はセッションを確認しないとかにすれば行けそう?
でも､sanctumあたりを直接いじっても､本番環境まで反映されない

ミドルウェア分けるだけでよいのでは?
-> いけた
-> \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,をルートミドルウェアにしてspaのところにだけ引っ掛けた

postmanではAuthorizationにBearerを付けていた

ところでapiトークンを発行する必要がある場合､テストはどうするのかな?
クリアできたはず!!

ただログインしたては順番の関係上最初だけうまくいかない

拡張機能とwebアプリに問題がないかtest