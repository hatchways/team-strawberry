const comments = [
  { id: 1, body: "Comment 1", parent: 3 },
  { id: 2, body: "Comment 2", parent: 1 },
  { id: 3, body: "Comment 3", parent: null },
  { id: 4, body: "Comment 4", parent: 5 },
  { id: 5, body: "Comment 5", parent: null },
  { id: 6, body: "Comment 6", parent: 5 },
  { id: 7, body: "Comment 7", parent: 1 }
];

const printComments = (comments, parent = null, tab = "") => {
  for (var i = 0; i < comments.length; i++) {
    const comment = comments[i];
    if (comment.parent == parent) {
      console.log(tab + comment.body);
      printComments(comments, comment.id, tab + "  ");
    }
  }
};

printComments(comments);

// QUESTIONS
// How do you improve the coding style (in Javascript)?
// What will this function do?
// What is the Big O Notation?
// How do you make this more efficient
