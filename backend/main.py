from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from selenium import webdriver
import undetected_chromedriver as uc
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import json
import asyncio 
from dotenv import load_dotenv
import os

load("./.env")
EMAIL = os.getenv("EMAIL")
PASSWORD = os.getenv("PASSWORD")

app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

class PromptRequest(BaseModel):
    prompt: str

def generate_image(prompt: str) -> str:
    
    print("===============Starting scraping automation=================")
    chrome_options = uc.ChromeOptions()
    
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_argument("--start-maximized")
    chrome_options.add_argument("--disable-gpu")  
    chrome_options.add_argument("--ignore-certificate-errors")
    chrome_options.add_argument("--headless=new")
    
    driver = uc.Chrome(
        use_subprocess=False,
        options=chrome_options,
    )
    
    try:
        
        if driver:
            print("driver setup successfully!")
            
        time.sleep(10)
        driver.get("https://chatgpt.com")
        time.sleep(10)
        
        print("Trying to restore session")
        
        # Load cookies
        try:
            with open("./cookies.json", "r") as file:
                cookies = json.load(file)
            for cookie in cookies:
                driver.add_cookie(cookie)
                print(f"Error adding cookie: {cookie['name']} - {e}")
            
        except Exception as e:
            print(f"Error laoding cookies-----------{e}")
        
        driver.refresh()
        print("cookies loaded")
            
        # Login
        try:
            time.sleep(5)
            login_button = driver.find_element(By.CSS_SELECTOR, '[data-testid="login-button"]')
            if login_button:
                print("clicking on login!")
                
                driver.execute_script("arguments[0].click();", login_button)
                time.sleep(10)
    
                email_input = driver.find_element(By.CSS_SELECTOR, 'input#email-input')
                if email_input:
                    print("clicking on email input!")
    
                email_input.send_keys(EMAIL)
                time.sleep(5)
                email_input.send_keys(Keys.RETURN)
                time.sleep(10)
    
    
                password_input = driver.find_element(By.CSS_SELECTOR, 'input#password')
                if password_input:
                    print("clicking on password input!")
                password_input.send_keys(PASSWORD)
                time.sleep(5)
                password_input.send_keys(Keys.RETURN)
                time.sleep(30)
    
    
                with open("cookies.json", "w") as file:
                    json.dump(driver.get_cookies(), file)
        except:
            print("cookie loaded!!!")
            
            
        
        
        # Enter prompt
        print("Trying to send prompt")
        time.sleep(15)
        input_box = driver.find_element(By.ID, "prompt-textarea")
        if input_box:
            print("sending prompt!")
            
        input_box.send_keys(f"Generate an image: {prompt}")
        time.sleep(5)
        input_box.send_keys(Keys.RETURN)
        time.sleep(20)
        
        
        img_element = driver.find_element(By.CSS_SELECTOR, "div.relative.h-full img")
        img_url = img_element.get_attribute("src")
        print(img_url)
        
        return img_url
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        driver.quit()


@app.post("/generate")
async def generate(request: PromptRequest):
    img_url = await asyncio.to_thread(generate_image, request.prompt)
    return {"image_url": img_url}

