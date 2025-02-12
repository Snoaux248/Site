//
//  Header.h
//  SearchAlgorithm
//
//  Created by Nolan Jones on 12/15/24.
//

#ifndef Header_h
#define Header_h

#define dictionary_node_character_length 29

struct definition{
    size_t length;
    int atomic_property[18];
    char *class; //definition in math... in science... ect.
    char *definition; //the full definition;
    struct definition *next;
};

struct node{
    struct node *l[dictionary_node_character_length];
    int num;
    struct definition *def; //array of differing definitions by subject;
};

extern struct node *word_tree;

struct sentence_info{
    int c_len;
    int *classifications;
    int sc_len;
    int *sub_classifications;
    
    int length;
    struct word *sentence_head;
    
};

struct word{
    // 0: word, 1: literal 2: number, 3: logical, 4:special; 7:unknown
    int word_type;
   
    int word_length;
    char *word;
    struct definition **definition_addr;
    //alpha numeric - ' , : ; . ? ! " % $ ¢ € logical unknown
    int word_distribution[17];
    int atomic[8];
    
    struct word *next;
};

//display_functions
void display_word(struct word *temp);
void display_distribution(int distribution[3][19], int current_word);
void display_sentence_structure(struct sentence_info *head);
size_t get_query_length(char *query);

void print_word(char *arr, unsigned long length);
void print_linked_definitions(struct word *sentence_head);

extern char *atomic_strings[];

//sentence_build/parse
void insert_word(struct sentence_info **head, struct word *insert);
void build_word(struct sentence_info **head, struct word **build, char *search_query, int distribution[19], int type);
int get_letter_type(char c);
int check_distribution(int distribution[19]);
int get_next_word(char *search_query, int *start, int *end, int distribution[19]);

void merge_distribution(int distribution[3][19]);
void reset_distribution(int distribution[3][19]);
int complex_build(struct sentence_info **head, char *search_query, int *length, int distribution[3][19]);
void build_sentence(struct sentence_info **head, char *search_query);

void link_definitions(struct word *sentence_head);
/*add the functions for getting definitions and atomic*/


//Load_structures

unsigned long get_length(char *arr);
void build_dictionary(struct node **head, char *word, unsigned long length, char *definition, int *atomic_properties);
int convert_word(char *arr, unsigned long length);
void convert_word_back(char *arr, unsigned long length);
int search_word(struct node *head, char *word, unsigned long length);

void load_dictionary(void);
void load_types(void);
void get_substrings(char *string, int found[8]);

#endif /* Header_h */
