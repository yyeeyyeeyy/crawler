from flask import Flask, request, render_template_string
from searcher import search

app = Flask(__name__)

# 定义一个简单的 HTML 模板
html_template = """
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>我的搜索引擎</title>
</head>
<body>
    <h1>搜索引擎</h1>
    <form action="/" method="get">
        <input type="text" name="q" placeholder="输入搜索内容" style="width:300px;">
        <button type="submit">搜索</button>
    </form>
    {% if results %}
        <h2>搜索结果：</h2>
        <ul>
        {% for res in results %}
            <li>
                <strong>{{ res.title }}</strong><br>
                URL: <a href="{{ res.url }}" target="_blank">{{ res.url }}</a><br>
                内容预览: {{ res.content[:150] }}...
            </li>
        {% endfor %}
        </ul>
    {% endif %}
</body>
</html>
"""

@app.route("/", methods=["GET"])
def index():
    query = request.args.get("q")
    results = None
    if query:
        results = search(query)
    return render_template_string(html_template, results=results)

if __name__ == '__main__':
    app.run(debug=True)
