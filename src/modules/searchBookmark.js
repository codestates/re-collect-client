import { initialState } from "./initialState";

export const addBookmark = () => {
  return {
    type: "ADD",
    payload: {
      id: 1,
    },
  };
};

const bookmarkReducerX = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return;
    case "EDIT":
      return;
  }
};
