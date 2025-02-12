//
//  Dictionary.c
//  CS 2413 Lab
//
//  Created by Nolan Jones on 11/15/24.
//

#include <stdio.h>
#include <stdlib.h>
#include <strings.h>
#include </Users/nolanjones/anaconda3/envs/pyodidejs19/include/node/node_api.h>

const char path_to_dictionary[] = {"/Users/nolanjones/Documents/Codeing/HTML/Final/frontend/back_end/Dictionaries/dictionary.csv"};
const char path_to_random[] = {"/Users/nolanjones/Documents/Codeing/HTML/Final/frontend/back_end/Dictionaries/random.csv"};

void convert_back(char *arr, unsigned long length);

struct definition{
    int length;
    char *class; //definition in math... in science... ect.
    char *definition; //the full definition;
    struct definition *next;
};

struct node{
    struct node *l[27];
    int num;
    struct definition *def; //array of differing definitions by subject;
} *word_tree = NULL;



unsigned long get_length(char *arr){
    int i = 0;
    while(arr[i] != '\0'){
        i++;
    }
    return i;
}

void insert_word(struct node **head, char *word, unsigned long length, char *definition){
    struct node *branch;
    if(*head == NULL){
        branch = (struct node*) malloc(sizeof(struct node));
        for(int j = 0; j < 27; j++){
            branch->l[j] = NULL;
        }
        //printf("created root\n");
        *head = branch;
    }
    
    branch = *head;
    for(unsigned long i = 0; i < length; i++){
        if(branch->l[(int)word[i]] == NULL){
            branch->l[(int)word[i]] = (struct node*) malloc(sizeof(struct node));
            //previous = branch;
            branch = branch->l[(int)word[i]];
            for(int j = 0; j < 27; j++){
                branch->l[j] = NULL;
            }
            branch->def = NULL;
            branch->num = 0;
            //printf("createing and traversing node for letter %c\n", word[i] + 97);
        }else if(branch->l[(int)word[i]] != NULL){
            //previous = branch;
            branch = branch->l[(int)word[i]];
            //printf("traversing node for %c\n", word[i] + 97);
        }
    }
    
    struct definition **location;
    struct definition *temp_branch = branch->def;
    //find address to place new node at;
    if(temp_branch == NULL){
        location = &branch->def;
    }else{
        while(temp_branch->next != NULL){
            temp_branch = temp_branch->next;
        }
        location = &temp_branch->next;
    }
    //create node for new definition
    struct definition *temp = (struct definition*) malloc(sizeof(struct definition));
    if(temp == NULL){
        printf("failed allocating memory for definition!\n");
        return;
    }
    //initialize everything to NULL
    temp->class = NULL;
    temp->definition = NULL;
    temp->next = NULL;

    //get and insert length of definition
    int j = (int)get_length(definition);
    //printf("%d, %s\n", j, definition);
    temp->length = j+1;
    //allocate memory for definition
    temp->definition = (char*) malloc((j + 1) * sizeof(char));
    if(temp->definition == NULL){
        printf("failed to allocate memory for definition\n");
        return;
    }
    //fill definition space and remove '"' for future json formatting;
    for(int i = 0; i < j; i++){
        if(definition[i] != '"'){
            temp->definition[i] = definition[i];
        }else{
            temp->definition[i] = ' ';
        }
    }
    temp->definition[j] = '\0';
    //place new node in location;
    *location = temp;
    //printf("%s \n", branch->def->definition);
}

void convert_word(char *arr, unsigned long length){
    for(unsigned long i = 0; i < length; i++){
        if(arr[i] > 96 && arr[i] < 123){ //convert lowercase
            arr[i] -= 97;
        }else if(arr[i] > 64 && arr[i] < 91){ //convert upprcase
            arr[i] -= 65;
        }else{ // replace non-alphabetical characters as 27
            arr[i] = 27;
        }
    }
    //printf("done\n");
}

void convert_back(char *arr, unsigned long length){
    for(unsigned long i = 0; i < length; i++){
        if(arr[i] > -1 && arr[i] < 27){ // convert to lowercase
            arr[i] += 97;
        }else if(arr[i] == 27){ //convert to space
            arr[i] = ' ';
        }
    }
}

void print_word(char *arr, unsigned long length){
    for(unsigned long i = 0; i < length; i++){
        if(arr[i] < 27){ //display letter if in integer form
            printf("%c ", arr[i] + 97);
        }else if(arr[i] < 123 && arr[i] > 96){ //display letter if in character form
            printf("%c ", arr[i]);
        }else{ //display anything non alphabetical as space
            printf(" ");
        }
    }
    printf("\n");
}

int search_word(struct node *head, char *word, unsigned long length){
    for(unsigned long i = 0; i < length; i++){
        if(head->l[(int)word[i]] == NULL){
            return 0;
        }
        head = head->l[(int)word[i]];
    }
    struct definition *temp = head->def;
    while(temp != NULL){
        printf("%s \n", temp->definition);
        temp = temp->next;
        printf("\n");
    }
    fflush(stdout);
    return 1;
}

char *return_definition(struct node *head, char *word, unsigned long length){
   for(unsigned long i = 0; i < length; i++){
        if(head->l[(int)word[i]] == NULL){
            return NULL;
        }
        head = head->l[(int)word[i]];
    }
    
    size_t num = 0;
    size_t full_length = 0;
    size_t current_loc = 0;
    struct definition *temp = head->def;
    while(temp != NULL){
        //printf("%s \n", temp->definition);
        full_length = full_length + temp->length;
        //printf("%zu\n", full_length);
        //printf("%d\n", temp->length);
        length++;
        temp = temp->next;
    }
    //fflush(stdout);
    //printf("attempting\n");


    temp = head->def;
    //extra json chars per def// all definitions space // terminating char // first and last bracket;
    if(num == 0){
        num = 1;
    }
    char * arr = (char*) malloc( (num) + (full_length + 1) * sizeof(char));
    
    while(temp != NULL){

        int def_loc = 0;

        while(temp->definition[def_loc] != '\0'){
            arr[current_loc] = temp->definition[def_loc];
            def_loc++;
            current_loc++;
        }
        arr[current_loc] = '\n';
        def_loc++;
        current_loc++;
        temp = temp->next;

        //printf("%zu, %zu\n", current_loc, full_length+1);
        //fflush(stdout);
    }
    arr[current_loc-1] = '\0';
    return arr;
}

void read_dictionary(struct node **word_tree){
    
    FILE *file_path;
    char line[1024];
    char definition[1024];
    char pos[10];
    char word[50];
    
    file_path = fopen(path_to_dictionary, "r+");
    if(file_path == NULL){
        printf("Failed to open File!\n");
        return;
    }
    
    while(fgets(line, sizeof(line), file_path) != NULL){
        sscanf(line, "%[^,],%[^,],%[^\n]", word, pos, definition);
        unsigned long length = get_length(word);
        //printf("%s\n", word);
        convert_word(word, length);
        insert_word(word_tree, word, length, definition);
        
    }

}

int drop_down(){
    
    return 1;
}




napi_value initialize_dictionary(napi_env env, napi_callback_info info){
    if(word_tree == NULL){
        read_dictionary(&word_tree);
        fflush(stdout);
    }
    
    napi_value undefined;
    napi_get_undefined(env, &undefined);
    return undefined;
}

napi_value search(napi_env env, napi_callback_info info){
    size_t argc = 1;
    napi_value argv[1];
    napi_get_cb_info(env, info, &argc, argv, NULL, NULL);
    
    if(argc < 1){
        napi_throw_error(env, "Missing Argument", NULL);
        return NULL;
    }
    
    napi_valuetype valueType;
    napi_typeof(env, argv[0], &valueType);
    
    if(valueType != napi_string){
        napi_throw_type_error(env, "Argument must be a string", NULL);
        return NULL;
    }
    
    size_t stringLength;
    napi_get_value_string_utf8(env, argv[0], NULL, 0, &stringLength); //get length of string from JS
    char *buffer = (char*) malloc((stringLength + 1) * sizeof(char));
    buffer[stringLength] = '\0';
    napi_get_value_string_utf8(env, argv[0], buffer, stringLength + 1, NULL); //get string from JS
    
    convert_word(buffer, stringLength);
    char *temp = return_definition(word_tree, buffer, stringLength);
    //printf("%s", temp);
    //fflush(stdout);
    size_t defs_length = 0;
    if(temp != NULL){
        while(temp[defs_length] != '\0'){
            defs_length++;
        }
    }

    /*
    char random[] = {"Hello from the back end with C"};
    size_t len = sizeof(random)/sizeof(random[0]) - 1;*/
    napi_value result;
    napi_create_string_utf8(env, buffer, stringLength, &result);
    napi_create_string_utf8(env, temp, defs_length, &result);
    free(temp);
    
    return result;
}


napi_value Add(napi_env env, napi_callback_info info) {
    size_t argc = 2;  // Declare argc for the number of arguments expected
    napi_value args[2];
    napi_get_cb_info(env, info, &argc, args, NULL, NULL);

    double arg0, arg1, result;
    napi_get_value_double(env, args[0], &arg0);
    napi_get_value_double(env, args[1], &arg1);

    result = arg0 + arg1;

    napi_value return_value;
    napi_create_double(env, result, &return_value);

    return return_value;
}

napi_value Init(napi_env env, napi_value exports) {
    napi_value fn, searchFn, noParamsFn;
    napi_create_function(env, NULL, 0, Add, NULL, &fn);
    napi_create_function(env, NULL, 0, search, NULL, &searchFn);
    napi_create_function(env, NULL, 0, initialize_dictionary, NULL, &noParamsFn);

    //use napi_set_named_property to add the function to the exports
    napi_set_named_property(env, exports, "add", fn);
    napi_set_named_property(env, exports, "search", searchFn);
    napi_set_named_property(env, exports, "initialize_dictionary", noParamsFn);
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)

int main(int argc, const char * argv[]){
    return 0;
}
