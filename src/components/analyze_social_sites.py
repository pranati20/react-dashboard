import pandas as pd
import json

# Load the CSV file
file_path = r'C:\\Users\\Pranati Sattarapu\\react-dashboard\\public\\Modified_Social_Score.csv'
data = pd.read_csv(file_path)

# List of relevant columns
columns = [
    'Phone Social Premium.amazon', 'Phone Social Premium.byjus', 'Phone Social Premium.flipkart',
    'Phone Social Premium.housing', 'Phone Social Premium.indiamart', 'Phone Social Premium.instagram',
    'Phone Social Premium.jeevansaathi', 'Phone Social Premium.jiomart', 'Phone Social Premium.my11',
    'Phone Social Premium.paytm', 'Phone Social Premium.rummycircle', 'Phone Social Premium.shaadi',
    'Phone Social Premium.swiggy', 'Phone Social Premium.whatsapp', 'Phone Social Premium.yatra'
]

# Ensure column names are consistent
columns = [col.strip() for col in columns]

# Replace errors with NaN and standardize case for matching
filtered_data = data[columns].replace('error', pd.NA).applymap(lambda x: x.lower() if isinstance(x, str) else x)

# Count occurrences of "account found" (case insensitive)
account_found_counts = (filtered_data == 'account found').sum()

# Get the top 5 social sites
top_social_sites = account_found_counts.nlargest(5)

# Convert to dictionary for JSON serialization
top_social_sites_dict = top_social_sites.to_dict()

# Save the output to a JSON file
with open(r'C:\\Users\\Pranati Sattarapu\\react-dashboard\\public\\top_social_sites.json', 'w') as f:
    json.dump(top_social_sites_dict, f)

print("Top 5 Social Sites saved to top_social_sites.json")
# import pandas as pd

# # Load the CSV file
# file_path = 'C:\\Users\\Pranati Sattarapu\\react-dashboard\\public\\Modified_Social_Score.csv'  # Update this path to where you saved the CSV file
# data = pd.read_csv(file_path)

# # List unique values in 'Phone Network.isPhoneReachable' column
# unique_values = data['Phone Network.isPhoneReachable'].unique()
# print(unique_values)
