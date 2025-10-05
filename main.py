import os 

from dotenv import load_dotenv
from openai import OpenAI
import base64


load_dotenv()

# Initialize OpenRouter client
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

def image_to_markdown(image_path):
    """Convert image to markdown"""
    
    # Read and encode image
    with open(image_path, "rb") as f:
        image_data = base64.b64encode(f.read()).decode()
    
    # Send to model
    response = client.chat.completions.create(
        model="google/gemini-2.0-flash-lite-001",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Convert all content in this image to markdown. Include headings, lists, tables, and formatting. Return only the markdown."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{image_data}"
                        }
                    }
                ]
            }
        ]
    )
    
    return response.choices[0].message.content

# Use it
if __name__ == "__main__":
    markdown = image_to_markdown("test.png")
    print(markdown)
    
    # Save to file
    with open("output.md", "w") as f:
        f.write(markdown)