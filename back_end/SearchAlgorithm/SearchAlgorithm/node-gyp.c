//
//  node-gyp.c
//  SearchAlgorithm
//
//  Created by Nolan Jones on 12/26/24.
//

#include <stdio.h>
#include "../Header.h"
#include <stdlib.h>
#include </Users/nolanjones/anaconda3/envs/pyodidejs19/include/node/node_api.h>
#include <assert.h>


napi_value create_return_JSON(napi_env env, napi_callback_info info){
    
    //controls to recieve string from JS with proper checks;
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
    
    //actual reception of data
    size_t stringLength;
    napi_get_value_string_utf8(env, argv[0], NULL, 0, &stringLength); //get length of string from JS
    char *search_query = (char*) malloc((stringLength + 1) * sizeof(char));
    search_query[stringLength] = '\0';
    napi_get_value_string_utf8(env, argv[0], search_query, stringLength + 1, NULL); //get string from JS
    
    printf("%s\n", search_query);
    fflush(stdout);
    
    
    //perform sentence search operations in C
    struct sentence_info *sentence = (struct sentence_info*) malloc(sizeof(struct sentence_info));
    build_sentence(&sentence, search_query);
    link_definitions(sentence->sentence_head);
    //print_linked_definitions(sentence->sentence_head);
    fflush(stdout);
    
    
    const int sentence_length = sentence->sc_len;
    struct word *temp = sentence->sentence_head;
    print_linked_definitions(sentence->sentence_head);
    fflush(stdout);
    
    //napi controls and values for Java Script Object Node creation
    napi_status status;
    napi_value returnObject = NULL;
    napi_value wordObject = NULL;
    napi_value defObject = NULL;
    napi_value wordKey, wordValue, defArray, defKey, defKey_2, defValue, atomicArray, atomicKey, atomicValue;
    
    status = napi_create_array(env, &returnObject);
    assert(status == napi_ok);
    int i = 0;
    while(temp != NULL){
        //prepare variables
        //create {"word", "result_word"}
        if(temp->word_type == 0 && temp->definition_addr != NULL){
            status = napi_create_object(env, &wordObject);//build
            assert(status == napi_ok);
            
            status = napi_create_string_utf8(env, "word", NAPI_AUTO_LENGTH, &wordKey);
            assert(status == napi_ok);
            status = napi_create_string_utf8(env, temp->word, NAPI_AUTO_LENGTH, &wordValue);
            assert(status == napi_ok);
            status = napi_set_property(env, wordObject, wordKey, wordValue);
            assert(status == napi_ok);
            
            status = napi_create_string_utf8(env, "definition", NAPI_AUTO_LENGTH, &defKey);
            assert(status == napi_ok);
            status = napi_create_array(env, &defArray);
            assert(status == napi_ok);
            
            struct definition *temp_def = *temp->definition_addr;
            int j = 0;
            while(temp_def != NULL){
                
                status = napi_create_object(env, &defObject);
                assert(status == napi_ok);
                //create {"definition" : ["result_def1", "result_def2"]}
                status = napi_create_string_utf8(env, "def", NAPI_AUTO_LENGTH, &defKey_2);
                assert(status == napi_ok);
                status = napi_create_string_utf8(env, temp_def->definition, NAPI_AUTO_LENGTH, &defValue);
                assert(status == napi_ok);
                status = napi_set_property(env, defObject, defKey_2, defValue);
                assert(status == napi_ok);
                
                status = napi_create_string_utf8(env, "atomicProperty", NAPI_AUTO_LENGTH, &atomicKey);
                assert(status == napi_ok);
                status = napi_create_array(env, &atomicArray);
                assert(status == napi_ok);
                
                int current_location = 0;
                for(int k = 0; k < 18; k++){
                    if(temp_def->atomic_property[k] > 0){
                        status = napi_create_string_utf8(env, atomic_strings[k], NAPI_AUTO_LENGTH, &atomicValue);
                        assert(status == napi_ok);
                        status = napi_set_element(env, atomicArray, current_location, atomicValue);
                        assert(status == napi_ok);
                        current_location++;
                    }
                }
                
                status = napi_set_property(env, defObject, atomicKey, atomicArray);
                status = napi_set_element(env, defArray, j, defObject);
                assert(status == napi_ok);
                j++;
                temp_def = temp_def->next;
            }
            //Add the Key, value pair to the object;
            status = napi_set_property(env, wordObject, defKey, defArray);
            status = napi_set_element(env, returnObject, i, wordObject);
            assert(status == napi_ok);
            
            i++;
        }
        temp = temp->next;
    }
    
    return returnObject;
}

napi_value initialize_dictionary(napi_env env, napi_callback_info info){
    if(word_tree == NULL){
        load_dictionary();
        fflush(stdout);
    }
    
    napi_value undefined;
    napi_get_undefined(env, &undefined);
    return undefined;
}

napi_value Init(napi_env env, napi_value exports) {
    //for the initionalize dictionary function
    napi_value noParamsFn;
    napi_create_function(env, NULL, 0, initialize_dictionary, NULL, &noParamsFn);
    //use napi_set_named_property to add the function to the exports
    napi_set_named_property(env, exports, "initialize_dictionary", noParamsFn);
    
    
    //for the search_function
    napi_value searchFn;
    napi_status status;
    status = napi_create_function(env, NULL, 0, create_return_JSON, NULL, &searchFn);
    assert(status == napi_ok);
    status = napi_set_named_property(env, exports, "create_return_JSON", searchFn);
    assert(status == napi_ok);
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
