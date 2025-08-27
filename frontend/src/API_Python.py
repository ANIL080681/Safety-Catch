import google.generativeai as genai

genai.configure(api_key="YOUR_GEMINI_API_KEY_HERE")

for model in genai.list_models():
  print(f"Model name: {model.name}")
  print(f"  Supported: {model.supported_generation_methods}")
  print("-" * 20)