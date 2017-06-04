import os
import json

def save_file(json_data, project_uuid):

    '''
    json_data is a Python object, project_uuid is a string
    '''

    # Open a project to write the data to
    with open(os.path.join('projects/', project_uuid + '.json'), 'w') as project_file:
        json.dump(obj=json_data, fp=project_file, ensure_ascii=False)


#dictionary = {'hi': 'hello'}
#save_file(dictionary, 'sdfsdfasdf')
