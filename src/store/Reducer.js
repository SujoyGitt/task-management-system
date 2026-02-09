export const Reducer = (state, action) => {
  switch (action.type) {
    case "FIELD_CHANGE":
      return { ...state, [action.fieldName]: action.value };

    case "SELECT_TAG": {
      const tag = action.payload;
      const isSelected = state.tags.includes(tag);
      const tags = isSelected
        ? state.tags.filter((elm) => elm !== tag)
        : [...state.tags, tag];

      return { ...state, tags };
    }

    case "RESET":
      return {
        id: Date.now(),
        task: "",
        status: "Ready for Development",
        tags: [],
      };


    default: return state
     
  }
};
