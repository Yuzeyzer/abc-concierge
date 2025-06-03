import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  role: string | null;
}

const initialState: UserState = {
  uid: null,
  email: null,
  displayName: null,
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      const { uid, email, displayName, role } = action.payload;
      state.uid = uid;
      state.email = email;
      state.displayName = displayName;
      state.role = role;
    },
    logoutUser(state) {
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.role = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
