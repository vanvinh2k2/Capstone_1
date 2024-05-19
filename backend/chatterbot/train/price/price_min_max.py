from chatterbot.logic import LogicAdapter
from chatterbot.conversation import Statement
from search_word import search_word
from object_recognition import getName, getRole
from customer_word import remove_stopwords

class MyLogicAdapter(LogicAdapter):
    def __init__(self, chatbot, **kwargs):
        super().__init__(chatbot, **kwargs)

    def can_process(self, statement):
        words = ['dish', 'cost', 'expensive', 'cheap']
        words2 = ['dish', 'cost', 'low', 'high']
        words5 = ['dish', 'cost', "high"]
        words6 = ['dish', 'cost', 'expensive']
        words9 = ['dish', 'cost', "low"]
        words10 = ['dish', 'cost', "cheap"]
        
        statement = remove_stopwords(str(statement));
        data_set = statement
        check = search_word(words, data_set, True)
        self.cate = 0
        if(check == False):
            check = search_word(words2, data_set, True)
            self.cate = 0
        if(check == False):
            check = search_word(words5, data_set, True)
            self.cate = 1
        if(check == False):
            check = search_word(words6, data_set, True)
            self.cate = 1
        if(check == False):
            check = search_word(words9, data_set, True)
            self.cate = 2
        if(check == False):
            check = search_word(words10, data_set, True)
            self.cate = 2
        if check: return True
        return False

    def process(self, input_statement, additional_response_selection_parameters):
        name_dish = ""
        name_res = ""
        confidence = 0.91
        if len(getName(str(input_statement))) > 0:
            for name in getName(str(input_statement)):
                if(getRole(name, str(input_statement)) == False):
                    name_dish = name
                elif(getRole(name, str(input_statement)) == True):
                    name_res = name
                    
        if name_dish == "": selected_statement = Statement("Please tell me the name of detail dish?")
        else:
            if(name_res == ""): 
                if self.cate == 1: selected_statement = Statement("The price high 45$")
                if self.cate == 2: selected_statement = Statement("The price low 20$")
                if self.cate == 0: selected_statement = Statement("The price about 20$ to 45$")
            else: 
                if self.cate == 1: selected_statement = Statement("The price high 45$ of ABC restaurant")
                if self.cate == 2: selected_statement = Statement("The price low 20$ of ABC restaurant")
                if self.cate == 0: selected_statement = Statement("The price about 20$ to 45$ of ABC restaurant")

        selected_statement.confidence = confidence
        return selected_statement