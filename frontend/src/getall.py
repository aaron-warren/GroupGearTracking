import os
import json

json_folder_path = os.path.join("C:\\","Users","aaron","Desktop","TClone","frontend","src","Images","avatars")
# json_files = [ x for x in os.listdir(json_folder_path)]
json_files = {}
i = 0
for x in os.listdir(json_folder_path):
    json_files[i] = x
    i = i + 1
json_data = list()

# for json_file in json_files:
#     json_file_path = os.path.join("./Images/avatars/", json_file)
#     with open(json_file_path, "r") as f:
#         json_data.append(json.load(f))

output_path = os.path.join(json_folder_path,"output.json")
with open ("C:\\Users\\aaron\\Desktop\\TClone\\frontend\\src\\test.json", "w") as f:
    json.dump(json_files, f)