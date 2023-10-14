import rasa.shared.utils.io as io
from rasa_sdk.events import SlotSet
from bardapi import BardCookies
from rasa_sdk import Action

cookie_dict = {
    
    "__Secure-1PSIDTS": "{Api key Here}",
    "__Secure-1PSID": "{Api key here}"

}


bard = BardCookies(cookie_dict=cookie_dict)



class ActionBardFallback(Action):
    def name(self) -> str:
        return "bard_call"
    
    def run(self, dispatcher, tracker, domain):
        request = " ".join(tracker.latest_message['text'].split()[1:])
        response = bard.get_answer(request)['content']
        dispatcher.utter_message(text=response)
        return [SlotSet("request", request), SlotSet("response", response)]


# import random

# motivational_quotes = [
#     "Believe you can and you're halfway there. -Theodore Roosevelt",
#     "Don't watch the clock; do what it does. Keep going. -Sam Levenson",
#     # Add more quotes here
# ]

# class ActionMotivate(Action):
#     def name(self):
#         return "action_motivate"

#     def run(self, dispatcher, tracker, domain):
#         quote = random.choice(motivational_quotes)
#         dispatcher.utter_message(quote)
#         return [SlotSet("request", "request"), SlotSet("response", quote)]