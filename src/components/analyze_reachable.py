import pandas as pd
import json

# Load the CSV file
file_path = r'C:\\Users\\Pranati Sattarapu\\react-dashboard\\public\\Modified_Social_Score.csv'
data = pd.read_csv(file_path)

# Drop NaN values
reachable_data = data['Phone Network.isPhoneReachable'].dropna()

# Count occurrences of each unique value
reachable_counts = reachable_data.value_counts()

# Convert to dictionary for JSON serialization
reachable_counts_dict = reachable_counts.to_dict()

# Save the output to a JSON file
with open(r'C:\\Users\\Pranati Sattarapu\\react-dashboard\\public\\reachable_counts.json', 'w') as f:
    json.dump(reachable_counts_dict, f)

print("Reachable counts saved to reachable_counts.json")




# Count occurrences of each unique value in 'Risk Model.identityConfidence'
identity_confidence_counts = data['Risk Model.identityConfidence'].dropna().value_counts()

# Convert to dictionary for JSON serialization
identity_confidence_counts_dict = identity_confidence_counts.to_dict()

# Save the output to a JSON file
with open(r'C:\\Users\\Pranati Sattarapu\\react-dashboard\\public\\identity_confidence_counts.json', 'w') as f:
    json.dump(identity_confidence_counts_dict, f)

print("Identity Confidence counts saved to identity_confidence_counts.json")

