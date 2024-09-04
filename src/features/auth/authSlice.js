import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for logging in a user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userCredentials, thunkAPI) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials)
    });

    const data = await response.json();
    
    if (response.ok) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data.message);
    }
  }
);

// Retrieve user and token from localStorage if they exist
const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');  // Remove user from localStorage
      localStorage.removeItem('token'); // Remove token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.currentUser;
        state.token = action.payload.token;

        // Save the user and token to localStorage
        localStorage.setItem('user', JSON.stringify(action.payload.currentUser));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async thunk for logging in a user
// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (userCredentials, thunkAPI) => {
//     const response = await fetch('http://localhost:5000/api/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(userCredentials)
//     });

//     const data = await response.json();
    

//     if (response.ok) {
//       return data;
//     } else {
//       return thunkAPI.rejectWithValue(data.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     token: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         console.log('Login successful, token:', action.payload.token); // Log the token
//         console.log('Login successful, user:', action.payload.currentUser);
        
//         state.loading = false;
//         state.user = action.payload.currentUser;
//         state.token = action.payload.token;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;