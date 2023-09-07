# Frontend Configuration

local_resource(
  'frontend_dependencies',
  serve_cmd='cd frontend/news_checker_frontend && npm install',
  labels=['dependencies'],
  deps=['./frontend/news_checker_frontend'],
)

local_resource(
  'frontend',
  serve_cmd='cd frontend/news_checker_frontend && npm start',
  labels=['frontend'],
  resource_deps=['frontend_dependencies']
)

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