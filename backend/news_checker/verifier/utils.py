from bs4 import BeautifulSoup
import requests
import joblib
import re
import nltk
nltk.data.path.append("./data")
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

def extract_article_from_url(url):
    response = requests.get(url)

    if response.status_code != 200:
        raise ValueError("The text cannot be grabbed. Please enter the article's text manually in the related field.")

    soup = BeautifulSoup(response.text, 'html.parser')

    text = [p.text for p in soup.find_all('p')]
    article_text = '\n'.join(text)

    lines = article_text.split('\n')
    filtered_lines = [line for line in lines if len(line) > 150]
    return '\n'.join(filtered_lines)


# Initialization
ps = WordNetLemmatizer()
stopwords_set = set(stopwords.words('english'))

def cleaning_data(row):
    row = row.lower()
    row = re.sub('[^a-zA-Z]', ' ', row)
    token = row.split()
    news = [ps.lemmatize(word) for word in token if word not in stopwords_set]
    return ' '.join(news)

def predict_fake_news(article):
    # Paths to your saved model and vectorizer
    model_path = 'models/model.pkl'
    vectorizer_path = 'models/vectorizer.pkl'

    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)

    cleaned_article = cleaning_data(article)
    vec_article = vectorizer.transform([cleaned_article]).toarray()
    prediction = model.predict(vec_article)

    return "Fake News" if prediction[0] == 1 else "True News"

