import Navbar from "../components/Navbar"
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { RegisterFormData } from "../interfaces/RegisterFormData"
import { AddUserToDB } from "../utils/AddUserToDB";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { control, handleSubmit } = useForm<RegisterFormData>();
  const navigate = useNavigate()

  const onSubmit = (data: RegisterFormData) => {
    console.log(data); // Handle form submission logic here
    AddUserToDB(data)

    navigate('/login')
  };

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