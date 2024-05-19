from chatterbot.logic import LogicAdapter
from chatterbot.conversation import Statement
from object_recognition import getName, getRole
from customer_word import remove_stopwords
from search_word import search_word

class MyLogicAdapter(LogicAdapter):
    def __init__(self, chatbot, **kwargs):
        super().__init__(chatbot, **kwargs)

    def can_process(self, statement):
        words = ['dish', 'cost', "much", 'restaurant']
        words2 = ['dish', 'cost', "find", 'restaurant']
        words3 = ['dish', 'cost', "know", 'restaurant']
        words4 = ['dish', 'cost', 'restaurant']
        statement = remove_stopwords(str(statement));
        data_set = statement
        check = search_word(words, data_set, True)
        if(check == False):
            check = search_word(words2, data_set, True)
        if(check == False):
            check = search_word(words3, data_set, True)
        if(check == False):
            check = search_word(words4, data_set, True)
            # print(check, "ko")
        if check: return True
        return False

    def process(self, input_statement, additional_response_selection_parameters):
        name_dish = ""
        name_res = ""
        confidence = 0.9
        # print(getName(str(input_statement)));
        if len(getName(str(input_statement))) > 0:
            for name in getName(str(input_statement)):
                if(getRole(name, str(input_statement)) == False):
                    name_dish = name
                elif (getRole(name, str(input_statement)) == True):
                    name_res = name
        
        if name_res == "": selected_statement = Statement("Please tell me the name of that restaurant or dish?")
        elif name_res != "" and name_dish == "" : selected_statement = Statement("List name dish  of that restaurant with price?")
        else: selected_statement = Statement("Dish ABC of restaurant XY is 20$")

        selected_statement.confidence = confidence
        return selected_statement