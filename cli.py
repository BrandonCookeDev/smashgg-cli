import os
from PyInquirer import prompt, print_json
from smashggpy.util.Initializer import initialize as initialize_smashggpy
from smashggpy.util.TokenHandler import TokenHandler

class CLI(object):

    __API_KEY = None
    __API_KEY_FILE = os.path.join(os.path.dirname('.'), '.api_key')

    @staticmethod
    def init(api_key: str):
        assert(api_key is not None, "api key parameter must have a value")

        if not os.path.exists(CLI.__API_KEY_FILE):
            f = open(CLI.__API_KEY_FILE)
            f.write(api_key)

        f = open()
        CLI.__API_KEY = f.read().split('\n')[0]

    @staticmethod
    def main():
        try:

            # Get the API key from user if not in memory
            CLI.init()

            if CLI.__API_KEY is None:
                done = None
                while not done:
                    api_key_questions = [
                        {
                            'type': 'input',
                            'name': 'api_key',
                            'message': 'Please enter your Smash.gg API Key'
                        }
                    ]
                    api_key_answers = prompt(api_key_questions)
                    try:
                        TokenHandler.init(api_key_answers.api_key)
                        done = True
                    except:
                        print('Token must be 32 hexidecimal characters! Please try again...')
                        continue

                CLI.init(api_key_answers.api_key)

            # initialize the smashgg sdk
            initialize_smashggpy(CLI.__API_KEY, 'information')

            # prompt loop
            while input is not 'done':
                pass

        except Exception as ex:
            print(ex)
