//
//  main.c
//  SearchAlgorithm
//
//  Created by Nolan Jones on 12/15/24.
//
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include "../Header.h"



void insert_word(struct sentence_info **head, struct word *insert){
    printf("Insert_word: %s\n", insert->word);
    struct sentence_info *temp_head = *head;
    struct word *temp_word = temp_head->sentence_head;
    
    if(temp_word == NULL){
        temp_head->sentence_head = insert;
        return;
    }
    while(temp_word->next != NULL){
        temp_word = temp_word->next;
    }
    temp_word->next = insert;
}

void build_word(struct sentence_info **head, struct word **build, char *search_query, int distribution[19], int type){
    struct word *insert = (struct word*) malloc(sizeof(struct word));
    if(insert == NULL){
        printf("failed to allocate space for node!\n");
        return;
    }
    insert->next = NULL;
    insert->word = NULL;
    insert->definition_addr = NULL;
    
    int length = distribution[1] - distribution[0];
    insert->word = (char*) calloc((length + 1), sizeof(char));
    if(insert->word == NULL){
        printf("failed to allocate space for word");
        return;
    }
    for(int i = 0; i < length; i++){
        insert->word[i] = search_query[distribution[0] + i];
        
    }
    insert->word[length + 1] = '\0';
    printf("Build_word: %s\n", insert->word);
    
    for(int i = 0; i < 17; i++){
        (insert->word_distribution[i]) = (distribution[ i + 2 ]);
        //printf("%d ", insert->word_distribution[i]);
    }
    //printf("\n");
    insert->word_length = length;
    insert->word_type = type;
    
    *build = insert;
}

const char logical_characters[] = {"()*+\\/<=>^|#@[]{}`"};
int get_letter_type(char c){
    if((c >= 65 && c <= 90) || (c >= 97 && c <= 122)){
        return 0;
    }else if(c >= 48 && c <= 57){
        return 1;
    }else if(c == '-'){
        return 2;
    }else if(c == '\''){
        return 3;
    }else if(c == ','){
        return 4;
    }else if(c == ':'){
        return 5;
    }else if(c == ';'){
        return 6;
    }else if(c == '.'){
        return 7;
    }else if(c == '?'){
        return 8;
    }else if(c == '!'){
        return 9;
    }else if(c == '\"'){
        return 10;
    }else if(c == '%'){
        return 11;
    }else if(c == '$'){
        return 12;
    }else if(c == ' '){
        return 13;
    }else if(c == ' '){
        return 14;
    }
    for(int i = 0; i < 18; i++){
        if(c == logical_characters[i]){
            return 15;
        }
    }
    return 16;
}

int check_distribution(int distribution[19]){
    int length = distribution[1] - distribution[0];
    int word = distribution[2];
    for(int i = 4; i < 12; i++){
        word += distribution[i];
    }
    int number = distribution[3] + distribution[4];
    for(int i = 6; i < 15; i++){
        number += distribution[i];
    }
    int logical = 0;
    int special = 0;
    //printf("Length: %d\n", length);
    //printf("Word: %d\n", word);
    //printf("Number: %d\n", number);
    if(word == length){
        return 0;
    }else if(number == length){
        return 2;
    }else if(logical == length){
        return 3;
    }else if(special == length){
        return 4;
    }else{
        return 7;
    }
    //evaluate for differences in word;
    return -1;
}

int get_next_word(char *search_query, int *start, int *end, int distribution[19]){
    printf("getting next word\n");
    int i = *start;
    if(search_query[*start] == '\"'){
        i++;
        while(search_query[i] != '\"' && search_query[i] != '\0'){
            //printf("%c", search_query[i]);
            distribution[get_letter_type(search_query[i])+2] += 1;
            (*end)++;
            i++;
        }
        if(search_query[i] != '\0'){
            (*end) += 2;
        }
        //printf("\n");
        return 1;
    }else{
        while(search_query[i] != ' ' && search_query[i] != '\0'){
            //printf("%c", search_query[i]);
            distribution[get_letter_type(search_query[i])+2] += 1;
            (*end)++;
            i++;
        }
        //printf("\n");
        return check_distribution(distribution);
    }
    
    return -1;
}

void merge_distribution(int distribution[3][19]){
    for(int i = 1; i < 3; i++){
        for(int j = 2; j < 16; j++){
            distribution[0][j] += distribution[i][j];
            distribution[i][j] = 0;
        }
    }
    
    for(int i = 1; i < 2; i++){
        if(distribution[i][0] < distribution[0][0]){
            distribution[0][0] = distribution[i][0];
        }
        if(distribution[i][1] > distribution[0][1]){
            distribution[0][1] = distribution[i][1];
        }
    }
}
void extend_distribution(int distribution[3][19], int current_word){
    distribution[current_word+1][0] = distribution[current_word][1] + 1;
    distribution[current_word+1][1] = distribution[current_word][1] + 1;
}
void reset_distribution(int distribution[3][19]){
    for(int i = 0; i < 3; i++){
        for(int j = 2; j < 16; j++){
            distribution[i][j] = 0;
        }
    }
    for(int i = 0; i < 3; i++){
        if(distribution[i][1] != 0){
            distribution[i][0] = 0;
            distribution[0][0] = distribution[i][1] + 1;
            distribution[i][1] = 0;
        }
    }
    distribution[0][1] = distribution[0][0];
}

void build_sentence(struct sentence_info **head, char *search_query){
    int total_words = 0;
    int current_word = 0;
    int types[3] = {-1};
    //0 = start, 1 = end,
    int distribution[3][19] = {0};
    while(search_query[distribution[current_word][0]] != '\0'){
        while(search_query[distribution[current_word][0]] == ' '){
            search_query[distribution[current_word][0]]++;
            //printf("Skipping space\n");
        }
        if(search_query[distribution[current_word][0]] == '\0'){
            //printf("found end\n");
            break;
        }
        types[current_word] = get_next_word(search_query, &distribution[current_word][0], &distribution[current_word][1], distribution[current_word]);
        //printf("next: %d, %d\n", types[current_word], current_word);
        
        struct word *new = NULL;
        struct word *new_1 = NULL;
        struct word *new_2 = NULL;
        //display_distribution(distribution, current_word);
        if(current_word == 0){
            if(types[current_word] == 1 || types[current_word] == 0){
                build_word(head, &new, search_query, distribution[current_word], types[current_word]);
                insert_word(head, new);
                reset_distribution(distribution);
                total_words++;
            }else{
                extend_distribution(distribution, current_word);
                current_word++;
            }
        }else if(current_word == 1){
            
            if(types[current_word] >= 2){
                merge_distribution(distribution);
                extend_distribution(distribution, current_word-1);
            }else if(types[current_word] == 0){
                extend_distribution(distribution, current_word);
                current_word++;
            }else if(types[current_word] == 1){
                build_word(head, &new, search_query, distribution[current_word-1], types[current_word-1]);
                insert_word(head, new);
                build_word(head, &new_1, search_query, distribution[current_word], types[current_word]);
                insert_word(head, new_1);
                current_word = 0;
                total_words += 2;
                reset_distribution(distribution);
            }
        }else if(current_word == 2){
            
            if(types[current_word] >= 2 ){
                merge_distribution(distribution);
                extend_distribution(distribution, current_word-1);
                current_word = 1;
            }else{
                //insert each individually
                build_word(head, &new, search_query, distribution[current_word-2], types[current_word-2]);
                insert_word(head, new);
                build_word(head, &new_1, search_query, distribution[current_word-1], types[current_word-1]);
                insert_word(head, new_1);
                build_word(head, &new_2, search_query, distribution[current_word], types[current_word]);
                insert_word(head, new_2);
                reset_distribution(distribution);
                current_word = 0;
                total_words += 3;
            }
        }
        /*
        display_distribution(distribution, current_word);
        build_word(head, &new, search_query, distribution[current_word], type);
        printf("Build_sentence: %s\n", new->word);
        insert_word(head, new);
        reset_distribution(distribution);
        total_words++;
        */
    }
    struct word *new = NULL;
    if(current_word != 0 && types[current_word] >= 2){
        merge_distribution(distribution);
        build_word(head, &new, search_query, distribution[0], types[0]);
        insert_word(head, new);
        reset_distribution(distribution);
        total_words++;
    }
    struct sentence_info *temp_head = *head;
    temp_head->length = total_words;
    
}

struct definition **get_definition_pointer(struct node *word_tree, char *word, int length){
    struct node *search = word_tree;
    int i = 0;
    while(i != length){
        printf("%c", word[i] + 97);
        if(word[i] > 29 || search->l[(int)word[i]] == NULL){
            return NULL;
        }
        search = search->l[(int)word[i]];
        i++;
    }
    printf("\n");
    //printf("\ndef: %s\n", search->def->definition);
    return &search->def;
}

void link_definitions(struct word *sentence_head){
    struct word *temp = sentence_head;
    while(temp != NULL){
        if(temp->word_type == 0){
            char *word = (char*) malloc( (temp->word_length) * sizeof(char) );
            for(int i = 0; i < temp->word_length; i++){
                word[i] = temp->word[i];
            }
            word[temp->word_length] = '\0';
            convert_word(word, (unsigned long)temp->word_length);
            temp->definition_addr = get_definition_pointer(word_tree, word, temp->word_length);
        }
        temp = temp->next;
    }
}

int main(int argc, const char * argv[]){
    
    bool quit = 0;
    int choice;
    
    size_t length;
    char search_query[1024];
    
    struct sentence_info *data_structure = (struct sentence_info*) malloc(sizeof(struct sentence_info));
    //struct node *word_tree = NULL;
    
    do{
        printf("please select one:\n");
        printf("1. Search\n");
        printf("2. Load Dictionary\n");
        printf("3. Retrieve definitions\n");
        printf("4. Create types\n");
        printf("0. Quit\n");
        scanf("%d[^\n]", &choice);
        scanf("%*c");
        
        switch(choice){
            case 1:
            
                printf("Please type in your query:\n");
                scanf("%[^\n]", search_query);
                scanf("%*c");
                
                length = get_query_length(search_query);
                printf("\nLength: %lu\n", length);
                printf("Query: %s\n\n", search_query);
                
                build_sentence(&data_structure, search_query);
                printf("full sentence\n\n");
                display_sentence_structure(data_structure);
                
            break;
           
            case 2:
                load_dictionary();
            break;
            
            case 3:
                link_definitions(data_structure->sentence_head);
                print_linked_definitions(data_structure->sentence_head);
            break;
            
            case 4:
                //load_types();
                
            break;
            default:
                quit = 1;
            
            break;
            
        }
    
        
        
    }while(quit == 0);
    
    return 0;
}
