from whoosh import index
from whoosh.qparser import QueryParser

def search(query_str, index_dir="indexdir"):
    ix = index.open_dir(index_dir)
    # 使用 content 字段进行查询
    qp = QueryParser("content", schema=ix.schema)
    q = qp.parse(query_str)
    results = []
    with ix.searcher() as searcher:
        for hit in searcher.search(q, limit=10):
            results.append({
                "url": hit["url"],
                "title": hit["title"],
                "content": hit["content"]
            })
    return results

if __name__ == '__main__':
    query_str = input("请输入查询内容：")
    results = search(query_str)
    for res in results:
        print("标题:", res["title"])
        print("URL:", res["url"])
        print("内容预览:", res["content"][:100])
        print("-----")
