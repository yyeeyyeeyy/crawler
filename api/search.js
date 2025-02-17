// 文件：api/search.js
export async function onRequest(context) {
  // 从请求中解析 URL 和查询参数
  const { request } = context;
  const url = new URL(request.url);
  const query = url.searchParams.get('q'); // 获取查询关键词，参数名为 q

  // 模拟一个数据集，实际应用中这里可以是数据库或索引过的数据
  const data = [
    { title: "Cloudflare 教程", url: "https://www.cloudflare.com/zh-cn/learning/", snippet: "学习 Cloudflare 的各种功能和原理。" },
    { title: "GitHub 使用指南", url: "https://docs.github.com/", snippet: "GitHub 的官方使用文档。" },
    { title: "AI 语言模型", url: "https://example.com/ai", snippet: "关于 AI 模型和应用的介绍。" }
  ];

  // 简单过滤：判断查询关键词是否存在于标题或摘要中（不区分大小写）
  const results = query
    ? data.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.snippet.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // 返回 JSON 格式的搜索结果，同时添加允许跨域的响应头
  return new Response(JSON.stringify({ results }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'  // 如需限制域名可修改此处
    }
  });
}
