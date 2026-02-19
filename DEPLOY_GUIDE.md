# GitHub Pages デプロイ運用ガイド

## 📋 現在の設定

### GitHub Pages設定
- **公開元**: `main`ブランチ / ルートディレクトリ (`/`)
- **公開URL**: https://raika620uta.github.io/ca_portfolio/
- **デプロイ方式**: GitHub Pagesの自動ビルド（push時に自動実行）

### リポジトリ情報
- **リモートURL**: https://github.com/raika620uta/ca_portfolio.git
- **ブランチ**: `main`

---

## 🔍 問題の原因と解決策

### 問題：公開URLが更新されない

**原因**
1. `.gitignore`が`style.css`と`script.js`を除外していた
2. 新アーキテクチャ（`data/`, `engine/`ディレクトリ）のファイルが未コミット
3. `index.html`の大幅な変更が未反映

**解決策**
- `.gitignore`を修正し、必要なファイルをすべてリポジトリに含めるよう変更
- すべての未コミット変更をステージングしてリモートにプッシュ
- 自動デプロイスクリプトを導入し、今後の更新を簡素化

---

## 🚀 運用方法

### デプロイ前の準備（重要）

**バージョン更新**:

更新内容を確実に反映させるため、デプロイ前に必ず`data/site.js`の`SITE_VERSION`を更新してください。

```javascript
// data/site.js
const SITE = {
    /* --- バージョン管理（★ デプロイ時にここだけ更新） --- */
    SITE_VERSION: "20260218-2", // 形式: YYYYMMDD-連番（連番を1増やす）
    // ...
};
```

**更新ルール**:
- 日付が変わったら: `20260218-1` → `20260219-1`
- 同日に複数回デプロイ: `20260218-1` → `20260218-2` → `20260218-3`

**仕組み**:
- `index.html`が自動的に`SITE_VERSION`を読み取り
- すべてのCSS/JSファイルに`?v=20260218-2`のようなクエリパラメータを付与
- ブラウザキャッシュを回避して最新版を読み込み

---

### A案：ワンコマンドデプロイ（推奨）

最も安全で確実な方法です。ファイルを編集・保存した後、1つのコマンドでデプロイできます。

#### 使い方

**方法1: npm scriptを使用**
```powershell
npm run deploy
```

**方法2: PowerShellスクリプトを直接実行**
```powershell
.\deploy.ps1
```

#### 実行内容
1. 変更されたファイルを確認
2. すべての変更をステージング（`git add -A`）
3. タイムスタンプ付きコミット（例: `Update: 2026-02-17 20:46`）
4. リモートへプッシュ（`git push origin main`）

#### メリット
- ✅ 意図しない変更が含まれるリスクがない
- ✅ デプロイ前に変更内容を確認できる
- ✅ シンプルで壊れにくい

---

### B案：自動監視デプロイ（上級者向け）

ファイルの変更を監視し、保存後30秒で自動的にデプロイします。

#### 使い方

**方法1: バッチファイルをダブルクリック**
- `start-auto-deploy.bat`をダブルクリック

**方法2: PowerShellで直接実行**
```powershell
.\auto-deploy.ps1
```

#### 実行内容
1. ファイルシステムを監視（`.git/`, `node_modules/`などは除外）
2. ファイル変更を検知したら30秒待機
3. 自動的にcommit & push

#### 停止方法
- `Ctrl+C`を押す

#### メリット
- ✅ 完全自動化（保存するだけで公開URLに反映）
- ✅ 作業に集中できる

#### デメリット
- ⚠️ 意図しない変更も自動でpushされる可能性
- ⚠️ スクリプトを起動し続ける必要がある

---

## 🛠️ トラブルシューティング

### GitHub Pagesが更新されない

#### 1. リモートリポジトリに変更がpushされているか確認

```powershell
git log --oneline -5
```

最新のコミットが表示されることを確認してください。

#### 2. GitHubのActionsタブを確認

1. https://github.com/raika620uta/ca_portfolio/actions にアクセス
2. 最新の「pages build and deployment」ワークフローを確認
3. ステータスが「成功」（緑のチェックマーク）になっているか確認

#### 3. Pages設定を確認

1. https://github.com/raika620uta/ca_portfolio/settings/pages にアクセス
2. **Source**が「Deploy from a branch」になっているか確認
3. **Branch**が「main」/「/ (root)」になっているか確認

#### 4. ブラウザキャッシュをクリア

- `Ctrl+Shift+R`（Windows）でスーパーリロード
- またはシークレットモードで公開URLを開く

---

### デプロイスクリプトが実行できない

#### エラー: 「このシステムではスクリプトの実行が無効になっているため...」

**解決策**: PowerShellの実行ポリシーを一時的に変更

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

その後、再度スクリプトを実行してください。

---

### プッシュが失敗する

#### エラー: 「fatal: unable to access...」

**原因**: ネットワーク接続の問題、または認証エラー

**解決策**:
1. インターネット接続を確認
2. GitHubの認証情報を確認（Personal Access Tokenなど）
3. 以下のコマンドで手動プッシュを試す：

```powershell
git push origin main
```

---

### 自動監視が動作しない

#### ファイルを保存しても反応がない

**確認項目**:
1. スクリプトが正常に起動しているか（「✓ 監視を開始しました。」と表示されているか）
2. 変更したファイルが除外パターンに含まれていないか
3. PowerShellウィンドウを閉じていないか

**除外パターン**:
- `.git/`
- `node_modules/`
- `dist/`, `build/`
- `.log`ファイル
- `~`で終わるファイル

---

# デプロイガイド

## 🚀 デプロイ手順

### 1. 変更をコミット

```powershell
git add -A
git commit -m "変更内容の説明"
```

### 2. プッシュ

```powershell
git push origin main
```

### 3. GitHub Actionsの確認

1. GitHubリポジトリページを開く: https://github.com/raika620uta/ca_portfolio
2. 「Actions」タブをクリック
3. 最新の「pages build and deployment」ワークフローを確認
4. ✅ 緑のチェックマークが表示されるまで待つ（通常30秒〜2分）

### 4. 反映確認

**公開URL**: https://raika620uta.github.io/ca_portfolio/

**確認方法**:
1. 上記URLをブラウザで開く
2. **強制リロード**を実行:
   - Windows: `Ctrl + Shift + R` または `Ctrl + F5`
   - Mac: `Cmd + Shift + R`
3. 最新の変更が反映されていることを確認

**反映されない場合**:
1. ブラウザのキャッシュをクリア
2. シークレットモード/プライベートブラウジングで開く
3. 5分待ってから再度確認（CDNキャッシュの更新）

---

## 🔧 キャッシュバスティング（更新時）

**更新が即座に反映されるようにするため、デプロイ時にバージョンパラメータを更新してください。**

### 手順

1. **`index.html`のバージョンパラメータを更新**:
   ```html
   <!-- 変更前 -->
   <link rel="stylesheet" href="engine/style.css?v=20260218">
   <script src="data/site.js?v=20260218"></script>
   
   <!-- 変更後（日付を今日の日付に） -->
   <link rel="stylesheet" href="engine/style.css?v=20260219">
   <script src="data/site.js?v=20260219"></script>
   ```

2. **`data/site.js`のバージョン情報を更新**:
   ```javascript
   const SITE = {
       version: "2026-02-19T12:00:00+09:00", // 現在時刻に更新
       // ...
   };
   ```

3. コミット・プッシュ

**自動化スクリプト**（今後実装予定）:
- `deploy.ps1`を実行すると自動的にバージョンパラメータを更新

---

## 📋 トラブルシューティング

### 問題: 更新が反映されない

**原因と対策**:

1. **コミット・プッシュ忘れ**
   ```powershell
   git status  # 未コミットの変更を確認
   git add -A
   git commit -m "更新"
   git push origin main
   ```

2. **GitHub Actionsの失敗**
   - GitHubの「Actions」タブで失敗ログを確認
   - エラーメッセージに従って修正

3. **Jekyllビルド干渉**
   - `.nojekyll`ファイルが存在することを確認
   - なければ作成: `New-Item -ItemType File -Path ".nojekyll"`

4. **ブラウザキャッシュ**
   - 強制リロード: `Ctrl + Shift + R`
   - シークレットモードで確認

5. **CDNキャッシュ**
   - 5〜10分待つ
   - バージョンパラメータを更新（上記参照）

---

## 🎯 確実に反映させるチェックリスト

- [ ] `git status`で未コミットの変更がないことを確認
- [ ] `git push`が成功したことを確認
- [ ] GitHub Actionsが✅成功したことを確認
- [ ] `index.html`のバージョンパラメータを更新
- [ ] ブラウザで強制リロード（`Ctrl + Shift + R`）
- [ ] 最新の変更が表示されることを確認

---

## 📝 補足

- **GitHub Pages の公開元**: `main`ブランチの`/`（ルート）
- **デプロイ方式**: GitHub Actions（自動）
- **反映時間**: 通常30秒〜2分、最大10分
- **キャッシュバスティング**: `?v=YYYYMMDD`パラメータで対応

3. **手動でコミット**（より詳細なコミットメッセージを書く場合）
   ```powershell
   git add -A
   git commit -m "詳細なコミットメッセージ"
   git push origin main
   ```

---

## 📂 追加されたファイル一覧

| ファイル | 説明 |
|---------|------|
| `deploy.ps1` | A案：ワンコマンドデプロイスクリプト |
| `auto-deploy.ps1` | B案：自動監視デプロイスクリプト |
| `start-auto-deploy.bat` | B案を起動するバッチファイル |
| `package.json` | npm scriptsの定義 |
| `.gitignore` | 修正済み（不要な除外設定を削除） |

---

## 🎯 まとめ

- **通常の更新**: `npm run deploy`を実行するだけ
- **完全自動化したい場合**: `start-auto-deploy.bat`を起動
- **問題が発生したら**: このガイドのトラブルシューティングセクションを参照

**公開URL**: https://raika620uta.github.io/ca_portfolio/

変更がGitHub Pagesに反映されるまで、通常2〜5分かかります。

---

## ⚠ auto-deploy.ps1 の文字コードについて

- `auto-deploy.ps1` は **UTF-8 with BOM** で保存されています。
- Windows PowerShell (5.x) は BOM なしの UTF-8 を正しく解釈できない場合があります。
- **スクリプトを編集する場合は、保存時に「UTF-8 (BOM付き)」を選択してください。**
  - VSCode: 右下の `UTF-8` をクリック → `Save with Encoding` → `UTF-8 with BOM`
  - メモ帳: `名前を付けて保存` → 文字コード `UTF-8 (BOM付き)`
- ログメッセージは文字化け回避のため **英語** で出力されます。
- 壊れた旧バージョンは `auto-deploy.broken.ps1` としてバックアップされています。

