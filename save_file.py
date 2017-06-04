import os
import json

def save_file(json_data, project_uuid):

    '''
    json_data is a Python object, project_uuid is a string
    '''

    project_file_path = os.path.join('projects/', project_uuid + '.json')
    # Write the project data to a file
    with open(project_file_path, 'w') as project_file:
        json.dump(obj=json_data, fp=project_file, ensure_ascii=False)


#dictionary = {'hi': 'hello'}
#save_file(dictionary, 'sdfsdfasdf')
