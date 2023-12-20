# NextJsはAPI Routerという機能がある

出来ることを簡単に書いておくとpages内でAPI呼び出しをするときに、相対パスを頑張って引かずとも

```ts
axios.get('/api/hello')
```

のように`/api/*`で呼び出せる

### 詳しくは以下参照

[公式NextJsドキュメント](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)

[非公式日本語ドキュメント](https://nextjs-ja-translation-docs.vercel.app/docs/api-routes/introduction)