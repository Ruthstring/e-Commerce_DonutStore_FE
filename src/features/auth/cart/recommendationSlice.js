import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching recommendations
export const fetchRecommendations = createAsyncThunk(
    'recommendations/fetchRecommendations',
    async (cartItems, { getState }) => {
        const token = getState().auth.token;

        // Extract product IDs from cartItems and send them to the backend
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recommendations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ cartItems }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recommendations');
        }

        return response.json();
    }
);

const recommendationSlice = createSlice({
    name: 'recommendations',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecommendations.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchRecommendations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default recommendationSlice.reducer;