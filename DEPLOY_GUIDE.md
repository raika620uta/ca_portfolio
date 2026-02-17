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

## 📝 推奨ワークフロー

### 日常的な更新作業

1. **ファイルを編集・保存**
   - `index.html`, `data/page-main.js`, `style.css`など

2. **デプロイ実行**
   ```powershell
   npm run deploy
   ```

3. **確認**
   - 数分待機後、https://raika620uta.github.io/ca_portfolio/ にアクセス
   - 変更が反映されていることを確認

### 大規模な変更時

1. **ローカルで動作確認**
   - Live Serverなどで動作確認

2. **変更内容を確認**
   ```powershell
   git status
   git diff
   ```

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
