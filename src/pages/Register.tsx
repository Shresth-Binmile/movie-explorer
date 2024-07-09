import Navbar from "../components/Navbar"
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { RegisterFormData } from "../interfaces/RegisterFormData"
import { AddUserToDB } from "../utils/AddUserToDB";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";

const Register = () => {
  const { control, handleSubmit, formState: {errors} } = useForm<RegisterFormData>();
  const navigate = useNavigate()
  const { user, isLogin } = useAuth()

  const onSubmit = (data: RegisterFormData) => {
    // console.log(data); // Handle form submission logic here
    AddUserToDB(data)

    navigate('/login')
  };

  if (user.length !== 0) {
    console.log(user)
    console.log(isLogin)
    navigate('/')
  }

  return (
    <>
      <Navbar />
      <Box sx={{ maxWidth: 400, margin: 'auto', mt: 10 }}>
        <Typography variant="h4" gutterBottom fontWeight={'Bold'} textAlign={"center"}>
          Register
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
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            rules={{ required: 'Phone number is required', minLength: 10, maxLength: 10 }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Phone Number"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};


export default Register