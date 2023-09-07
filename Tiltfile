# Backend Configuration

local_resource(
  'backend_dependencies',
  cmd='cd backend/news_checker && pip install -r requirements.txt --user',
  labels=['dependencies'],
  deps=['./backend/news_checker/requirements.txt'],
)

local_resource(
  'backend',
  serve_cmd='cd backend/news_checker && python manage.py runserver',
  labels=['backend'],
  resource_deps=['backend_dependencies'],
  deps=['./backend/news_checker'],
)