import os
import trafilatura
from newspaper import Article
import markdown
from tika import parser
import requests
# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.


schrems = 'https://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX:62014CJ0362'
wvs = 'https://wetten.overheid.nl/BWBR0001854/2022-07-01'
treaties = 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A12012E%2FTXT'
def print_hi():

    parser.ServerEndpoint = "http://localhost:9998"

    t = requests.get(schrems).text
    p = parser.from_buffer(t, xmlContent=True)

    parser.from_buffer()
    # art = Article(')
    # art.download()
    # art.parse()

    downloaded = trafilatura.fetch_url(treaties)

    trafilatura.extract(downloaded)
    # outputs main content and comments as plain text ...

    result = trafilatura.extract(downloaded, output_format="xmltei", include_links=True, include_formatting=True)

    os.remove("demo.html")
    f = open("demo.html", "x")

    trafilatura.extract(downloaded, output_format="")
    f.write(markdown.markdown(result))
    f.close()


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print_hi()

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
