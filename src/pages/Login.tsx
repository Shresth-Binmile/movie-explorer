import Navbar from "../components/Navbar"
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { LoginFormData } from "../interfaces/LoginFormData";
import { CheckUserInDB } from "../utils/CheckUserInDB";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setInitialState } from "../redux/userSlice";
import { useAuth } from "../utils/useAuth";
// import type { RootState } from "../redux/store";

const Login = () => {
  const { control, handleSubmit, formState: {errors} } = useForm<LoginFormData>();
  const {setIsLogin, user, isLogin} = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const stateUser = useSelector((state: RootState)=>state.userReducer)

  const onSubmit = (data: LoginFormData) => {
    // console.log(data); // Handle form submission logic here
    const user = CheckUserInDB(data)

    if(user.length != 0){
      // Setting current user...
      localStorage.setItem('currentUser', JSON.stringify(user))
      dispatch(setInitialState(user[0]))
      setIsLogin(true)
      navigate('/')
    }
    else{
      console.log('user not found')
      alert("User Not Found! Register to Login/View Movies")
    }
  };

  if(user.length !== 0) {
    console.log(user)
    console.log(isLogin)
    navigate('/')
  }

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
            rules={{ required: 'Password is required. Min. length should be 8 characters.', minLength: 8 }}
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
          {errors.password && errors.password.type === "minLength" && (
            <Typography sx={{ color: 'red', m: 0, fontSize: 12, pl: 2}}>Password must be at least 8 characters long</Typography>
          )}
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