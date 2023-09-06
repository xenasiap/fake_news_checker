from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .utils import extract_article_from_url, predict_fake_news

@csrf_exempt
def check_news(request):
    if request.method == "POST":
        data = json.loads(request.body)
        url = data.get('url', '')
        manual_text = data.get('manual_text', '')

        # If there's a URL, use it, otherwise use the manual text
        article_text = extract_article_from_url(url) if url else manual_text

        result = predict_fake_news(article_text)

        return JsonResponse({"result": result})
