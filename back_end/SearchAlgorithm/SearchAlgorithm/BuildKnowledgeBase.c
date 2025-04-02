//
//  BuildKnowledgeBase.c
//  SearchAlgorithm
//
//  Created by Nolan Jones on 2/25/25.
//

#include "BuildKnowledgeBase.h"
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include "Header.h"

char system_root[] = "/Users/nolanjones/Documents/Codeing/HTML/Final/frontend/back_end/TextBooks";
char sub_file_identifier[] = "/FileList.txt";
char sub_folder_identifier[] = "/FolderList.txt";

folder_paths *UniversalData = NULL;
void destroy_files(files **Head){
    files *currentNode = *Head;
    if(currentNode == NULL){
        return;
    }
    
    files *tempNode = NULL;
    while(currentNode->next != NULL){
        tempNode = currentNode->next;
        free(currentNode->FileName);
        free(currentNode);
        currentNode = tempNode;
        tempNode = tempNode->next;
    }
    free(currentNode->FileName);
    free(currentNode);
    
}

void destroy_all_paths_neighbor(folder_paths **Head){
    folder_paths *currentNode = *Head;
    if(currentNode != NULL){
        destroy_all_paths_child(&currentNode->child);
        free(currentNode->child);
        destroy_all_paths_neighbor(&currentNode->neighbor);
        free(currentNode->neighbor);
    }
}
void destroy_all_paths_child(folder_paths **Head){
    folder_paths *currentNode = *Head;
    if(currentNode != NULL){
        destroy_all_paths_child(&currentNode->child);
        free(currentNode->child);
        destroy_all_paths_neighbor(&currentNode->neighbor);
        free(currentNode->neighbor);
        destroy_files(&currentNode->file);
    }
}
/*
void destroy_all_paths(folder_paths **Head){
    folder_paths *currentNode = *Head;
    if(currentNode == NULL){
        return;
    }
    
    folder_paths *tempNode = NULL;
    while(currentNode->child != NULL){
        tempNode = currentNode->child;
        destroy_files(&currentNode->file);
        free(currentNode->PathToFiles);
        free(currentNode);
        currentNode = tempNode;
        tempNode = tempNode->child;
    }
    destroy_files(&currentNode->file);
    free(currentNode->PathToFiles);
    free(currentNode);
}*/

char* append_string(char *string_root, char* string_extension){
    unsigned int len_root = (unsigned int) get_length(string_root);
    unsigned int len_extension = (unsigned int) get_length(string_extension);
    char *combination = (char*) malloc((len_root + len_extension + 1) * sizeof(char));
    for(int i = 0; i < len_root; i++){
        combination[i] = string_root[i];
    }
    for(int i = len_root; i < len_root + len_extension; i++){
        combination[i] = string_root[i];
    }
    combination[len_root+len_extension+1] = '\0';
    return combination;
}

folder_paths* build_node_for_paths(char *path){
    folder_paths *new_node = (folder_paths*) malloc(sizeof(folder_paths));
    new_node->PathToFiles = path;
    return new_node;
}
files* build_node_for_file(char *path){
    files *new_node = (files*) malloc(sizeof(files));
    new_node->FileName = path;
    return new_node;
}


files* order_files_read(files *file, char *current_path){
    if(file != NULL){
        char *file_path = append_string(current_path, file->FileName);
        file = file->next;
        order_files_read(file, file_path);
        //build_node
        free(file_path);
    }
    return NULL;
}

folder_paths* order_folders_child_read(folder_paths *branch, char *current_path){
    if(branch != NULL){
        char *path_extension = append_string(current_path, branch->PathToFiles);
        branch = branch->child;
        order_folders_child_read(branch, path_extension);
        order_folders_neighbor_read(branch, current_path);
        order_files_read(branch->file, path_extension);
        //build_node
        free(path_extension);
    }
    return NULL;
}

folder_paths* order_folders_neighbor_read(folder_paths *branch, char *current_path){
    if(branch != NULL){
        char *path_extension = append_string(current_path, branch->PathToFiles);
        branch = branch->neighbor;
        order_folders_child_read(branch, path_extension);
        order_folders_neighbor_read(branch, current_path);
        //build_node
        free(path_extension);
    };
    return NULL;
}

void getAllPaths(char *directory){
    if(directory == NULL){
        printf("Invalid head Directory\n");
        return;
    }
    
    if(UniversalData == NULL){
        UniversalData = (folder_paths*) malloc(sizeof(folder_paths));
        if(UniversalData == NULL){
            printf("could not allocate space for paths\n");
            return;
        }
    }
    
    UniversalData = order_folders_neighbor_read(UniversalData, system_root);
    
}

int current_join = 0;
void minute_comparison(char *join){
    if(join[0] == 'e' && join[1] == 'n' && join[2] == 'd'){
        current_join = 0;
    }else if(join[0] == 's' && join[1] == 't' && join[2] == 'a' && join[3] == 'r' && join[4] == 't'){
        current_join = 1;
    }
    if(current_join == 0){
        printf("\n");
    }
}

void read_text(FILE *inFs){
    char class[10] = {0};
    char format[10] = {0};
    char join[10] = {0};
    
    fscanf(inFs, "class: %[^\n]\n", class);
    fscanf(inFs, "format: %[^\n]\n", format);
    fscanf(inFs, "join: %[^\n]\n", join);
    //printf("%s %s %s\n", class, format, join);
    minute_comparison(join);
    return;
}

void read_equation(FILE *inFs){
    char class[10] = {0};
    char join[10] = {0};
    
    fscanf(inFs, "class: %[^\n]\n", class);
    fscanf(inFs, "join: %[^\n]\n", join);
    //printf("%s %s\n", class, join);
    minute_comparison(join);
    return;
}

void read_reference(FILE *inFs){
    char class[10] = {0};
    char join[10] = {0};
    
    fscanf(inFs, "class: %[^\n]\n", class);
    fscanf(inFs, "join: %[^\n]\n", join);
    //printf("%s %s\n", class, join);
    minute_comparison(join);
    return;
}

void test_read_file(void){
    FILE *inFs = fopen("/Users/nolanjones/Documents/Codeing/HTML/Final/frontend/back_end/TextBooks/Linear Algebra/chapter_1.txt", "r+");
    int num;
    char temp[2048];
    while(fscanf(inFs, "%d", &num) != EOF){
        if(fscanf(inFs, "\ntext: %[^\n]\n", temp) == 1){
            printf("text: %s\n", temp);
            read_text(inFs);
        }else if(fscanf(inFs, "\nequation: %[^\n]\n", temp) == 1){
            printf("equation: %s\n", temp);
            read_equation(inFs);
        }else if(fscanf(inFs, "\nreference: %[^\n]\n", temp) == 1){
            printf("reference: %s\n", temp);
            read_reference(inFs);
        }
    }
}
