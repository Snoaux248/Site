//
//  display.c
//  SearchAlgorithm
//
//  Created by Nolan Jones on 12/24/24.
//

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include "../Header.h"

void display_word(struct word *temp){
    if(temp != NULL){
        printf("\n");
        printf("Length: %d\n", temp->word_length);
        printf("Word: %s\n", temp->word);
        printf("character distribution: ");
        for(int i = 0; i < 17; i++){
            printf("%d ", temp->word_distribution[i]);
        }
        printf("\n");
        printf("\n");
        
        temp = temp->next;
    }
}

void display_distribution(int distribution[3][19], int current_word){
    for(int i = 0; i < 3; i++){
        for(int j = 0; j < 19; j++){
            printf("%d ", distribution[i][j]);
        }
        printf("\n");
    }
}

void display_sentence_structure(struct sentence_info *head){
    struct word *temp = head->sentence_head;
    if(temp == NULL){
        printf("no sentence data\n");
        return;
    }
    while(temp != NULL){
        printf("\n");
        printf("Length: %d\n", temp->word_length);
        printf("Word: %s\n", temp->word);
        printf("character distribution: ");
        for(int i = 2; i < 19; i++){
            printf("%d ", temp->word_distribution[i]);
        }
        printf("\n");
        printf("Type: %d\n", temp->word_type);
        printf("\n");
        
        temp = temp->next;
    }
}

size_t get_query_length(char *query){
    size_t length = 0;
    while(*query != '\0'){
        length++;
        query++;
    }
    return length;
}





void print_word(char *arr, unsigned long length){
    for(int i = 0; i < (int)length; i++){
        if(arr[i] < dictionary_node_character_length){
            printf("%c ", arr[i] + 97);
        }else if(arr[i] < 123 && arr[i] > 96){
            printf("%c", arr[i]);
        }else{
            printf(" ");
        }
    }
    printf("\n");
}

char atomic0[] =  {"Adjective"};
char atomic1[] =  {"Interjection"};
char atomic2[] =  {"(Context-specific, e.g., Jargon or Journal)"};
char atomic3[] =  {"(Context-specific, e.g., Letter or Latin)"};
char atomic4[] =  {"Masculine"};
char atomic5[] =  {"Noun"};
char atomic6[] =  {"Tense"};
char atomic7[] =  {"Verb"};
char atomic8[] =  {"Adverb"};
char atomic9[] =  {"Feminine Gender-related)"};
char atomic10[] = {"Imperative (Verb-related)"};
char atomic11[] = {"Conjunction"};
char atomic12[] = {"Preposition"};
char atomic13[] = {"Prefix"};
char atomic14[] = {"Interjection"};
char atomic15[] = {"Third person"};
char atomic16[] = {"(Context-specific, likely Ambassador or Embassy)"};
char atomic17[] = {"Adjective"};
char *atomic_strings[] = {atomic0, atomic1, atomic2, atomic3, atomic4, atomic5, atomic6, atomic7, atomic8, atomic9, atomic10, atomic11, atomic12, atomic13, atomic14, atomic15, atomic16, atomic17 };
/*
0  - Adjective
1  - Interjection
2  - (Context-specific, e.g., Jargon or Journal)
3  - (Context-specific, e.g., Letter or Latin)
4  - Masculine
5  - Noun
6  - Tense
7  - Verb
8  - Adverb
9  - Feminine Gender-related)
10 - Imperative (Verb-related)
11 - Conjunction
12 - Preposition
13 - Prefix
14 - Interjection
15 - Third person
16 - (Context-specific, likely Ambassador or Embassy)
 */

void print_linked_definitions(struct word *sentence_head){
    printf("\n\n\n");
    
    while(sentence_head != NULL){
        printf("Word: %s\n", sentence_head->word);
        struct definition **current_addr = (sentence_head->definition_addr);
        if(current_addr == NULL){
            printf("Def-less\n\n\n");
            sentence_head = sentence_head->next;
            continue;
        }
        struct definition *current_def = *current_addr;
        int compound_chance[18] = {0};
        while(current_def != NULL){
            printf("Def: %s\n", current_def->definition);
            for(int i = 0; i < 18; i++){
                if(current_def->atomic_property[i] == 1){
                    compound_chance[i]++;
                }
            }
            current_def = current_def->next;
        }
        int max = 0;
        for(int i = 0; i < 18; i++){
            if(compound_chance[i] >= compound_chance[max]){
                max = i;
            }
        }
        printf("\n");
        printf("most likely: %s\n", atomic_strings[max]);
        sentence_head = sentence_head->next;
        printf("\n\n");
    }
}
