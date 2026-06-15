# Lumiere Belle Salon

渋谷のエステ・美容サロン「Lumiere Belle Salon」の契約獲得用サンプルサイトです。  
ビルドツール不要。`index.html` をブラウザで開くだけで動作します。

---

## ファイル構成

```
beauty-salon-sample-1/
├── index.html              # HTMLのみ（スタイル・スクリプトは外部ファイル参照）
├── assets/
│   ├── css/
│   │   ├── variables.css   # 色・フォント・サイズなどのCSS変数
│   │   ├── base.css        # リセット・html/body/img/aの基本スタイル
│   │   ├── layout.css      # ヘッダー・フッター・ドロワー・SP固定バー
│   │   ├── components.css  # セクション見出し（.sec-head）などの共通パーツ
│   │   ├── sections.css    # 各セクションのスタイル（hero〜store）
│   │   ├── animations.css  # フェード・スタガー・ローディング・スライダーのアニメーション
│   │   └── responsive.css  # メディアクエリ（768px / 1024px / 1200px / 1440px / 1680px / 1920px / 2560px）
│   ├── js/
│   │   ├── loader.js       # ローディング画面の表示・非表示制御
│   │   ├── navigation.js   # ドロワー開閉・ヘッダースクロール制御・スムーススクロール
│   │   ├── hero-slider.js  # ヒーロースライダーとドットナビゲーション
│   │   ├── scroll-effects.js # IntersectionObserverによるスクロールアニメーション
│   │   └── main.js         # 各モジュールの初期化（エントリーポイント）
│   └── images/             # 差し替え用画像を置く場所（現在はUnsplash外部URLを使用）
└── README.md
```

---

## よく変更する箇所

### 色を変更する
`assets/css/variables.css` の `:root` を編集します。

| 変数 | 色 | 用途 |
|---|---|---|
| `--gold` | `#c4a56b` | メインゴールド（ボタン・アクセント） |
| `--deep` | `#1e1408` | ヘッダー背景・ボタン・見出し |
| `--ivory` | `#f9f6f1` | セクション背景（薄いアイボリー） |
| `--cream` | `#f3ebe0` | カード背景・予約セクション背景（大画面） |

### 電話番号・予約リンクを変更する
`index.html` 内で `03-0000-0000` を検索して置き換えてください（4箇所）。  
LINE予約・Web予約の `href="#"` も実際のURLに変更してください。

### 画像を差し替える
`index.html` 内の `https://images.unsplash.com/...` をローカルパスまたは本番URLに変更します。  
ローカル画像は `assets/images/` に置いて `src="assets/images/xxx.jpg"` と指定してください。

### ローディング表示時間を調整する
`assets/js/loader.js` の `minMs`（通常2700ms）を変更します。

### アニメーションを調整する
`assets/css/animations.css` に全アニメーションが集約されています。  
`@media (prefers-reduced-motion: no-preference)` ブロック内のみに定義しているため、  
モーション低減設定のユーザーには自動的にアニメーションが適用されません。

---

## 動作確認チェックリスト

- [ ] ローディング画面が表示→フェードアウトする
- [ ] ヒーロースライダーが自動切り替えする（ドットで手動切替も可）
- [ ] SP表示でハンバーガーメニューが開閉する
- [ ] スクロール時にヘッダーが隠れ、上スクロールで再表示する
- [ ] セクションのフェードイン・スタガーアニメーションが動く
- [ ] 電話リンク・LINEリンク・Web予約リンクのhrefが正しい
- [ ] PC大画面（1440px〜2560px）でレイアウトが崩れない
- [ ] コンソールにエラーが出ていない
