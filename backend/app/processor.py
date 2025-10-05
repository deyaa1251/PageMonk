import os
import json
from typing import Optional, Dict, Any
import PyPDF2
from PIL import Image
import pytesseract
import ollama
import requests

class DocumentProcessor:
    def __init__(self):
        pass
        
    async def extract_text_with_ocr(self, file_path: str) -> str:
        """Extract text from document using OCR and text extraction"""
        try:
            file_extension = os.path.splitext(file_path)[1].lower()
            
            if file_extension == '.pdf':
                return self._extract_from_pdf(file_path)
            elif file_extension in ['.jpg', '.jpeg', '.png']:
                return self._extract_from_image(file_path)
            else:
                return "Unsupported file format"
                
        except Exception as e:
            print(f"Error in text extraction: {e}")
            return f"Error extracting text: {str(e)}"
    
    def _extract_from_pdf(self, file_path: str) -> str:
        """Extract text from PDF using PyPDF2"""
        try:
            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                for page in pdf_reader.pages:
                    page_text = page.extract_text()
                    if page_text.strip():
                        text += page_text + "\n"
                
                # If PDF has no extractable text, it might be scanned - convert to image and OCR
                if not text.strip():
                    # For scanned PDFs, you would need pdf2image library
                    # For now, return a message indicating OCR is needed
                    return "This appears to be a scanned PDF. Please use an image format for OCR processing."
                
                return text.strip()
        except Exception as e:
            return f"Error reading PDF: {str(e)}"
    
    def _extract_from_image(self, file_path: str) -> str:
        """Extract text from image using OCR (Tesseract)"""
        try:
            # Open and process image
            with Image.open(file_path) as img:
                # Convert RGBA to RGB if necessary
                if img.mode == 'RGBA':
                    img = img.convert('RGB')
                
                # Use Tesseract OCR to extract text
                extracted_text = pytesseract.image_to_string(img, config='--psm 6')
                
                # If no text found, provide helpful message
                if not extracted_text.strip():
                    width, height = img.size
                    return f"Image processed ({width}x{height} pixels) but no text was detected. The image may be too low quality or contain no readable text."
                
                return extracted_text.strip()
                
        except Exception as e:
            return f"Error processing image with OCR: {str(e)}"
    
    async def structure_with_llm(self, content: str, instructions: Optional[str] = None) -> str:
        """Structure content using Ollama Qwen2.5:0.5b"""
        try:
            default_instructions = """
            Please structure this content into clean, well-organized markdown format. 
            Include appropriate headings, lists, tables where relevant, and maintain the logical flow of information.
            Make it easy to read and understand.
            """
            
            prompt = f"""
            {instructions or default_instructions}
            
            Content to structure:
            {content}
            
            Return only the structured markdown content without any additional commentary.
            """
            
            response = ollama.chat(
                model='qwen2.5:0.5b',
                messages=[{
                    'role': 'user',
                    'content': prompt
                }]
            )
            
            return response['message']['content']
            
        except Exception as e:
            print(f"Error in LLM structuring: {e}")
            return f"Error structuring content: {str(e)}"
    
    async def extract_with_schema(self, content: str, schema: Dict[str, Any]) -> str:
        """Extract information according to a user-defined schema"""
        try:
            schema_prompt = f"""
            Extract information from the following content according to this schema:
            
            Schema: {json.dumps(schema, indent=2)}
            
            Content: {content}
            
            Return the extracted information as a JSON object that matches the schema structure.
            If a field cannot be found, use null or an appropriate default value.
            Return only valid JSON without any additional text or commentary.
            """
            
            response = ollama.chat(
                model='qwen2.5:0.5b',
                messages=[{
                    'role': 'user',
                    'content': schema_prompt
                }]
            )
            
            return response['message']['content']
            
        except Exception as e:
            print(f"Error in schema extraction: {e}")
            return f"Error extracting with schema: {str(e)}"

# Global processor instance
processor = DocumentProcessor()