#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_BUF 100

typedef struct order {
    char *order_id;
    int start;
    int duration;
    int price;
    int revenue;
} ORDER;

typedef struct node {
    ORDER *order;
    struct node *next;
} NODE;

NODE *insert_into_orders(NODE *nodes, char *id, int start, int durn, int pr) {
    if(nodes == NULL) {
        ORDER *order = (ORDER *)malloc(sizeof(ORDER));
        order->order_id = strdup(id);
        order->start = start;
        order->duration = durn;
        order->price = pr;
        order->revenue = -1;
        NODE *node = (NODE *)malloc(sizeof(NODE));
        node->order = order;
        node->next = NULL;
        return node;
    }
    NODE *initial = nodes;
    NODE *pred = NULL;
    while(nodes && nodes->order->start < start) {
        pred = nodes;
        nodes = nodes->next;
    }
    while(nodes && nodes->order->start == start & nodes->order->duration < durn) {
        pred = nodes;
        nodes = nodes->next;
    }
    ORDER *order = (ORDER *)malloc(sizeof(ORDER));
    order->order_id = strdup(id);
    order->start = start;
    order->duration = durn;
    order->price = pr;
    order->revenue = -1;
    NODE *node = (NODE *)malloc(sizeof(NODE));
    node->order = order;
    node->next = nodes;
    if(pred == NULL)
        initial = node;
    else {
        pred->next = node;
    }
    return initial;
}

void destroy_nodes(NODE *node) {
    if(node == NULL)
        return;
    while(node) {
        free(node->order->order_id);
        free(node->order);
        NODE *to_free = node;
        node = node->next;
        free(to_free);
    }
}

NODE *selection(NODE *nodes, ORDER *order) {
    int start = order->start;
    int end   = start + order->duration;
    int year  = start / 1000;
    int year_end = year * 1000 + 365;
    if(end > year_end) {
        int days = end - year_end;
        end = (year + 1) * 1000 + days;
    }
    NODE *list = NULL;
    NODE *initial = NULL;
    NODE *prev = NULL;
    while(nodes != NULL) {
        if(nodes->order->start >= end) {
            list=(NODE *)malloc(sizeof(NODE));
            if(prev)
                prev->next = list;
            list->order = nodes->order;
            list->next = NULL;
            if(!initial)
                initial = list;
            prev = list;
        }
        nodes = nodes->next;
    }
    return initial;
}

void delete_list(NODE *nodes) {
    NODE *current = nodes;
    while(current != NULL) {
        NODE *to_free = current;
        current = current->next;
        free(to_free);
    }
}

int revenue(NODE *list) {
    if(list == NULL)
        return 0;
    ORDER *order = list->order;
    if(order->revenue != -1)
        return order->revenue;
    NODE *comp = selection(list->next, order);
    int rc = revenue(comp);
    int rn = revenue(list->next);
    order->revenue = order->price + rc > rn ? order->price + rc : rn;
    delete_list(comp);
    return order->revenue;
}

int main(int argc, char *argv[]) {
    static char buf[MAX_BUF];
    NODE *nodes = NULL;
    FILE *file = argc > 1 ? fopen(argv[1], "r") : stdin;
    while(fgets(buf, MAX_BUF, file)) {
        char order_id[50];
        int start;
        int durn;
        int prc;
        sscanf(buf, "%s %d %d %d", order_id, &start, &durn, &prc);
        nodes = insert_into_orders(nodes, order_id, start, durn, prc);
    }
    fclose(file);
    printf("%d\n", revenue(nodes));
    destroy_nodes(nodes);
}

