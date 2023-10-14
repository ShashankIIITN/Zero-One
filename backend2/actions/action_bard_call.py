import rasa.shared.utils.io as io
from rasa_sdk.events import SlotSet
from bardapi import BardCookies
from rasa_sdk import Action

cookie_dict = {
    
    "__Secure-1PSIDTS": "sidts-CjEB3e41hbuRiJhhTeEWIOsy7LkuUR084Wi9LkmXhRqcorhyWEpuQ07N6RoJ0lYM0ZZ2EAA",
    "__Secure-1PSID": "bwjNXE5EjkoDdYjICLOdoynYfVR7Xgslio6uzE4EkYkkCj65sIR_BN6VeIp2yxg9BLVHvw."

}




bard = BardCookies(cookie_dict=cookie_dict)



class ActionBardFallback(Action):
    def name(self) -> str:
        return "bard_call"
    
    def run(self, dispatcher, tracker, domain):
        request = " ".join(tracker.latest_message['text'].split()[1:])
        response = bard.get_answer(request)['content']
        dispatcher.utter_message(text=response)
        # return [SlotSet("request", request), SlotSet("response", response)]



# class ActionMotivate(Action):
#     def name(self):
#         return "action_motivate"

#     def run(self, dispatcher, tracker, domain):
#         quote = random.choice(motivational_quotes)
#         dispatcher.utter_message(quote)
