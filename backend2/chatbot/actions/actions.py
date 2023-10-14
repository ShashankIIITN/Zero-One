import rasa.shared.utils.io as io
from rasa_sdk.events import SlotSet
from bardapi import BardCookies
from rasa_sdk import Action

cookie_dict = {
    
    "__Secure-1PSIDTS": "bard api key",
    "__Secure-1PSID": "bard api key"

}


bard = BardCookies(cookie_dict=cookie_dict)



from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionBardFallback(Action):
    def name(self) -> str:
        return "bard_call"
    
    def run(self, dispatcher, tracker, domain):
        request = " ".join(tracker.latest_message['text'].split()[1:])
        response = bard.get_answer(request)['content']
        dispatcher.utter_message(text=response)
        return [SlotSet("request", request), SlotSet("response", response)]


# import random
# class ActionMotivation(Action):
#     def name(self) -> Text:
#         return "action_motivation"

#     def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#         motivational_messages = domain['responses']['utter_motivation']
#         selected_message = random.choice(motivational_messages)

#         dispatcher.utter_message(text=selected_message['text'])

#         return []
