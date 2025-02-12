//
//  LoadStructures.c
//  SearchAlgorithm
//
//  Created by Nolan Jones on 12/15/24.
//

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <stdint.h>
#include "../Header.h"


typedef short int_16;

const char path_to_dictionary[] = {"/Users/nolanjones/Documents/Codeing/HTML/Final/frontend/back_end/Dictionaries/dictionary.csv"};
const char path_to_random[] = {"/Users/nolanjones/Documents/Codeing/HTML/Final/frontend/back_end/Dictionaries/random.csv"};

struct node *word_tree = NULL;
struct node *type_tree = NULL;


unsigned long get_length(char *arr){
    int i = 0;
    while(arr[i] != '\0'){
        i++;
    }
    return i;
}

void build_dictionary(struct node **head, char *word, unsigned long length, char *definition, int *atomic_properties){
    struct node *branch;
    if(*head == NULL){
        branch = (struct node*) malloc(sizeof(struct node));
        for(int j = 0; j < dictionary_node_character_length; j++){
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
            for(int j = 0; j < dictionary_node_character_length; j++){
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
    //convert_word_back(word, length);
    //print_word(word, length);
    struct definition **location = NULL;
    struct definition *temp_branch = branch->def;
    if(temp_branch == NULL){
        location = &branch->def;
    }else{
        while(temp_branch->next != NULL){
            temp_branch = temp_branch->next;
        }
        location = &temp_branch->next;
    }
    struct definition *temp = (struct definition*) malloc(sizeof(struct definition));
    if(temp == NULL){
        printf("failed allocating memory for definition!\n");
        return;
    }
    temp->class = NULL;
    temp->definition = NULL;
    temp->next = NULL;
    int j = (int)(get_length(definition));
    //printf("%d, %s\n", j, definition);
    
    temp->length = j+1;
    temp->definition = (char*) malloc((j + 1) * sizeof(char));
    if(temp->definition == NULL){
        printf("failed to allocate memory for definition\n");
        return;
    }
    for(int i = 0; i < j; i++){
        if(definition[i] != '"'){
            temp->definition[i] = definition[i];
        }else{
            temp->definition[i] = ' ';
        }
    }
    temp->definition[j] = '\0';
    for(int i = 0; i < 17; i++){
        temp->atomic_property[i] = atomic_properties[i];
    }
    *location = temp;
    //printf("%s \n", branch->def->definition);
}
const char word_punctuation_conversion[] = {".,:;!?"};
int convert_word(char *arr, unsigned long length){
    int validation = 0;
    for(int i = 0; i < (int)length; i++){
        if(arr[i] > 96 && arr[i] < 123){
            arr[i] -= 97;
        }else if(arr[i] > 64 && arr[i] < 91){
            arr[i] -= 65;
        }else if(arr[i] == 45){ // -
            arr[i] = 26;
        }else if(arr[i] == 39){ // '
            arr[i] = 27;
        }else{
            int found = 0;
            for(int j = 0; j < 6; j++){
                if(arr[i] == word_punctuation_conversion[j]){
                    arr[i] = 28;
                    found = 1;
                    break;
                }
            }
            if(found == 0){
                validation = 1;
            }
        }
    }
    if(validation == 1){
        return 0;
    }
    return 1;
    //printf("done\n");
}

void convert_word_back(char *arr, unsigned long length){
    for(int i = 0; i < (int)length; i++){
        if(arr[i] > -1 && arr[i] < dictionary_node_character_length){
            arr[i] += 97;
        }else if(arr[i] == 26){
            arr[i] = 45;
        }else if(arr[i] == 27){
            arr[i] = '\'';
        }else{
            arr[i] = '.';
        }
    }
}

int search_word(struct node *head, char *word, unsigned long length){
    for(int i = 0; i < (int)length; i++){
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
    return 1;
}

char *return_definition(struct node *head, char *word, unsigned long length){
    for(unsigned long i = 0; i < length; i++){
        if(head->l[(int)word[i]] == NULL){
            return NULL;
        }
        head = head->l[(int)word[i]];
    }
    
    size_t full_length = 0;
    size_t current_loc = 0;
    struct definition *temp = head->def;
    while(temp != NULL){
        full_length = full_length + temp->length;
        temp = temp->next;;
    }
    printf("attempting\n");
    temp = head->def;
    char *arr = (char*) malloc((full_length + 1) * sizeof(char));
    while(temp != NULL){
        int def_loc = 0;
        while(temp->definition[def_loc] != '\0'){
            arr[current_loc] = temp->definition[def_loc];
            def_loc++;
            current_loc++;
        }
        arr[current_loc] = ' ';
        def_loc++;
        current_loc++;
        printf("%zu, %zu\n", current_loc, full_length+1);
        temp = temp->next;
    }
    arr[full_length+1] = '\0';
    return arr;
}

void load_dictionary(void){
    //load_types();
    
    int word_count = 0;
    int malformatted_words = 0;
    FILE *file_path;
    char line[1024];
    file_path = fopen(path_to_dictionary, "r+");
    if(file_path == NULL){
        printf("Failed to open File!\n");
        return;
    }
    while(fgets(line, sizeof(line), file_path) != NULL){
        int atomic_property[18] = {0};
        int_16 atomic = 0;
        char definition[1024];
        char pos[20];
        char word[50];
        sscanf(line, "%[^,],%[^,],%[^\n]", word, pos, definition);
        unsigned long length = get_length(word);
        //printf("%s\n", word);
        int validation = convert_word(word, length);
        if(validation == 1){
            //printf("%s\n", pos);
            get_substrings(pos, atomic_property);
            build_dictionary(&word_tree, word, length, definition, atomic_property);
            //printf("%d\n", word_count);
            word_count++;
        }else{
            convert_word_back(word, length);
            //printf("%d: %s: %s: %s\n", word_count+malformatted_words, word, pos, definition);
            malformatted_words++;
        }
        
    }
    
    printf("Total words: %d\n", word_count + malformatted_words);
    printf("Valid words: %d\n", word_count);
    printf("Malformatteed words: %d\n", malformatted_words);

}




/* type parse */

/* noun pronoun verb adverb adjective*/
char str1[] = {"a."}; // 0  - Adjective
char str2[] = {"i."}; // 1  - Interjection
char str3[] = {"j."}; // 2  - (Context-specific, e.g., Jargon or Journal)
char str4[] = {"l."}; // 3  - (Context-specific, e.g., Letter or Latin)
char str5[] = {"m."}; // 4  - (Could refer to Masculine)
char str6[] = {"n."}; // 5  - Noun
char str7[] = {"p."}; // 5  - Pronoun
char str8[] = {"t."}; // 6  - (Possibly Verb or Tense)
char str9[] = {"v."}; // 7  - Verb
char str10[] = {"dv."}; // 7  - Deverbal (Verb-related)
char str11[] = {"ng."}; // 7  - (Possibly Gerund, Verb-related)
char str12[] = {"pl."}; // 17 - Plural
char str13[] = {"pr."}; // 12 - Preposition
char str14[] = {"pp."}; // 7  - Past participle (Verb-related)
char str15[] = {"vb."}; // 7  - Verb
char str16[] = {"adj."}; // 0  - Adjective
char str17[] = {"adv."}; // 8  - Adverb
char str18[] = {"ads."}; // 0  - (Possibly Adjective-related)
char str19[] = {"fem."}; // 9  - Feminine (Gender-related)
char str20[] = {"imp."}; // 10 - Imperative (Verb-related)
char str21[] = {"conj."}; // 11 - Conjunction
char str22[] = {"masc."}; // 9  - Masculine (Gender-related)
char str23[] = {"prep."}; // 12 - Preposition
char str24[] = {"pref."}; // 13 - Prefix
char str25[] = {"pron."}; // 5  - Pronoun
char str26[] = {"sing."}; // 5  - Singular (Noun-related)
char str27[] = {"super."}; // 0  - Superlative (Adjective-related)
char str28[] = {"interj."}; // 14 - Interjection
char str29[] = {"compar."}; // 0  - Comparative (Adjective-related)
char str30[] = {"superl."}; // 0  - Superlative (Adjective-related)
char str31[] = {"3d pers."}; // 15 - Third person (Person-related)
char str32[] = {"3d sing."}; // 15 - Third person singular (Person-related)
char str33[] = {"ambassade."}; // 16 - (Context-specific, likely Ambassador or Embassy)

char *word_subString[] = { str1, str2, str3, str4, str5, str6, str7, str8, str9, str10, str11, str12, str13, str14, str15, str16, str17, str18, str19, str20, str21, str22, str23, str24, str25, str26, str27, str28, str29, str30, str31, str32, str33 };
char *type_subString = NULL;
int type_subString_toConvert[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33};
int length_subString[] = {2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 7, 7, 7, 8, 8, 10};
int location_in_atomic[] = { 0, 1, 2, 3, 4, 5, 5, 6, 7, 7, 7, 17, 12, 7, 7, 0, 8, 0, 9, 10, 11, 9, 12, 13, 5, 5, 0, 14, 0, 0, 15, 15, 16};
char wskldj = '\n';

void load_types(void){
    type_subString = (char*) malloc(18 * sizeof(char));
    if(type_subString == NULL){
        printf("failed to allocate space for type_subString\n");
        return;
    }
    for(int i = 0; i < 33; i++){
        type_subString[i] = type_subString_toConvert[i];
    }
}

int compare_string(char *string){
    for(int i = 0; i < 33; i++){ //test each substrings
        int j = 0;
        bool mismatch = 0;
        while(mismatch == 0 && j < length_subString[i]){ // test characters
            if(string[j] != word_subString[i][j]){
                mismatch++; // if mismatch
                break;
            }
            j++; //increment
        }
        if(mismatch != 1){ //if found return value
            //printf("%d, %d\n", location_in_atomic[i], i);
            return location_in_atomic[i];
        }
    }
    //printf("%s\n", string);
    return -1;
}

void get_substrings(char *string, int *found){
    
    int end = 0;
    int start = 0;
    while(string[start] != 0){
        while(string[start] == ' ' || string[start] == '&' || string[start] == '/' || string[start] == 34){
            start++;
        }
        end = start;
        //discover substing
        while(string[end] != '.' && string[end] != 0){
            end++;
        }
        
        //copy and evaluate substring
        char *subString = (char*) malloc(((end - start)+1) * sizeof(char));
        for(int j = 0; j < end - start+1; j++){
            subString[j] = string[start + j];
        }
        subString[end - start + 2] = '\n';
        //perform string comparison
        //printf("comparing, %s\n", subString);
        int type = compare_string(subString);
        if(type != -1){
            found[type] += 1;
        }
        start = end + 1;
    }
}
