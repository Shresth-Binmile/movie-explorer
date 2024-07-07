import Navbar from "../components/Navbar"
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { LoginFormData } from "../interfaces/LoginFormData";
import { CheckUserInDB } from "../utils/CheckUserInDB";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setInitialState } from "../redux/userSlice";
// import type { RootState } from "../redux/store";

const Login = () => {
  const { control, handleSubmit } = useForm<LoginFormData>();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const stateUser = useSelector((state: RootState)=>state.userReducer)

  const onSubmit = (data: LoginFormData) => {
    // console.log(data); // Handle form submission logic here
    const user = CheckUserInDB(data)

    if(user.length != 0){
      // console.log('user exists: ',user)
      dispatch(setInitialState(user[0]))
      // console.log('State from login: ', stateUser)

      navigate('/')
    }
    else{
      console.log('user not found')
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ maxWidth: 400, margin: 'auto', mt: 10 }}>
        <Typography variant="h4" gutterBottom fontWeight={'Bold'} textAlign={"center"}>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Name is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Password is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default Login