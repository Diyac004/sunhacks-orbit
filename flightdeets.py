from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time

# Set up the WebDriver using webdriver-manager
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

try:
    # Open Skyscanner website
    driver.get("https://www.skyscanner.net/")

    # Allow some time for the page to load
    time.sleep(5)

    # Use WebDriverWait to wait for the departure input field to be present and visible
    departure_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "fsc-origin-search"))
    )
    departure_input.send_keys("PHX")

    destination_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "fsc-destination-search"))
    )
    destination_input.send_keys("BOM")

    # Click on the date input to open the date picker
    date_input = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "depart-fsc-datepicker-button"))
    )
    date_input.click()

    # Wait for the date picker to be visible and select a date (e.g., December 13, 2024)
    WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//button[@aria-label='13 December 2024']"))
    ).click()

    # Submit search form by clicking the search button
    search_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
    )
    search_button.click()

    # Wait for results to load (you may need to adjust this sleep time)
    time.sleep(15)

    # Get page source and parse with BeautifulSoup
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    # Example: Extract flight information (adjust selectors based on actual HTML structure)
    flights = soup.find_all('div', class_='some-class-name')  # Replace 'some-class-name' with actual class name

    for flight in flights:
        # Extract specific details per flight (e.g., price, airline)
        price = flight.find('span', class_='price-class').text  # Replace 'price-class' with actual class name
        airline = flight.find('span', class_='airline-class').text  # Replace 'airline-class' with actual class name

        print(f"Airline: {airline}, Price: {price}")

finally:
    # Close the browser after scraping
    driver.quit()