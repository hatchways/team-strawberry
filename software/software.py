comments = [
    {"id": 1, "body": "Comment 1", "parent": 3},
    {"id": 2, "body": "Comment 2", "parent": 1},
    {"id": 3, "body": "Comment 3", "parent": None},
    {"id": 4, "body": "Comment 4", "parent": 5},
    {"id": 5, "body": "Comment 5", "parent": None},
    {"id": 6, "body": "Comment 6", "parent": 5},
    {"id": 7, "body": "Comment 7", "parent": 1}
]


def print_comments(comments, parent=None, tab=""):
    for i in range(len(comments)):
        comment = comments[i]
        if comment['parent'] == parent:
            print(tab + comment['body'])
            print_comments(comments, comment['id'], tab+" ")


print_comments(comments)
