import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserState } from '../../intefaces/ user';

const initialState: UserState = {
  id: "",
  email: ""
}
export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setAuthCredential: (state, action: PayloadAction<{id:string, email: string}>) => {
      state.id = action.payload.id;
      state.email = action.payload.email
    }
  }
})

// Action creators are generated for each case reducer function
export const { setAuthCredential } = userSlice.actions

export default userSlice.reducer