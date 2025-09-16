//
//  BuildKnowledgeBase.h
//  SearchAlgorithm
//
//  Created by Nolan Jones on 2/25/25.
//

#ifndef BuildKnowledgeBase_h
#define BuildKnowledgeBase_h

#include <stdio.h>
#include <strings.h>

extern char system_root[];
extern char sub_file_identifier[];
extern char sub_folder_identifier[];

struct files{
    char *FileName;
    struct files *next;
};
typedef struct files files;

struct folder_paths{
    char *PathToFiles;
    struct folder_paths *neighbor;
    struct folder_paths *child;
    struct files *file;
};
typedef struct folder_paths folder_paths;

extern folder_paths *UniversalData;

files* order_files_read(files *file, char *current_path);
folder_paths* order_folders_neighbor_read(folder_paths *branch, char *current_path);
folder_paths* order_folders_child_read(folder_paths *branch, char *current_path);

void destroy_all_paths_neighbor(folder_paths **Head);
void destroy_all_paths_child(folder_paths **Head);
void test_read_file(void);

#endif /* BuildKnowledgeBase_h */
