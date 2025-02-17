// functions/search.js
import lunr from "lunr";

// 在这里我们构造一个简单的搜索索引
// 实际项目中，你可以从数据库或其他数据源加载数据
const idx = lunr(function () {
  // 定义要索引的字段
  this.field("title");
  this.field("content");
  this.ref("id");

  // 添加示例文档
  this.add({ id: 1, title: "示例网站", content: "这是一个用于展示搜索引擎功能的示例网站。" });
  this.add({ id: 2, title: "Cloudflare Pages", content: "Cloudflare Pages 提供静态网站托管以及无服务器函数（Functions）。" });
});

// Cloudflare Pages Functions 使用 onRequest 系列函数处理请求
export async function onRequestGet(context) {
  // 从请求 URL 获取查询参数（例如 ?q=关键词）
  const { searchParams } = new URL(context.request.url);
  const query = searchParams.get("q") || "";

  let results = [];
  if (query) {
    // 使用 lunr 进行搜索，返回匹配文档的 id 和分数
    results = idx.search(query).map(result => {
      return { id: result.ref, score: result.score };
    });
  }

  // 返回 JSON 格式的搜索结果
  return new Response(JSON.stringify({ results }), {
    headers: { "Content-Type": "application/json" }
  });
}
