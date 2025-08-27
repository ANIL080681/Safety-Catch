import google.generativeai as genai

genai.configure(api_key="AIzaSyD1HxuJjiYBzQSNJ2WaudPSoLEPuGZkVCA")

for model in genai.list_models():
  print(f"Model name: {model.name}")
  print(f"  Supported: {model.supported_generation_methods}")
  print("-" * 20)