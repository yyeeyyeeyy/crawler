// 引入 lunr 模块（在 Workers 环境中可以使用 ESM 方式引入，如果需要，也可以直接将 lunr.js 的代码粘贴到本文件中）
import lunr from "https://cdn.jsdelivr.net/npm/lunr@2.3.9/lunr.min.js";

// 示例文档数据
const documents = [
  {
    id: "1",
    title: "示例页面",
    content: "这是一个用于示例的页面内容，用来展示搜索功能。"
  },
  {
    id: "2",
    title: "关于我们",
    content: "我们的团队致力于为用户提供最好的搜索体验。"
  },
  // 可根据需要添加更多文档
];

// 构建 lunr 索引
const idx = lunr(function () {
  this.ref("id");
  this.field("title");
  this.field("content");
  documents.forEach(doc => this.add(doc));
});

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * 处理请求，根据 URL 判断是否为搜索 API 请求
 */
async function handleRequest(request) {
  const url = new URL(request.url);
  
  // 当请求路径为 /api/search 时，处理搜索查询
  if (url.pathname === "/api/search") {
    const query = url.searchParams.get("q");
    if (!query) {
      return new Response(JSON.stringify({ error: "缺少查询参数 q" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 使用 lunr 搜索
    const results = idx.search(query).map(result => {
      // 根据 lunr 返回的 id 找到文档详情
      const doc = documents.find(d => d.id === result.ref);
      return doc;
    });

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 对于其他请求，返回简单说明信息
  return new Response("请访问 /api/search?q=关键词 进行搜索。", { status: 200 });
}
