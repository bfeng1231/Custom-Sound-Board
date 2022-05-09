export const editSound = (key, name, link) => (dispatch) => {
  dispatch({
    type: "EDIT",
    key, name, link
  })
}