// Test script to verify API connection
const API_BASE_URL = "http://localhost:5002/api";

async function testVisaAPI() {
  try {
    console.log("Testing visa API connection...");
    console.log("API URL:", `${API_BASE_URL}/visas`);
    
    const response = await fetch(`${API_BASE_URL}/visas`);
    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Success! Data received:");
    console.log("Number of visas:", data.data?.length || 0);
    console.log("First visa:", data.data?.[0]?.country || "No data");
    
  } catch (error) {
    console.error("Error testing API:", error);
  }
}

testVisaAPI();