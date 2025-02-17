import requests
from bs4 import BeautifulSoup

def fetch_page(url):
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()  # 如果请求失败，则抛出异常
        return response.text
    except Exception as e:
        print("获取页面失败:", e)
        return None

def parse_text(html):
    soup = BeautifulSoup(html, 'html.parser')
    # 获取所有文本（简单示例，实际可能需要更精细的处理）
    return soup.get_text(separator='\n', strip=True)

if __name__ == '__main__':
    url = "https://www.example.com"  # 这里替换为你想爬取的网址
    html = fetch_page(url)
    if html:
        text = parse_text(html)
        print(text)
