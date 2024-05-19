from chatterbot.logic import LogicAdapter
from chatterbot.conversation import Statement
from search_word import search_word
from object_recognition import getName, getRole
from customer_word import remove_stopwords

class MyLogicAdapter(LogicAdapter):
    def __init__(self, chatbot, **kwargs):
        super().__init__(chatbot, **kwargs)

    def can_process(self, statement):
        words = ['dish', 'cost', "much"]
        words2 = ['dish', 'cost', "find"]
        words3 = ['dish', 'cost', "know"]
        words4 = ['dish', 'cost']
        statement = remove_stopwords(str(statement));
        data_set = statement
        check = search_word(words, data_set, True)
        if(check == False):
            check = search_word(words2, data_set, True)
        if(check == False):
            check = search_word(words3, data_set, True)
        if(check == False):
            check = search_word(words4, data_set, True)
        if check: return True
        return False

    def process(self, input_statement, additional_response_selection_parameters):
        name_dish = ""
        confidence = 0.8
        if len(getName(str(input_statement))) > 0:
            for name in getName(str(input_statement)):
                if(getRole(name, str(input_statement)) == False):
                    name_dish = name
                    break
        
        if name_dish == "": selected_statement = Statement("Please tell me the name of that dish?")
        else: selected_statement = Statement("Dish ABC is 20$")
        selected_statement.confidence = confidence
        return selected_statement