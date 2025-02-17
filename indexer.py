from whoosh import index
from whoosh.fields import Schema, TEXT, ID
import os

# 定义索引的结构：包括网页 URL、标题和内容
schema = Schema(
    url=ID(stored=True, unique=True),
    title=TEXT(stored=True),
    content=TEXT(stored=True)
)

def create_index(index_dir="indexdir"):
    if not os.path.exists(index_dir):
        os.mkdir(index_dir)
    # 如果目录下不存在索引，则创建；否则打开已有索引
    if not index.exists_in(index_dir):
        ix = index.create_in(index_dir, schema)
    else:
        ix = index.open_dir(index_dir)
    return ix

def add_document(ix, url, title, content):
    writer = ix.writer()
    writer.update_document(url=url, title=title, content=content)
    writer.commit()

if __name__ == '__main__':
    ix = create_index()
    # 这里是一个示例，你可以将爬虫抓取到的内容写入索引
    test_url = "https://www.example.com"
    test_title = "Example Domain"
    test_content = "This domain is established to be used for illustrative examples in documents."
    add_document(ix, test_url, test_title, test_content)
    print("索引创建并添加文档完成")
